#!/bin/sh
#http://galeracluster.com/2015/05/getting-started-galera-with-docker-part-2/


service docker start

docker pull docker.io/erkules/galera:latest

#
#wget http://xhu-tool.oss-cn-beijing-internal.aliyuncs.com/galera.tar
#docker load < galera.tar
#

cd /sobeyhive
cd app
cd Mysql

if [ `hostname` ==  `echo $MysqlMain` ]
then
        echo 'hivenode01'
		docker run -d -p 3306:3306 \
		-p 4567:4567 -p 4444:4444 \
		-p 4568:4568 \
		$otherparameters \
		-v $(pwd)/data:/var/lib/mysql \
		--name mysql-hivenode01  \
		docker.io/erkules/galera:latest \
		--wsrep-cluster-address=gcomm:// --wsrep-node-address=$hivenode01   
else
		if [ `hostname` ==  'hivenode02' ]
		then
			echo 'hivenode02'
			docker run -d -p 3306:3306 \
			-p 4567:4567 -p 4444:4444 \
			-p 4568:4568 \
			$otherparameters \
			-v $(pwd)/data:/var/lib/mysql \
			--name mysql-hivenode02  \
			docker.io/erkules/galera:latest \
			--wsrep-cluster-address=gcomm://$hivenode01 --wsrep-node-address=$hivenode02
		else
			echo 'hivenode03'
			docker run -d -p 3306:3306 \
			-p 4567:4567 -p 4444:4444 \
			-p 4568:4568 \
			$otherparameters \
			-v $(pwd)/data:/var/lib/mysql \
			--name mysql-hivenode03  \
			docker.io/erkules/galera:latest \
			--wsrep-cluster-address=gcomm://$hivenode01 --wsrep-node-address=$hivenode03
		fi		
fi






