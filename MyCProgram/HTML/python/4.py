#coding=utf-8
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
import time
from selenium import webdriver
CLOASE_AFTER_TEST = False 
#CLOASE_AFTER_TEST = True  

#browser = webdriver.Firefox()
browser = webdriver.Chrome();

try:

	browser.get("https://miaosha.jd.com");
	#browser.get("http://www.baidu.com")
	#browser.find_element_by_id("kw").send_keys("selenium")
	#browser.find_element_by_id("su").click()
	#browser.find_element_by_id("key").send_keys("selenium")

	#footer = browser.find_element_by_class_name("sk_mod_er_item");
	time.sleep(5)

	goods = browser.find_elements_by_class_name("seckill_mod_goods")

	print len(goods);

	for i,value in enumerate(goods):
		
		goods_title = value.find_element_by_class_name("seckill_mod_goods_title")

		print i , goods_title.text	

		price_now = value.find_element_by_class_name("seckill_mod_goods_price_now")
		price_pre = value.find_element_by_class_name("seckill_mod_goods_price_pre")

		print price_now.text , price_pre.text
		



except Exception,e :  
    print e
  
if CLOASE_AFTER_TEST:  
    browser.quit()	

