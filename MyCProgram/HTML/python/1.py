
import codecs
import re
import os
import time
import datetime


def getData(path):
   
    str=''
    #   **unicode(name+'.csv','utf-8')**
    with codecs.open(path,'r','utf-8') as f:
        for line in f.readlines():
            str=str+line
    return str.strip()

def getSpace(level):
    space='\n'
    for i in range(level):
        space=space+'    '
    return space

def printXml(xml_str):
    
    #xml_list=xml_str.split('([>])')
    new_xml_list=""
    head=xml_str[0:9]
    xml_str=xml_str[9:]
    xml_list=re.split(r'([>])',xml_str)
    xml_list = ["".join(i) for i in zip(xml_list[0::2],xml_list[1::2])]
    level=0
    for node in xml_list:
        if(re.match(r'<\?xml .*version.*\?>',node)):
            new_xml_list=new_xml_list+new_xml_list+node
            continue
        elif(re.match(r'<[^\?^/].*[^/]>',node)):
            new_xml_list=new_xml_list+getSpace(level)+node
            level=level+1
            continue
        elif(re.match(r'</.*[^/]>',node)):
            level=level-1
            new_xml_list=new_xml_list+getSpace(level)+node
            continue
        elif(re.match(r'<[^/].*/>',node)):
            new_xml_list=new_xml_list+getSpace(level)+node
        elif(re.match(r'.+</.*[^/]>',node)):
            new_xml_list=new_xml_list+node
            level=level-1
        #else:
            #print(node)

    return (new_xml_list)

def savetofile(path,xml):
    
    f = codecs.open(path, 'w', 'utf-8')
    f.write(xml)
    f.close()

def main1(path):

    #path="E:\\Data\\2020-02-02\\000152.xml"
    xml_str=getData(path)   
    #print xml_str
    xml_str1=printXml(xml_str)
    #print xml_str1
    savetofile(path, xml_str1)

def main2(path):

    the_div = str(BeautifulSoup(getData(path)))
    savetofile(path, the_div)


def changeAllTheFiles():
    
    filePath = 'E:\\Data\\'+getTimeStr()+'\\'
    #filePath = 'E:\\Data\\'
    index =0
    for i,j,k in os.walk(filePath):
       for f in k:
            
            index=index+1
            print index,filePath + f
            try :
                main1(filePath + f)
            except :
                print "dd"

def getTimeStr():
    now = datetime.datetime.now()
    current = now.strftime('%Y-%m-%d')            
    return current

def main():

    print changeAllTheFiles()    

main()