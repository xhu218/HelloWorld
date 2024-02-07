#!/usr/bin/python
# -*- coding: UTF-8 -*-

import os
import smtplib
import sys
import time
import datetime
from email.mime.text import MIMEText
from email.header import Header
 



def sendmail(subject,content):

	# 第三方 SMTP 服务
	mail_host="smtp.139.com"  #设置服务器
	mail_user="13548180218"    #用户名
	mail_pass="Pass2word139"   #口令 
	 
	 
	sender = '13548180218@139.com'
	receivers = ['13548180218@139.com']  # 接收邮件，可设置为你的QQ邮箱或者其他邮箱
	 



	message = MIMEText(content, 'plain', 'utf-8')
	message['From'] = Header("菜鸟教程", 'utf-8')
	message['To'] =  Header("测试", 'utf-8')
	 
	
	message['Subject'] = Header(subject, 'utf-8')
	 
	 
	try:
	    smtpObj = smtplib.SMTP() 
	    smtpObj.connect(mail_host, 25)    # 25 为 SMTP 端口号
	    smtpObj.login(mail_user,mail_pass)  
	    smtpObj.sendmail(sender, receivers, message.as_string())
	    print "邮件发送成功"
	except smtplib.SMTPException ,e:
	    print "Error: 无法发送邮件" ,e


def sendemailprocess(subject,path):

	if os.path.exists(path):
		print "s"		
		f = open(path)
		contents = f.read()
		print(contents)
		sendmail(subject,contents);
		f.close()

		






if __name__ == '__main__':
	sendmail("hello","qwe")