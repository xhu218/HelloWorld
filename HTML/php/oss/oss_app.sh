#!/bin/sh

pre1(){

	echo $1 $2 $3
	cd $1
	cd ..
	echo "tar -zcvf "$2$3.tar" $1"
	tar -zcvf "$2$3.tar" $1



}


uploadQiniu(){

	
	echo "dir = $1"
	echo "name = $2"
	echo "random = $3"
	
	pre1 $1 $2 $3	
	
	cd /oss	
	
	echo "Qiniu uploading +++++++++++++++++++++++++++++++++++++++++++++++"
	echo "./qshell-linux-x64 fput xhu219 $1$3.tar $1$3.tar"
	./qshell-linux-x64 fput tools-n $1$3.tar $1$3.tar	


}

uploadAliyun(){

	echo "dir = $1"
	echo "name = $2"
	echo "random = $3"
	
	pre1 $1 $2 $3	
	
	cd /oss		
	folder=`date +%Y/%m/%d/%H`
	echo "aliyun uploading +++++++++++++++++++++++++++++++++++++++++++++++"
	echo "./ossutil64 cp -f $1$3.tar oss://xhu218/$2$3.tar"
	./ossutil64 cp $1$3.tar oss://xhu218/$folder/$2$3.tar

}



dir="/root/wfg"
name="wfg"
d="-${HOSTNAME}-"`date +%d`
#d="-${HOSTNAME}-"`date +%Y%m%d%H%M`




if [ -d $dir ]; then
	uploadAliyun $dir $name $d
	uploadQiniu  $dir $name $d
	rm -f $dir$d.tar
fi




if [ -f "/oss/appback" ];then 

	dir="/sobeyhive/app"
	name="app"

	if [ -d $dir ]; then
		uploadAliyun $dir $name $d
		rm -f $dir$d.tar
	fi

fi










