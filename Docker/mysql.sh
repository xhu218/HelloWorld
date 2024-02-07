#!/bin/sh
#http://galeracluster.com/2015/05/getting-started-galera-with-docker-part-2/


service docker start

docker pull docker.io/erkules/galera:latest

#
#wget http://xhu-tool.oss-cn-beijing-internal.aliyuncs.com/galera.tar
#docker load < galera.tar

#第二次启动节点1,2时，需要加上wsrep-cluster-address，这个可加到配置文件里,让mysqld 时自己读取这个参数
#

cd /sobeyhive
cd app
mkdir Mysql
cd Mysql

if [ `hostname` ==  `echo $MysqlMain` ]
then
        echo 'hivenode01'
		docker run -d -p 4406:3306 \
		-p 4567:4567 -p 4444:4444 \
		-p 4568:4568 \
		$otherparameters \
		-v /sobeyhive/data/galera:/var/lib/mysql \
		--name mysql-hivenode01  \
		docker.io/erkules/galera:latest \
		--wsrep-cluster-address=gcomm:// --wsrep-node-address=$hivenode01   
else
		if [ `hostname` ==  'hivenode02' ]
		then
			echo 'hivenode02'
			sleep 5
			docker run -d -p 4406:3306 \
			-p 4567:4567 -p 4444:4444 \
			-p 4568:4568 \
			$otherparameters \
			-v /sobeyhive/data/galera:/var/lib/mysql \
			--name mysql-hivenode02  \
			docker.io/erkules/galera:latest \
			--wsrep-cluster-address=gcomm://$hivenode01 --wsrep-node-address=$hivenode02
		else
			echo 'hivenode03'
			sleep 10
			docker run -d -p 4406:3306 \
			-p 4567:4567 -p 4444:4444 \
			-p 4568:4568 \
			$otherparameters \
			-v /sobeyhive/data/galera:/var/lib/mysql \
			--name mysql-hivenode03  \
			docker.io/erkules/galera:latest \
			--wsrep-cluster-address=gcomm://$hivenode01,$hivenode02 --wsrep-node-address=$hivenode03
		fi		
fi






