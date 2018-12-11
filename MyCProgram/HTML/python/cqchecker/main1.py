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

__close_after_test = True;


__times =("06:00:00","08:00:00","10:00:00","12:00:00","14:00:00","16:00:00","18:00:00","20:00:00","22:00:00","00:00:00");
#__times =("19:12:00","19:14:00","19:16:00");
__price = "¥1.00";
__retrycount = 30;
__beforeclosetime = 300;
__miaoshasuccess = False;


'''
__times =('22:18:00','22:16:00');
#__times =("19:12:00","19:14:00","19:16:00");
__price = "¥1.00";
__retrycount = 5;
__beforeclosetime = 300;
'''


#while True:

time.sleep(1);
now = datetime.datetime.now()
print now.strftime('%Y-%m-%d %H:%M:%S');


if now.strftime('%S') =="00":
	i = os.system('cls');

try:

	browser = webdriver.Chrome();


	browser.get("https://web.hotline.io/inbox/2/0");

	time.sleep(1)
	
	#browser.find_element_by_class_name("link-login").click()
	#browser.find_element_by_link_text("账户登录").click();
	browser.find_element_by_id("email").send_keys("chenxl@itaojin.cn")
	browser.find_element_by_id("password").send_keys("56d55886-3ffb-444e-bea5-9d57dab1cd22");
	time.sleep(1)

	browser.find_element_by_id("ember656").click();
	time.sleep(1)

	




	
	index = 1;

	while index<10:
		index=index+1;
		print index;

		#此路不行，因为ID是变化的
		#js = "var q=document.documentElement.getElementById('').scrollTop=10000";
		#browser.execute_script(js);
	
		#此路OK
		#browser.get("https://web.hotline.io/app/conversation/message?rand=1514469224961&convid=9190958&excludeCampaign=true");
		#print browser.page_source  # it is ok

		ps = browser.find_element_by_link_text("Load More...");
		ps.click();
		time.sleep(3);



	#browser.find_element_by_class_name("btn btn-default").click();
	
	

	#browser.get("https://cart.jd.com/cart.action");
	'''
	for i in range(1,__retrycount):

		#time.sleep(1);
		i+=1;
		print(i);
		print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

		browser.refresh();
		content = browser.find_element_by_class_name("sumPrice");
		#print(content.text.decode('utf-8',errors='strict'));

		if  content!=None and   content.text == __price:

			print("good ,you get the expect price");
			print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			
			browser.find_element_by_class_name("submit-btn").click();
			browser.find_element_by_id("order-submit").click();
			__miaoshasuccess = True;	
			break;

		else:
			print("try again");

	time.sleep(__beforeclosetime);

	if __close_after_test:
		if __miaoshasuccess == True:
			time.sleep(__beforeclosetime);
		browser.quit();
	'''
except Exception,e : 

	if __close_after_test:
		time.sleep(__beforeclosetime);
		browser.quit()
	print e



