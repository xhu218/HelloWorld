#!/bin/sh
#https://github.com/gten/docker-kafka-cluster


docker pull docker.io/jeygeethan/kafka-cluster:latest 

#
#wget https://xhu-tool.oss-cn-beijing.aliyuncs.com/kafka-cluster.tar
#docker load < kafka-cluster.tar
#

if [ `hostname` == 'hivenode01'  ]
then
        echo 'hivenode01'
		docker run -p 9092:9092 \
		-d \
		-e KAFKA_HOST=hivenode01 \
		-e KAFKA_PORT=9092 \
		-e ZOOKEEPER_CONNECT=${hivenode01}:2181,${hivenode02}:2181,${hivenode03}:2181 \
		-e BROKER_ID=0 \
		--name kafka-hivenode01 jeygeethan/kafka-cluster


else
		if [ `hostname` ==  'hivenode02' ]
		then
		
			echo 'hivenode02'
			docker run -p 9092:9092 \
			-d \
			-e KAFKA_HOST=hivenode02 \
			-e KAFKA_PORT=9092 \
			-e ZOOKEEPER_CONNECT=${hivenode01}:2181,${hivenode02}:2181,${hivenode03}:2181 \
			-e BROKER_ID=1 \
			--name kafka-hivenode02 jeygeethan/kafka-cluster
			
		else
		
			echo 'hivenode03'
			docker run -p 9092:9092 \
			-d \
			-e KAFKA_HOST=hivenode03 \
			-e KAFKA_PORT=9092 \
			-e ZOOKEEPER_CONNECT=${hivenode01}:2181,${hivenode02}:2181,${hivenode03}:2181 \
			-e BROKER_ID=1 \
			--name kafka-hivenode03 jeygeethan/kafka-cluster
			
		fi		
fi
