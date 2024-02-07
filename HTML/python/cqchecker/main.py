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
__retrycount = 60;
__beforeclosetime = 300;
__miaoshasuccess = False;


'''
__times =('22:18:00','22:16:00');
#__times =("19:12:00","19:14:00","19:16:00");
__price = "¥1.00";
__retrycount = 5;
__beforeclosetime = 300;
'''


while True:

			time.sleep(1);
			now = datetime.datetime.now()
			print now.strftime('%Y-%m-%d %H:%M:%S');
			if now.strftime('%S') =="00":
				i = os.system('cls');
			for t in __times:

				jdtimeStr = "";

				if t == "00:00:00":
					jdtimeStr = (now+datetime.timedelta(days=1)).strftime('%Y-%m-%d')+" "+ t ;
				else:
					jdtimeStr = now.strftime('%Y-%m-%d')+" "+ t ;

				jdtime = datetime.datetime.strptime( jdtimeStr ,'%Y-%m-%d %H:%M:%S');

				if (jdtime - now).seconds < 20:
					
					try:

						browser = webdriver.Chrome();


						browser.get("https://www.jd.com");
						browser.find_element_by_class_name("link-login").click()
						browser.find_element_by_link_text("账户登录").click();
						browser.find_element_by_id("loginname").send_keys("xhu218")
						browser.find_element_by_id("nloginpwd").send_keys("Pass2word321");
						browser.find_element_by_link_text("登    录").click();

						time.sleep(5)

						browser.get("https://cart.jd.com/cart.action");

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

					except Exception,e : 

						if __close_after_test:
							time.sleep(__beforeclosetime);
							browser.quit()
						print e

				else:
					print "+",
			print "";

