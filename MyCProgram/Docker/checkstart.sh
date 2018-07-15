#!/bin/sh

count=1

arrayWen=( 80cceaac5239  da85e75f14b3 faaa57f63da0 1fb87772f2e1)  

#while [ $count -le 10000 ]; do
while true; do

	sh ./clear_docker_logs.sh

	#每天十点钟停下jj	
	########################################################
	a=`date +%H%M`
	b=1100
	
	echo $a
	echo $b
	
	if [ $a -eq $b ] 
	then
		docker stop 80cceaac5239
	
	
	fi 

	#########################################################

	echo ${#arrayWen[@]}  

	for containerName in ${arrayWen[@]};  
	do  
		#echo $containerName  
		if [ -z "`docker ps | grep $containerName`" ]; then
			echo "docker start $containerName"
			docker start $containerName
		fi
	done  
    #echo $count
    #count=$((count + 1))
	docker ps | awk '{print $1;}'
    sleep 5
done
echo "finished"

