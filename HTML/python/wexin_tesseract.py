import win32gui
import win32ui
import win32con
import win32api
import pygetwindow as gw
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
import ctypes
import smtplib
from email.mime.text import MIMEText
from email.header import Header
import pytesseract  # 新增：免费OCR库

# -------------------------- 配置项（重点修改！）--------------------------
# 1. Tesseract OCR配置（免费）
# Windows系统需要指定Tesseract安装路径，Linux/Mac一般不需要
TESSERACT_PATH = r'C:\Program Files\Tesseract-OCR\tesseract.exe'  # 根据你的安装路径修改
pytesseract.pytesseract.tesseract_cmd = TESSERACT_PATH

# 钉钉配置
WEBHOOK_URL = "https://oapi.dingtalk.com/robot/send?access_token=3677af4ef38ac3291bd64e17506a89b3a376679df65a8cca06ca3aee74a02d34"
YOUR_PHONE = "13548180218"

# 2. 检测配置
KEYWORDS = ["交警", "快", "来了", "警察"]
SCAN_INTERVAL = 10
WECHAT_WINDOW_TITLE = "享你索想，贝享生活"
CHAT_AREA_OFFSET = {
    "left": 20,    "top": 80,     "right": 20,   "bottom": 120
}
ALERTED_CONTENT = set()
SCREENSHOT_SAVE_DIR = "wechat_screenshots"

# 3. 时间限制配置（周一到周五 9:30 ~ 20:00）
MONITOR_WEEKDAYS = [0, 1, 2, 3, 4]  # 0=周一, 1=周二, ..., 4=周五
MONITOR_START_TIME = dt_time(9, 30)  # 9:30开始
MONITOR_END_TIME = dt_time(23, 30)    # 20:00结束

# 全局变量
EXIT_FLAG = False          # 退出标志
ALERT_QUEUE = queue.Queue()# 报警队列
ROOT = None                # GUI根窗口
LAST_RECOGNIZED_TEXT = ""  # 上一次识别的文本（用于对比去重）


import smtplib
from email.mime.text import MIMEText
from email.header import Header

def send_mail(to, subject, html, success_callback=None):
    """
    发送163邮箱邮件（等价于Node.js的nodemailer实现）
    :param to: 收件人邮箱（字符串，多个用逗号分隔）
    :param subject: 邮件主题
    :param html: 邮件HTML内容
    :param success_callback: 发送成功后的回调函数（可选）
    """
    # 163邮箱SMTP配置（与Node.js保持一致）
    config = {
        "smtp_server": "smtp.163.com",  # 163邮箱SMTP服务器
        "smtp_port": 465,               # SSL加密端口
        "user": "xhu218@163.com",       # 发件人邮箱账号
        "pass": "QTZBHELDCPMNZVFG"      # 发件人授权码（注意：生成后需等待几分钟生效）
    }

    # 构建邮件内容
    # 邮件正文（HTML格式）
    msg = MIMEText(html, 'html', 'utf-8')
    # 发件人（昵称+邮箱，与Node.js保持一致）
    msg['From'] = Header("==王富贵 王富贵 王富贵 验货==<xhu218@163.com>", 'utf-8')
    # 收件人
    msg['To'] = Header(to, 'utf-8')
    # 邮件主题
    msg['Subject'] = Header(subject, 'utf-8')

    smtp_obj = None
    try:
        # 连接SMTP服务器（SSL加密）
        smtp_obj = smtplib.SMTP_SSL(config["smtp_server"], config["smtp_port"])
        # 登录邮箱
        smtp_obj.login(config["user"], config["pass"])
        # 发送邮件（收件人需转成列表格式）
        smtp_obj.sendmail(config["user"], to.split(','), msg.as_string())
        
       
        # 执行成功回调
        if success_callback and callable(success_callback):
            success_callback()
        
        print('mail sent:', "发送成功")  # 模拟Node.js的info.response
    except smtplib.SMTPException as e:
        # 捕获邮件发送异常
        print(f"邮件发送失败: {e}")
    finally:
        # 关闭连接（等价于transporter.close()）
        if smtp_obj:
            smtp_obj.quit()

# 提升进程权限（解决远程截图权限问题）
def elevate_process_privileges():
    """提升进程权限，允许远程会话截图"""
    try:
        # 设置进程为高DPI感知（解决截图模糊）
        ctypes.windll.shcore.SetProcessDpiAwareness(2)
        
        # 提升窗口站权限（远程会话必备）
        hWinSta = win32api.OpenProcessWindowStation("WinSta0", 0, win32con.GENERIC_ALL)
        if hWinSta:
            win32api.SetProcessWindowStation(hWinSta)
        
        # 打开桌面
        hDesktop = win32api.OpenDesktop("Default", 0, True, win32con.GENERIC_ALL)
        if hDesktop:
            win32api.SetThreadDesktop(hDesktop)
        
        my_print("✅ 进程权限提升成功")
    except Exception as e:
        my_print(f"⚠️ 权限提升失败（不影响基础功能）：{e}")

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

# -------------------------- 免费OCR相关函数（替换百度OCR） --------------------------
def preprocess_image(img):
    """图像预处理，提升OCR识别准确率"""
    if img is None or not img.any():
        return None
    
    # 1. 转为灰度图
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # 2. 二值化（去除噪声）
    _, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
    
    # 3. 去除小噪声点
    kernel = np.ones((1, 1), np.uint8)
    clean = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)
    
    return clean

def free_ocr_recognize(img, save_path):
    """免费Tesseract OCR识别（替换百度OCR）
    :param img: 待识别的图像
    :param save_path: 原始图片保存路径
    """
    if EXIT_FLAG or img is None or not img.any():
        return ""
    
    try:
        # 保存原始截图（识别前的图片）
        cv2.imwrite(save_path, img)
        my_print(f"📸 识别前原始截图已保存：{os.path.abspath(save_path)}")
        
        # 图像预处理
        processed_img = preprocess_image(img)
        if processed_img is None:
            return ""
        
        # 保存预处理后的图片（便于对比排查）
        processed_save_path = save_path.replace(".png", "_processed.png")
        cv2.imwrite(processed_save_path, processed_img)
        my_print(f"📸 预处理后截图已保存：{os.path.abspath(processed_save_path)}")
        
        # 使用Tesseract识别中文
        # lang='chi_sim' 表示简体中文，eng表示英文
        text = pytesseract.image_to_string(processed_img, lang='chi_sim+eng')
        
        # 清理识别结果
        text = text.strip().replace('\n', '').replace('\r', '').replace(' ', '')
        return text
    except Exception as e:
        my_print(f"❌ 免费OCR识别异常：{e}")
        return ""

# -------------------------- 工具函数 --------------------------
def init_save_dir():
    """初始化截图目录"""
    if not os.path.exists(SCREENSHOT_SAVE_DIR):
        os.makedirs(SCREENSHOT_SAVE_DIR)
        my_print(f"✅ 截图目录已创建：{os.path.abspath(SCREENSHOT_SAVE_DIR)}")

def get_timestamp_filename():
    """生成时间戳文件名"""
    return f"wechat_chat_{datetime.now().strftime('%Y%m%d_%H%M%S_%f')}.png"  # 增加毫秒级时间戳避免重名

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

def capture_window_region(hwnd, x1, y1, x2, y2):
    """
    底层Windows API截图（不依赖活跃桌面会话）
    :param hwnd: 窗口句柄
    :param x1, y1: 区域左上角坐标
    :param x2, y2: 区域右下角坐标
    :return: OpenCV格式图像
    """
    if EXIT_FLAG:
        return None
    
    try:
        # 计算截图区域的宽高
        width = x2 - x1
        height = y2 - y1
        
        # 获取窗口设备上下文
        hwnd_dc = win32gui.GetWindowDC(hwnd)
        mfc_dc = win32ui.CreateDCFromHandle(hwnd_dc)
        save_dc = mfc_dc.CreateCompatibleDC()
        
        # 创建位图对象
        save_bitmap = win32ui.CreateBitmap()
        save_bitmap.CreateCompatibleBitmap(mfc_dc, width, height)
        save_dc.SelectObject(save_bitmap)
        
        # 复制屏幕内容到位图
        save_dc.BitBlt((0, 0), (width, height), mfc_dc, (x1, y1), win32con.SRCCOPY)
        
        # 转换为numpy数组
        bmp_info = save_bitmap.GetInfo()
        bmp_str = save_bitmap.GetBitmapBits(True)
        img = np.frombuffer(bmp_str, dtype=np.uint8).reshape((height, width, 4))
        img = img[:, :, :3]  # 去掉Alpha通道
        img = cv2.cvtColor(img, cv2.COLOR_BGRA2BGR)
        
        # 释放资源
        win32gui.DeleteObject(save_bitmap.GetHandle())
        save_dc.DeleteDC()
        mfc_dc.DeleteDC()
        win32gui.ReleaseDC(hwnd, hwnd_dc)
        
        return img
    except Exception as e:
        my_print(f"底层截图失败：{e}")
        return None

def capture_chat_area(window):
    """截取聊天区域（适配远程断开场景）"""
    if EXIT_FLAG:
        return None
    
    try:
        x, y = window.left, window.top
        width, height = window.width, window.height
        
        # 计算聊天区域坐标
        chat_x1 = CHAT_AREA_OFFSET["left"]
        chat_y1 = CHAT_AREA_OFFSET["top"]
        chat_x2 = width - CHAT_AREA_OFFSET["right"]
        chat_y2 = height - CHAT_AREA_OFFSET["bottom"]
        
        # 使用底层API截图（核心修改：不依赖桌面会话）
        hwnd = window._hWnd  # 获取窗口句柄
        chat_img = capture_window_region(hwnd, chat_x1, chat_y1, chat_x2, chat_y2)
        
        if chat_img is None:
            my_print("⚠️ 底层截图失败，尝试降级方案")
            return None
        
        return chat_img
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
    if EXIT_FLAG:
        return None
    try:
        now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        # 1. 发钉钉
        headers = {"Content-Type": "application/json"}
        data = {
            "msgtype": "text",
            "text": {"content": f"[{now_str}] 小爱同学->告警：{msg}"},
            "at": {"atMobiles": [YOUR_PHONE]}
        }
        requests.post(WEBHOOK_URL, json=data, timeout=10)
        
        def success_cb():
            print("邮件发送成功，回调函数执行！")
    
        # 调用发送邮件函数
        send_alert_email(msg)
        
        my_print("✅ 告警+语音通知已发送")
    except Exception as e:
        my_print(f"❌ 告警失败：{e}")

def send_alert_email(msg):
    """发送告警邮件"""
    # 调用发送邮件函数
    send_mail(
        to="13548180218@139.com",  # 替换成实际收件人
        subject="微信监控告警通知",
        html=f"<h1>微信监控告警</h1><p>{msg}</p>",
        success_callback=lambda: print("告警邮件发送成功")
    )

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
    elevate_process_privileges()  # 启动时提升权限
    
    print("✅ 微信聊天监控已启动！")
    print(f"👉 监控窗口：{WECHAT_WINDOW_TITLE}")
    print(f"👉 检测间隔：{SCAN_INTERVAL}秒")
    print(f"👉 截图目录：{os.path.abspath(SCREENSHOT_SAVE_DIR)}")
    print(f"👉 监控时段：周一至周五 9:30 ~ 20:00")
    print("👉 紧急停止：按Ctrl+C退出")
    print("👉 每次识别前都会保存原始截图和预处理截图到截图目录\n")

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

            # 2. 截图（改用底层API）
            chat_img = capture_chat_area(wechat_window)
            if chat_img is None:
                # 分段sleep，响应退出
                sleep_count = 0
                while sleep_count < SCAN_INTERVAL and not EXIT_FLAG:
                    time.sleep(0.5)
                    sleep_count += 0.5
                continue

            # 3. 生成截图保存路径
            save_path = os.path.join(SCREENSHOT_SAVE_DIR, get_timestamp_filename())
            
            # 4. 免费OCR识别（替换百度OCR）- 传入保存路径
            chat_text = free_ocr_recognize(chat_img, save_path)
            my_print(f"📝 本次识别文本：{chat_text}" if chat_text else "📝 本次未识别到文本")

            # 5. 检测关键词（自动对比去重）
            matched_keyword = check_keywords_in_text(chat_text)
            if matched_keyword:
                my_print(f"🔍 检测到关键词：{matched_keyword}")
                send_alert_to_gui(matched_keyword, chat_text)

            # 6. 间隔等待（分段sleep，便于响应退出）
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
    
    # 2. 检查Tesseract配置
    try:
        # 测试Tesseract是否可用
        pytesseract.get_tesseract_version()
    except Exception as e:
        my_print(f"❌ Tesseract OCR配置错误：{e}")
        my_print("请确认：1. 已安装Tesseract引擎 2. TESSERACT_PATH配置正确")
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