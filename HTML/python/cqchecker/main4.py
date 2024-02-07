import time
import datetime
import io


s = "hellowfg"
b = s.upper()
print s, b
if "WFG" in b:
	print "contains"
else:
	print "not contains"



str1 = "[20180920 wangfu1gui]"
n = ['WFG',"WANGFUGUI",'YRF','yaorongfu']


for i in n: 
	if i in str1.upper():
		print "contains";
		break;



now = datetime.datetime.now()
print now.strftime('%H:%M:%S');


file = r'E:\\Work\\HelloWorld.git\\trunk\\MyCProgram\\HTML\\python\\bug\\1.txt'
with open(file, 'a+') as f:
     f.write("hello"+'\n')
     f.close(); 


with open(file, 'a+') as f:
     f.write("hellobbb"+'\n')
     f.close();      




