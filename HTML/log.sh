#!/bin/bash

rootPath="/infinityfs1/hivefiles/sobeyhive/bucket-z/wfg/logs" mydate=$(date +%Y-%m-%d) myhostname=$(hostname)

path=$rootPath"/"$mydate"/"$myhostname

if [ ! -x $rootPath ];then mkdir logs fi

cd $rootPath

if [ ! -x $mydate ];then mkdir $mydate fi

cd $mydate

rm -rf $myhostname

if [ ! -x $myhostname ];then mkdir $myhostname fi

echo "dest path = "$path

echo $(date +%Y-%m-%d --date='1 days ago')

find /sobeyhive/logs/cmserver/$(date +%Y-%m-%d) -name '' -exec cp -v --parents {} $path ; 
#find /sobeyhive/logs/cmserver/$(date +%Y-%m-%d --date='1 days ago') -name '' -exec cp -v --parents {} $path ; 
#find /sobeyhive/logs/cmserver/$(date +%Y-%m-%d --date='2 days ago') -name '*' -exec cp -v --parents {} $path ;



