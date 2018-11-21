#coding=utf-8
import os
import sys
import time
import datetime
from myemail import sendemailprocess

reload(sys)
sys.setdefaultencoding('utf-8')
from selenium import webdriver
from selenium.webdriver.support.select import Select
#browser = webdriver.Firefox()
browser = None;

__close_after_test = True;
__beforeclosetime = 600;

__times =("11:00:00","14:00:00","16:00:00","18:00:00","20:00:00","11:26");

__fileter = ['WFG',"WANGFUGUI",'YRF','yaorongfu','YL','YELIANG','MYQ','maoyuanqiao','CT','chentao'];
__logpath = r'E:\\Work\\HelloWorld.git\\trunk\\MyCProgram\\HTML\\python\\bug\\snp41\\'
logfile = "";




while True:

	time.sleep(1)
	now = datetime.datetime.now()
	current = now.strftime('%Y-%m-%d %H:%M:%S');
	print current;


	for t in __times:
		
		if t in current:

			print t;

			file = now.strftime('%Y-%m-%d %H%M%S') + ".log";
			logfile = __logpath + file;

			try:

				i = os.system('cls');

				browser = webdriver.Chrome();


				browser.get("http://192.168.252.209/cqweb/login");


				browser.find_elements_by_name("username")[0].send_keys("wangfugui")
				browser.find_elements_by_name("password")[0].send_keys("wfg");
				browser.find_elements_by_name("userDb")[0].send_keys("snp41");

				browser.find_element_by_class_name("tabactive1").click();

				print browser.title;
				print browser.current_url;

				browser.switch_to.frame("treeFrame");
				print browser.title;
				print browser.current_url;
				#个人目录
				browser.find_element_by_id("tittle33689476").click();
				#lts目录
				browser.find_element_by_id("tittle34180331").click();
				#         archive           rms              web              mos
				n = ['tittle34180333',"tittle34180334",'tittle34180335','tittle34180553']

				for i in n:    
			    	

					browser.find_element_by_id(i).click();
					browser.switch_to.default_content();

					browser.switch_to.frame("contentFrame");
					browser.switch_to.frame("resultset");

					m=browser.find_elements_by_name("recordsPerPageLst");
					if m != None:
						if len(m)==0:
							browser.switch_to.default_content();
							browser.switch_to.frame("treeFrame");
							continue;
					m[0].find_element_by_xpath("//option[@value='All']").click();


					index = 0;

					while index<100:
						time.sleep(1)
						

						try:
							index=index+1;
							link=browser.find_element_by_id("entityLink"+str(index));
							if link !=None :
								link.click();
							else :
								break;

							browser.switch_to.parent_frame();
							browser.switch_to.frame("resultEntity");
							a=browser.find_elements_by_name("Dev_Answertab1")
							if a != None and len(a)>0 :

								
								content = a[0].text.upper();

								status = False;
								for fileter in __fileter:
									if fileter in content[0:40]:
										status = True

								if status == True:
									print ""
								else:
									log = "---------------------------------------------------------------------------------------------\r\n"
									#log +=  browser.find_elements_by_name("idtab1").text + "status ng \r\n";   #browser.find_element_by_class_name("headerinframes").text + "    status ng\r\n"
									log += a[0].text;

									print log;

									
									with open(logfile, 'a+') as f:
									     f.write(log+'\r\n') 
									     f.close();

								browser.switch_to.parent_frame();

								browser.switch_to.frame("resultset");

							else :


								browser.switch_to.frame("taIf50");
								

								content = browser.find_element_by_tag_name("body").text.upper()
								
								status = False;
								for fileter in __fileter:
									if fileter in content[0:40]:
										status = True

								if status == True:
									print ""
								else:
									log = "---------------------------------------------------------------------------------------------\r\n"
									#log += browser.find_element_by_class_name("headerinframes").text + "    status ng \r\n"
									log +=browser.find_element_by_tag_name("body").text;

									print log;

									
									with open(logfile, 'a+') as f:
									     f.write(log+'\r\n') 
									     f.close();
									sendemailprocess("sonaps",logfile);


								browser.switch_to.parent_frame();
								browser.switch_to.parent_frame();

								browser.switch_to.frame("resultset");

							
							#time.sleep(1)
						except Exception,e : 
							print e;
							break;
					browser.switch_to.default_content();
					browser.switch_to.frame("treeFrame");


				time.sleep(1)
				

				if __close_after_test:
					time.sleep(__beforeclosetime);
					browser.quit();
				
			except Exception,e : 

				if __close_after_test:
					time.sleep(__beforeclosetime);
					browser.quit()
				print e
				



