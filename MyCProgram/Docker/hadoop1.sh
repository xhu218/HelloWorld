#!/bin/sh

#change history
#20180502 install hadoop
#mysql
#redis
#kafka
#redis

#serverbase=http://xhu-tool.oss-cn-beijing-internal.aliyuncs.com/
serverbase=http://tool.s3.91sc.top/

cd /
mkdir sobeyhive
cd sobeyhive
mkdir app
cd app

rm Docker.tar
rm hadoop-docker.tar
rm spark.tar

wget ${serverbase}Docker.tar
#or get it from Qiniu
#wget http://tool.s3.91sc.top/Docker.tar
tar -xf Docker.tar

wget ${serverbase}hadoop-docker.tar
#wget http://xhu-tool.oss-cn-beijing-internal.aliyuncs.com/spark.tar


yum install -y docker
service docker start

yum -y install bridge-utils

docker load<hadoop-docker.tar
docker tag 789 sequenceiq/hadoop-docker:2.7.0

#docker load<spark.tar
#docker tag 016b4fce9cd0 sequenceiq/spark:1.6.0




docker network create --subnet=192.168.3.1/24 mynetwork
docker network ls

cd /sobeyhive/app/Docker/hadoop/data/script

wget ${serverbase}/node_modules.tar
tar -xf node_modules.tar

cd /sobeyhive/app/Docker/hadoop

docker build -t my-hadoop-app .

./my_hadoop_script_install_0.sh
./my_hadoop_script_install_1.sh
./my_hadoop_script_install_2.sh

echo plese open 8088 50070 prot to view
