#!/bin/sh

pre1(){

	echo $1 $2 $3
	cd $1
	cd ..

	tar -zcvf "$2$3.tar" $1



}

uploads3(){
	echo $1
	echo $2
	cd /oss
	./qshell-linux-x64 fput xhu219 $1 $1
	./ossutil64 cp $1 oss://xhu219/$2

}

while true; do
	
	
	d=`date +%Y%m%d%H%M%s`
	
	dir="/sobeyhive/data/node-red-data"
	name="node-red-data"
	
	pre1 $dir $name $d	
	uploads3 "$dir${d}.tar" $name$d.tar
	
	
	sleep 86400

done
