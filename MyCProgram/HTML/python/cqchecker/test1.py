i=0;
while i<100:
	i=i+1;
	print i;


#coding=utf-8
import os
import sys
import time
import datetime


reload(sys)
sys.setdefaultencoding('utf-8')
from selenium import webdriver
#browser = webdriver.Firefox()
browser = None;
browser = webdriver.Chrome();


browser.get("http://91sc.top/test2.html");
'''
lst =  browser.find_elements_by_class_name("ember-view");
counter = 0
for l in lst:

	counter= counter+1;
print  counter;
'''
browser.find_element_by_link_text("Load More...").click();