#!/bin/sh

pre1(){

	echo $1 $2 $3
	
	echo "tar -zcvf "$1$3.tar" $1"
	tar -zcvf "$1$3.tar" $1



}


uploadQiniu(){

	
	echo "dir = $1"
	echo "name = $2"
	echo "random = $3"
	

	pre1 $1 $2 $3	

	
	
	
	cd /oss	
	
	echo "Qiniu uploading +++++++++++++++++++++++++++++++++++++++++++++++"
	echo "./qshell-linux-x64 fput xhu218-s $1$3.tar $1$3.tar"
	./qshell-linux-x64 fput xhu218-s $1$3.tar $1$3.tar	


}

uploadAliyun(){

	echo "dir = $1"
	echo "name = $2"
	echo "random = $3"
	

	pre1 $1 $2 $3	

	
	cd /oss		
	folder=`date +%Y/%m/%d/%H`
	echo "aliyun uploading +++++++++++++++++++++++++++++++++++++++++++++++"
	echo "./ossutil64 cp -f $1$3.tar oss://xhu219/$2$3.tar"
	./ossutil64 cp $1$3.tar oss://xhu219/$folder/$2$3.tar

}



dir="/root/wfg"
name="wfg"
#d="-${HOSTNAME}-"`date +%d`
d="-${HOSTNAME}-"`date +%Y%m%d%H%M`




if [ -d $dir ]; then
	uploadAliyun $dir $name $d
	uploadQiniu  $dir $name $d
	rm -f $dir$d.tar
fi




dir="/sobeyhive/data/node-red-data"
name="node-red-data"
if [ -d $dir ]; then	
	uploadQiniu $dir $name $d
	uploadAliyun  $dir $name $d
	rm -f $dir$d.tar
fi


dir="/etc/haproxy"
name="haproxy"
if [ -d $dir ]; then
	uploadQiniu $dir $name $d
	uploadAliyun  $dir $name $d
	rm -f $dir$d.tar
fi

#dir="/sobeyhive/app"
#name="app"
#if [ -d $dir ]; then
#	uploadAliyun $dir $name $d
#	rm -f $dir$d.tar
#fi


dir="/tmp/login_data"
name="login_data"
if [ -d $dir ]; then
	uploadQiniu $dir $name $d
	uploadAliyun  $dir $name $d
	rm -f $dir$d.tar
fi

file="/etc/hosts"
name="hosts"
if [ -f $file ];then
	uploadQiniu $file $name $d
	uploadAliyun  $file $name $d
	rm -f $file$d.tar
fi


