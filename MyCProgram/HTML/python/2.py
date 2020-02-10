# !/usr/bin/python
# -*- coding:utf-8 -*-
 
import urllib2
from bs4 import BeautifulSoup


 
def sendReq():   
	url = 'http://www.baidu.com'
	rq = urllib2.Request(url)
	rs = urllib2.urlopen(rq).read()	

	the_div = str(BeautifulSoup(rs))
	print the_div

sendReq();
