import urllib2

url = 'http://www.baidu.com'
rq = urllib2.Request(url)
rs = urllib2.urlopen(rq).read()
print rs