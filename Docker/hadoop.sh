#!/bin/sh
#https://hub.docker.com/r/sequenceiq/hadoop-docker/

docker pull docker.io/sequenceiq/hadoop-docker:2.7.0

#wget http://xhu-tool.oss-cn-beijing-internal.aliyuncs.com/hadoop-dcoker.tar
#docker load < hadoop-dcoker.tar

#wget http://xhu-tool.oss-cn-beijing-internal.aliyuncs.com/my-hadoop-app.tar
#docker load < my-hadoop-app.tar


if [ `hostname` ==  'hivenode01' ]
then
	cd /sobeyhive/app/hadoop
	./my_hadoop_script_install_0.sh
else 
	if [ `hostname` ==  'hivenode02' ]
	then
		cd /sobeyhive/app/hadoop
		./my_hadoop_script_install_1.sh
	else		
		cd /sobeyhive/app/hadoop
		./my_hadoop_script_install_2.sh
	fi
fi	
