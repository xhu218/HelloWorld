import win32gui
import pygetwindow as gw
import pyautogui
import cv2
import numpy as np
from PIL import Image
import tkinter as tk
from tkinter import messagebox
import time
import threading
import os
from datetime import datetime, time as dt_time
import requests
import base64
import queue
import json
import signal

# -------------------------- 配置项（重点修改！）--------------------------
# 1. 百度OCR API配置
BAIDU_OCR_CONFIG = {
    "API_KEY": "kPU6Cj30Voo8PiUrJinjereK",       
    "SECRET_KEY": "dv9Y2nYFq2Ic2rtS8Z05hz1tb0hN4pOG",
    "ACCESS_TOKEN": ""                   
}

# 钉钉配置
WEBHOOK_URL = "https://oapi.dingtalk.com/robot/send?access_token=3677af4ef38ac3291bd64e17506a89b3a376679df65a8cca06ca3aee74a02d34"
YOUR_PHONE = "13548180218"

# 2. 检测配置
KEYWORDS = ["交警", "快", "来了", "警察"]
SCAN_INTERVAL = 60
WECHAT_WINDOW_TITLE = "享你索想，贝享生活"
CHAT_AREA_OFFSET = {
    "left": 20,    "top": 80,     "right": 20,   "bottom": 120
}
ALERTED_CONTENT = set()
SCREENSHOT_SAVE_DIR = "wechat_screenshots"

# 3. 时间限制配置（周一到周五 9:30 ~ 20:00）
MONITOR_WEEKDAYS = [0, 1, 2, 3, 4]  # 0=周一, 1=周二, ..., 4=周五
MONITOR_START_TIME = dt_time(9, 30)  # 9:30开始
MONITOR_END_TIME = dt_time(20, 0)    # 20:00结束

# 全局变量
EXIT_FLAG = False          # 退出标志
ALERT_QUEUE = queue.Queue()# 报警队列
ROOT = None                # GUI根窗口
LAST_RECOGNIZED_TEXT = ""  # 上一次识别的文本（用于对比去重）

def my_print(content):
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{now_str}] {content}")

# -------------------------- 时间判断函数 --------------------------
def is_in_monitor_time():
    """判断当前时间是否在监控时间段内（周一到周五 9:30~20:00）"""
    now = datetime.now()
    
    # 1. 判断星期几（0=周一，6=周日）
    if now.weekday() not in MONITOR_WEEKDAYS:
        return False
    
    # 2. 判断时间是否在9:30~20:00之间
    current_time = dt_time(now.hour, now.minute)
    if not (MONITOR_START_TIME <= current_time <= MONITOR_END_TIME):
        return False
    
    return True

# -------------------------- 信号处理函数 --------------------------
def handle_interrupt(signum, frame):
    """优雅处理Ctrl+C中断"""
    global EXIT_FLAG
    my_print("\n⚠️ 检测到Ctrl+C中断，正在退出程序...")
    EXIT_FLAG = True
    
    # 停止GUI主循环
    if ROOT:
        try:
            ROOT.after(0, ROOT.quit)    # 异步退出主循环
            ROOT.after(0, ROOT.destroy) # 销毁窗口
        except:
            pass
    
    # 等待线程退出（最多2秒）
    end_time = time.time() + 2
    while time.time() < end_time and (
        threading.active_count() > 1 or not ALERT_QUEUE.empty()
    ):
        time.sleep(0.1)
    
    # 安全退出
    my_print("👋 程序已正常退出")
    os._exit(0)

# -------------------------- 百度OCR API相关函数 --------------------------
def get_baidu_access_token():
    """获取百度OCR Token"""
    if EXIT_FLAG:
        return False
    try:
        url = f"https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id={BAIDU_OCR_CONFIG['API_KEY']}&client_secret={BAIDU_OCR_CONFIG['SECRET_KEY']}"
        response = requests.get(url, timeout=10)
        result = response.json()
        if "access_token" in result:
            BAIDU_OCR_CONFIG["ACCESS_TOKEN"] = result["access_token"]
            my_print(f"✅ 获取Token成功，有效期：{result.get('expires_in', '30天')}秒")
            return True
        else:
            my_print(f"❌ 获取Token失败：{result}")
            return False
    except Exception as e:
        my_print(f"❌ Token获取异常：{e}")
        return False

def image_to_base64(img):
    """图像转Base64"""
    try:
        pil_img = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
        import io
        buffer = io.BytesIO()
        pil_img.save(buffer, format='PNG')
        return base64.b64encode(buffer.getvalue()).decode('utf-8')
    except Exception as e:
        my_print(f"❌ 图像转Base64失败：{e}")
        return ""

def baidu_ocr_recognize(img):
    """百度OCR识别"""
    if EXIT_FLAG or img is None or not img.any():
        return ""
    
    if not BAIDU_OCR_CONFIG["ACCESS_TOKEN"]:
        if not get_baidu_access_token():
            return ""
    
    img_base64 = image_to_base64(img)
    if not img_base64:
        return ""
    
    try:
        url = f"https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic?access_token={BAIDU_OCR_CONFIG['ACCESS_TOKEN']}"
        headers = {"Content-Type": "application/x-www-form-urlencoded"}
        data = {
            "image": img_base64,
            "language_type": "CHN_ENG",
            "detect_direction": "true"
        }
        
        response = requests.post(url, headers=headers, data=data, timeout=15)
        result = response.json()
        
        if "words_result" in result:
            text = "\n".join([item["words"] for item in result["words_result"]])
            return text.strip()
        else:
            my_print(f"❌ OCR识别失败：{result}")
            return ""
    except Exception as e:
        my_print(f"❌ API调用异常：{e}")
        BAIDU_OCR_CONFIG["ACCESS_TOKEN"] = ""
        return ""

# -------------------------- 工具函数 --------------------------
def init_save_dir():
    """初始化截图目录"""
    if not os.path.exists(SCREENSHOT_SAVE_DIR):
        os.makedirs(SCREENSHOT_SAVE_DIR)
        my_print(f"✅ 截图目录已创建：{os.path.abspath(SCREENSHOT_SAVE_DIR)}")

def get_timestamp_filename():
    """生成时间戳文件名"""
    return f"wechat_chat_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"

def find_wechat_window():
    """查找微信窗口"""
    if EXIT_FLAG:
        return None
    
    # 方式1：pygetwindow
    try:
        windows = gw.getWindowsWithTitle(WECHAT_WINDOW_TITLE)
        if windows:
            window = windows[0]
            if window.isMinimized:
                window.restore()
            return window
    except Exception as e:
        my_print(f"精准匹配窗口失败：{e}")

    # 方式2：win32gui兜底
    target_handle = None
    def callback(handle, extra):
        nonlocal target_handle
        if win32gui.IsWindowVisible(handle) and not EXIT_FLAG:
            title = win32gui.GetWindowText(handle)
            if title.strip() == WECHAT_WINDOW_TITLE:
                target_handle = handle
                return False
        return True
    win32gui.EnumWindows(callback, None)
    
    if target_handle:
        return gw.Window(target_handle)
    
    return None

def capture_chat_area(window):
    """截取聊天区域"""
    if EXIT_FLAG:
        return None
    
    try:
        x, y = window.left, window.top
        width, height = window.width, window.height
        
        # 计算聊天区域坐标
        chat_x1 = x + CHAT_AREA_OFFSET["left"]
        chat_y1 = y + CHAT_AREA_OFFSET["top"]
        chat_x2 = x + width - CHAT_AREA_OFFSET["right"]
        chat_y2 = y + height - CHAT_AREA_OFFSET["bottom"]
        
        # 截图
        screenshot = pyautogui.screenshot(region=(chat_x1, chat_y1, chat_x2-chat_x1, chat_y2-chat_y1))
        
        # 保存截图（注释掉则不保存）
        # save_path = os.path.join(SCREENSHOT_SAVE_DIR, get_timestamp_filename())
        # screenshot.save(save_path)
        # my_print(f"📸 截图已保存：{os.path.abspath(save_path)}")
        
        return cv2.cvtColor(np.array(screenshot), cv2.COLOR_RGB2BGR)
    except Exception as e:
        my_print(f"截图失败：{e}")
        return None

def check_keywords_in_text(text):
    """检测关键词（仅内容变化时）"""
    global LAST_RECOGNIZED_TEXT
    
    # 如果内容和上次完全一致，直接返回None（不处理）
    if text == LAST_RECOGNIZED_TEXT:
        my_print("📝 内容无变化，跳过处理")
        return None
    
    # 更新上次识别的文本
    LAST_RECOGNIZED_TEXT = text
    
    # 检测关键词
    if not text:
        return None
    
    for keyword in KEYWORDS:
        if keyword in text:
            unique_key = f"{text[:20]}_{keyword}"
            if unique_key not in ALERTED_CONTENT:
                ALERTED_CONTENT.add(unique_key)
                return keyword
    return None

def send_alert_to_gui(keyword, text):
    """发送报警到GUI队列"""
    if not EXIT_FLAG:
        ALERT_QUEUE.put((keyword, text))

def send_alert(msg):
    """发送钉钉报警"""
    if EXIT_FLAG:
        return None
    
    try:
        now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        headers = {"Content-Type": "application/json"}
        data = {
            "msgtype": "text",
            "text": {
                "content": f"[{now_str}]小爱同学【告警】{msg}"
            },
            "at": {
                "atMobiles": [YOUR_PHONE],
                "isAtAll": False
            }
        }
        resp = requests.post(WEBHOOK_URL, data=json.dumps(data), headers=headers, timeout=10)
        return resp.json()
    except Exception as e:
        my_print(f"❌ 钉钉报警失败：{e}")
        return None

def gui_worker():
    """GUI线程：处理报警"""
    global ROOT
    ROOT = tk.Tk()
    ROOT.withdraw()  # 隐藏主窗口
    
    def check_alert_queue():
        """检查报警队列"""
        if EXIT_FLAG:
            return
        
        try:
            while not ALERT_QUEUE.empty() and not EXIT_FLAG:
                keyword, text = ALERT_QUEUE.get_nowait()
                smessage = f"检测到敏感关键词：【{keyword}】\n\n最新识别内容：\n{text[:100]}..."
                send_alert(smessage)
        except queue.Empty:
            pass
        
        # 继续循环检查
        if not EXIT_FLAG:
            ROOT.after(100, check_alert_queue)
    
    check_alert_queue()
    ROOT.mainloop()

# -------------------------- 主监控函数 --------------------------
def monitor_wechat_chat():
    """监控主逻辑"""
    init_save_dir()
    get_baidu_access_token()
    
    print("✅ 微信聊天监控已启动！")
    print(f"👉 监控窗口：{WECHAT_WINDOW_TITLE}")
    print(f"👉 检测间隔：{SCAN_INTERVAL}秒")
    print(f"👉 截图目录：{os.path.abspath(SCREENSHOT_SAVE_DIR)}")
    print(f"👉 监控时段：周一至周五 9:30 ~ 20:00")
    print("👉 紧急停止：按Ctrl+C退出\n")

    while not EXIT_FLAG:
        try:
            if EXIT_FLAG:
                break
            
            # 核心判断：只在指定时间段内执行监控逻辑
            if not is_in_monitor_time():
                now = datetime.now()
                my_print(f"⏰ 当前时间{now.strftime('%Y-%m-%d %H:%M')}不在监控时段（周一至周五9:30~20:00），跳过本次检测")
                # 分段sleep，响应退出
                sleep_count = 0
                while sleep_count < SCAN_INTERVAL and not EXIT_FLAG:
                    time.sleep(0.5)
                    sleep_count += 0.5
                continue

            # 1. 查找窗口
            wechat_window = find_wechat_window()
            if not wechat_window:
                my_print("⚠️ 未找到目标微信窗口")
                # 分段sleep，响应退出
                sleep_count = 0
                while sleep_count < SCAN_INTERVAL and not EXIT_FLAG:
                    time.sleep(0.5)
                    sleep_count += 0.5
                continue

            # 2. 截图
            chat_img = capture_chat_area(wechat_window)
            if chat_img is None:
                # 分段sleep，响应退出
                sleep_count = 0
                while sleep_count < SCAN_INTERVAL and not EXIT_FLAG:
                    time.sleep(0.5)
                    sleep_count += 0.5
                continue

            # 3. OCR识别
            chat_text = baidu_ocr_recognize(chat_img)
            my_print(f"📝 本次识别文本：{chat_text[:50]}..." if chat_text else "📝 本次未识别到文本")

            # 4. 检测关键词（自动对比去重）
            matched_keyword = check_keywords_in_text(chat_text)
            if matched_keyword:
                my_print(f"🔍 检测到关键词：{matched_keyword}")
                send_alert_to_gui(matched_keyword, chat_text)

            # 5. 间隔等待（分段sleep，便于响应退出）
            sleep_count = 0
            while sleep_count < SCAN_INTERVAL and not EXIT_FLAG:
                time.sleep(0.5)
                sleep_count += 0.5

        except Exception as e:
            if not EXIT_FLAG:
                my_print(f"\n❌ 程序异常：{str(e)}")
                # 异常后仍分段sleep，响应退出
                sleep_count = 0
                while sleep_count < SCAN_INTERVAL and not EXIT_FLAG:
                    time.sleep(0.5)
                    sleep_count += 0.5
    
    my_print("🛑 监控线程已退出")

# -------------------------- 运行入口 --------------------------
if __name__ == "__main__":
    # 1. 注册信号处理器（处理Ctrl+C）
    signal.signal(signal.SIGINT, handle_interrupt)
    signal.signal(signal.SIGTERM, handle_interrupt)  # 处理kill信号
    
    # 2. 前置检查
    if not BAIDU_OCR_CONFIG["API_KEY"] or BAIDU_OCR_CONFIG["API_KEY"] == "你的百度API Key":
        my_print("❌ 请先配置百度OCR的API_KEY和SECRET_KEY！")
        os._exit(1)
    
    # 3. 启动GUI线程（daemon=True，随主线程退出）
    gui_thread = threading.Thread(target=gui_worker, daemon=True)
    gui_thread.start()
    
    # 4. 等待GUI初始化
    time.sleep(0.5)
    
    # 5. 提示用户
    try:
        input("请确保微信目标窗口已打开，按Enter键开始监控...")
    except KeyboardInterrupt:  # 处理Enter前的Ctrl+C
        handle_interrupt(None, None)
    
    # 6. 启动监控线程
    monitor_thread = threading.Thread(target=monitor_wechat_chat, daemon=True)
    monitor_thread.start()
    
    # 7. 主线程循环检查退出标志（不再阻塞join）
    try:
        while monitor_thread.is_alive() and not EXIT_FLAG:
            time.sleep(0.5)
    except KeyboardInterrupt:
        handle_interrupt(None, None)
    
    # 8. 清理退出
    my_print("\n👋 程序已正常退出")
    os._exit(0)