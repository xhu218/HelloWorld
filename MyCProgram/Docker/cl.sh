#!/bin/bash

rootPath="/infinityfs1/hivefiles/sobeyhive/bucket-z/wfg/logs" 
mydate=$(date +%Y-%m-%d) myhostname=$(hostname)

path=$rootPath"/"$mydate"/"$myhostname

if [ ! -x $rootPath ];then mkdir logs 
fi

cd $rootPath

if [ ! -x $mydate ];then mkdir $mydate 
fi

cd $mydate

rm -rf $myhostname

if [ ! -x $myhostname ];then mkdir $myhostname 
fi

echo "dest path = "$path

echo $(date +%Y-%m-%d --date='1 days ago')

#COPY日志文件
find /sobeyhive/logs/cmserver/$(date +%Y-%m-%d) -name '*' -exec cp -vpr --parents {} $path \;
#find /sobeyhive/logs/cmserver/$(date +%Y-%m-%d --date='1 days ago') -name '*' -exec cp -vpr --parents {} $path \;
#find /sobeyhive/logs/cmserver/$(date +%Y-%m-%d --date='2 days ago') -name '*' -exec cp -vpr --parents {} $path \;

#替换文件
#find ./ -name "file*" -print | xargs -i sed -i 's/test/wfg/' {} ;

#查找日志文件
find ./ -name "file*" -print | xargs grep -Hn 'test'

#last -n 5 | awk '{print $1}'
