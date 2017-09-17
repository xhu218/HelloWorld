# -*- coding: UTF-8 -*-

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

	browser.get("https://cart.jd.com/cart.action");

	

	content = browser.find_element_by_class_name("btn-area");

	


	print(content)	



except Exception,e :  
    print e
  
if CLOASE_AFTER_TEST:  
    browser.quit()	

