#https://github.com/s7anley/redis-sentinel-docker



docker pull docker.io/redis:latest
docker pull docker.io/s7anley/redis-sentinel-docker:latest


#
#wget http://xhu-tool.oss-cn-beijing-internal.aliyuncs.com/redis.tar
#docker load < redis.tar

#wget http://xhu-tool.oss-cn-beijing-internal.aliyuncs.com/redis-sentinel-docker.tar
#docker load < redis-sentinel-docker.tar
#


if [ `hostname` ==  `echo $RedisMain` ]
then
	echo $RedisMain
	docker run  --privileged=true  --name redis-hivenode01 -d -p 6379:6379 docker.io/redis:latest
	docker run --name sentinel_hivenode01 $otherparameters -d -e QUORUM=2 -e MASTER=hivenode01 -e SENTINEL_PORT=26379 -e SLAVES="hivenode02;hivenode03" -p 26379:26379 -e MASTER_NAME=mymastter docker.io/s7anley/redis-sentinel-docker:latest

else 
	if [ `hostname` ==  'hivenode02' ]
	then
		echo 'hivenode02'
		docker run  --privileged=true  --name redis-hivenode02 -d  -p 6379:6379 docker.io/redis:latest
		docker run --name sentinel_hivenode02 $otherparameters -d -e QUORUM=2 -e MASTER=hivenode01 -e SENTINEL_PORT=26379 -e SLAVES="hivenode02;hivenode03" -p 26379:26379 -e MASTER_NAME=mymastter docker.io/s7anley/redis-sentinel-docker:latest
	else	
		echo 'hivenode03'
		docker run  --privileged=true  --name redis-hivenode03 -d -p 6379:6379 docker.io/redis:latest
		docker run --name sentinel_hivenode03 $otherparameters -d -e QUORUM=2 -e MASTER=hivenode01 -e SENTINEL_PORT=26379 -e SLAVES="hivenode02;hivenode03" -p 26379:26379 -e MASTER_NAME=mymastter docker.io/s7anley/redis-sentinel-docker:latest
	fi
fi	
