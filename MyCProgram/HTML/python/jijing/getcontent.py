# 用urllib.request 代替原来的 urllib2
import urllib.request
 
url = "http://www.baidu.com"
#用urllib.request.urlopen()  代替 urllib2.urlopen（） 
response1 = urllib.request.urlopen(url)
#打印请求的状态码
print(response1.getcode())
#打印请求的网页内容的长度
print(len(response1.read()))
