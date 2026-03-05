import cv2
import numpy as np
import pytesseract
import os

# -------------------------- 配置项 --------------------------
# Windows系统需要指定Tesseract安装路径
TESSERACT_PATH = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
pytesseract.pytesseract.tesseract_cmd = TESSERACT_PATH

# ===================== 核心可调参数（重点！）=====================
# 1. 图像缩放系数（小图放大能显著提升识别率）
SCALE_FACTOR = 2.0  # 建议值：1.5-3.0，越大越清晰但处理越慢

# 2. 二值化参数（根据图片亮度调整）
ADAPTIVE_BLOCK_SIZE = 15  # 奇数，建议值：7-25，越大覆盖范围越广
ADAPTIVE_C = 3  # 建议值：1-10，值越大越"白"

# 3. 降噪核大小（根据噪点大小调整）
NOISE_KERNEL_SIZE = (2, 2)  # 建议值：(1,1)-(3,3)

# 4. Tesseract配置参数
TESSERACT_CONFIG = '--psm 6 --oem 3 -c preserve_interword_spaces=1'
# --psm 模式说明（关键！）：
# 0 = 定向脚本监测
# 6 = 假设单一均匀文本块（最常用，适合聊天截图）
# 7 = 将图像视为单行文本
# 8 = 将图像视为单个单词
# 10 = 将图像视为单个字符
# --oem 引擎模式：
# 3 = 默认，使用LSTM引擎（最适合中文）

def enhanced_preprocess_image(img):
    """增强版图像预处理，包含多阶段优化"""
    if img is None or not img.any():
        return None
    
    # 阶段1：放大图片（核心优化！小图放大能大幅提升识别率）
    height, width = img.shape[:2]
    new_width = int(width * SCALE_FACTOR)
    new_height = int(height * SCALE_FACTOR)
    img = cv2.resize(img, (new_width, new_height), interpolation=cv2.INTER_CUBIC)
    
    # 阶段2：转为灰度图
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # 阶段3：自适应二值化（比固定阈值更鲁棒）
    thresh = cv2.adaptiveThreshold(
        gray, 255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,  # 也可尝试 ADAPTIVE_THRESH_MEAN_C
        cv2.THRESH_BINARY_INV,
        blockSize=ADAPTIVE_BLOCK_SIZE,
        C=ADAPTIVE_C
    )
    
    # 阶段4：降噪（去除小噪点）
    kernel = np.ones(NOISE_KERNEL_SIZE, np.uint8)
    # 先开运算（去白噪）再闭运算（去黑噪）
    img_clean = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel)
    img_clean = cv2.morphologyEx(img_clean, cv2.MORPH_CLOSE, kernel)
    
    # 阶段5：轻微膨胀（让文字更清晰）
    img_clean = cv2.dilate(img_clean, kernel, iterations=1)
    
    return img_clean

def extract_text_from_image(image_path, use_preprocess=True, save_processed=True):
    """
    提取图片文字，支持保存预处理后的图片用于调试
    :param image_path: 图片路径
    :param use_preprocess: 是否使用增强预处理
    :param save_processed: 是否保存预处理后的图片（调试用）
    :return: 识别文字
    """
    # 检查文件
    if not os.path.exists(image_path):
        print(f"❌ 错误：文件不存在 - {image_path}")
        return ""
    
    # 读取图片（使用IMREAD_UNCHANGED保留透明通道）
    img = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)
    if img is None:
        print(f"❌ 错误：无法读取图片 - {image_path}")
        return ""
    
    print(f"\n📸 处理图片：{image_path}")
    print(f"📏 原始尺寸：{img.shape[1]}x{img.shape[0]}像素")
    
    # 预处理
    processed_img = img
    if use_preprocess:
        processed_img = enhanced_preprocess_image(img)
        if processed_img is not None:
            img = processed_img
            print(f"✅ 预处理完成，缩放后尺寸：{img.shape[1]}x{img.shape[0]}像素")
            
            # 保存预处理后的图片，方便调试
            if save_processed:
                save_path = image_path.replace('.png', '_processed.png').replace('.jpg', '_processed.jpg')
                cv2.imwrite(save_path, img)
                print(f"💾 预处理后的图片已保存：{save_path}")
    
    # OCR识别（使用优化参数）
    try:
        # 支持中英双语，使用自定义配置
        text = pytesseract.image_to_string(
            img, 
            lang='chi_sim',
            config=TESSERACT_CONFIG
        )
        
        # 清理识别结果
        text = text.strip()
        # 智能清理换行和空格
        text = '\n'.join([line.strip() for line in text.split('\n') if line.strip()])
        
        return text
    except Exception as e:
        print(f"❌ OCR识别失败：{str(e)}")
        return ""

def test_different_psm_modes(image_path):
    """测试不同PSM模式，找到最佳识别效果"""
    psm_modes = {
        6: "单一均匀文本块（推荐）",
        7: "单行文本",
        11: "稀疏文本（无固定布局）"
    }
    
    print("\n=== 测试不同PSM模式效果 ===")
    for psm, desc in psm_modes.items():
        global TESSERACT_CONFIG
        TESSERACT_CONFIG = f'--psm {psm} --oem 3 -c preserve_interword_spaces=1'
        text = extract_text_from_image(image_path, use_preprocess=True, save_processed=False)
        print(f"\n📌 PSM {psm} ({desc})：")
        print(f"识别结果：{text if text else '未识别到文字'}")

def main():
    """主函数"""
    # 替换为你的测试图片路径
    TEST_IMAGE_PATH = r"C:\HelloWorld\HTML\python\wechat_screenshots\wechat_chat_20260305_213417_565337.png"
    
    # 检查Tesseract配置
    try:
        pytesseract.get_tesseract_version()
        print("✅ Tesseract OCR配置正常")
    except Exception as e:
        print(f"❌ Tesseract配置错误：{e}")
        return
    
    # 打印当前参数配置
    print("\n=== 当前配置参数 ===")
    print(f"缩放系数：{SCALE_FACTOR}")
    print(f"二值化块大小：{ADAPTIVE_BLOCK_SIZE}，C值：{ADAPTIVE_C}")
    print(f"降噪核大小：{NOISE_KERNEL_SIZE}")
    print(f"Tesseract配置：{TESSERACT_CONFIG}")
    
    # 1. 基础测试（增强预处理）
    print("\n=== 增强版预处理识别结果 ===")
    text_enhanced = extract_text_from_image(TEST_IMAGE_PATH, use_preprocess=True)
    print(f"识别结果：\n{text_enhanced if text_enhanced else '未识别到任何文字'}")
    
    # 2. 对比测试（无预处理）
    print("\n=== 无预处理识别结果 ===")
    text_basic = extract_text_from_image(TEST_IMAGE_PATH, use_preprocess=False)
    print(f"识别结果：\n{text_basic if text_basic else '未识别到任何文字'}")
    
    # 3. 测试不同PSM模式（找到最佳配置）
    test_different_psm_modes(TEST_IMAGE_PATH)

if __name__ == "__main__":
    main()
    input("\n按Enter键退出...")