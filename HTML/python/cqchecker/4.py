#coding=utf-8
import sys
import time
import datetime

reload(sys)
sys.setdefaultencoding('utf-8')
from selenium import webdriver
#browser = webdriver.Firefox()
browser = webdriver.Chrome();

#类定义  
class people:  
    #定义基本属性  
    name = ''  
    age = 0  
    #定义私有属性,私有属性在类外部无法直接进行访问  
    __weight = 0;  

    #############################################################
    #
    __close_after_test = True;
    #__times =("06:00:00","08:00:00","10:00:00","12:00:00","14:00:00","16:00:00","18:00:00","20:00:00","22:00:00","00:00:00");
    __times =("06:00:00","08:00:00","10:56:00","10:59:00","12:00:00","14:00:00","16:00:00","18:00:00","20:00:00","22:00:00","00:00:00");
    __price = "¥1.00";
    __jobrunning = False;    
    #
    #############################################################


    #定义构造方法  
    def __init__(self,n,a,w):  
        self.name = n  
        self.age = a  
        self.__weight = w  

    def speak(self):  
        print("%s is speaking: I am %d years old" %(self.name,self.age))

    def jdMiaoSha(self):    	

		while True:

			time.sleep(1);
			now = datetime.datetime.now()
			print now.strftime('%Y-%m-%d %H:%M:%S');

			for t in self.__times:

				jdtimeStr = "";		

				if t == "00:00:00":
					jdtimeStr = (now+datetime.timedelta(days=1)).strftime('%Y-%m-%d')+" "+ t ;
				else:
					jdtimeStr = now.strftime('%Y-%m-%d')+" "+ t ;

				jdtime = datetime.datetime.strptime( jdtimeStr ,'%Y-%m-%d %H:%M:%S');

				if (jdtime - now).seconds < 5:
					self.chromeMiao();

				else:
					print "+",

				#print now.strftime('%Y-%m-%d')   now.strftime('%H:%M:%S')
			print "";


    def chromeMiao(self):    	

		try:			

			browser.get("https://www.jd.com");

			browser.find_element_by_class_name("link-login").click()
			browser.find_element_by_link_text("账户登录").click();


			browser.find_element_by_id("loginname").send_keys("xhu218")
			browser.find_element_by_id("nloginpwd").send_keys("Pass2word321");
			browser.find_element_by_link_text("登    录").click();

			time.sleep(1)

			browser.get("https://cart.jd.com/cart.action");

			for i in range(1,60):

					time.sleep(1);

					i+=1;

					print(i);
					print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
					browser.refresh();

					content = browser.find_element_by_class_name("sumPrice");

					print(content.text.decode('utf-8',errors='strict'));

					if content.text == self.__price:

						print("good ,you get the expect price");
						print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
						
						browser.find_element_by_class_name("submit-btn").click();
						browser.find_element_by_id("order-submit").click()				

					else:
						print("try again");	

		except Exception,e :  
		    print e
		  
		if self.__close_after_test:  
		    browser.quit()							

  
  
p = people('tom',10,30)  
p.speak();  
p.jdMiaoSha();
#p.chromeMiao();
	
