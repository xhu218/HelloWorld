
#https://hub.docker.com/r/jeygeethan/zookeeper-cluster/
#https://blog.csdn.net/sqzhao/article/details/54969261


service docker start

docker pull jeygeethan/zookeeper-cluster

#
#wget https://xhu-tool.oss-cn-beijing-internal.aliyuncs.com/zookeeper-cluster.tar
#docker load < zookeeper-cluster.tar
#

if [ `hostname` == 'hivenode01'  ]
then
        echo 'hivenode01'
		docker run -d --restart=always \
		  -p 2181:2181 \
		  -p 2888:2888 \
		  -p 3888:3888 \
		  $otherparameters \
		  -v /var/lib/zookeeper:/var/lib/zookeeper \
		  -v /var/log/zookeeper:/var/log/zookeeper  \
		  --name=zookeeper-hivenode01 \
		  jeygeethan/zookeeper-cluster hivenode01,hivenode02,hivenode03 1

else
		if [ `hostname` ==  'hivenode02' ]
		then
		
			echo 'hivenode02'	  
			docker run -d --restart=always \
			  -p 2181:2181 \
			  -p 2888:2888 \
			  -p 3888:3888 \
			  $otherparameters \
			  -v /var/lib/zookeeper:/var/lib/zookeeper \
			  -v /var/log/zookeeper:/var/log/zookeeper  \
			  --name=zookeeper-hivenode02 \
			  jeygeethan/zookeeper-cluster hivenode01,hivenode02,hivenode03 2
		else
		
			echo 'hivenode03'
			docker run -d --restart=always \
				  -p 2181:2181 \
				  -p 2888:2888 \
				  -p 3888:3888 \
				  $otherparameters \
				  -v /var/lib/zookeeper:/var/lib/zookeeper \
				  -v /var/log/zookeeper:/var/log/zookeeper  \
				  --name=zookeeper-hivenode03 \
				  jeygeethan/zookeeper-cluster hivenode01,hivenode02,hivenode03 3
		fi		
fi

