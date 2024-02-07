#coding:utf-8

import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

browser = webdriver.Chrome()
browser.get('http://www.baidu.com');
#assert "百度" in browser.title
#elem = browser.find_element_by_id("kw")
#elem.send_keys("hello")
browser.find_element_by_id("kw").send_keys("wangfugui");


time.sleep(20)
browser.close()