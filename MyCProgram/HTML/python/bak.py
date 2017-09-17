#coding=utf-8
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
import time
from selenium import webdriver
CLOASE_AFTER_TEST = True 
#CLOASE_AFTER_TEST = True  

#browser = webdriver.Firefox()
browser = webdriver.Chrome();

try:

	browser.get("file:///E:/Work/GitHub/HTML/JQuery/10.html");

	#browser.get("http://www.baidu.com")
	#browser.find_element_by_id("kw").send_keys("selenium")
	#browser.find_element_by_id("su").click()
	#browser.find_element_by_id("key").send_keys("selenium")

	#browser.find_element_by_class_name("link-login").click()
	#time.sleep(10)

	#browser.find_element_by_link_text("账户登录").click();
	#time.sleep(10)

	browser.find_element_by_id("txt1").send_keys("xhu218")

	print(sumPrice)


except Exception,e :  
    print e
  
if CLOASE_AFTER_TEST:  
    browser.quit()	

