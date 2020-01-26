#!/bin/sh

#author: 	wangfugui@sobey.com
#comment: 	一键安装gen2应用

mkdir /sobeyhive
cd /sobeyhive/
rm  app20181207.tar
wget http://172.16.168.205:86/bucket-z/wfg/app20181207.tar
tar -zxf app20181207.tar


#设置国内源

mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
cd /etc/yum.repos.d/
wget http://mirrors.163.com/.help/CentOS7-Base-163.repo
yum makecache
#yum -y update


#安装docker

yum install -y docker
systemctl disable firewalld
systemctl enable docker

sed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/sysconfig/selinux 
sed -i 's/overlay2/overlay/g' /etc/sysconfig/docker-storage
sed -i 's/DOCKER_STORAGE_OPTIONS=/DOCKER_STORAGE_OPTIONS="--storage-driver overlay"/g' /etc/sysconfig/docker-storage
sed -i 's/--selinux-enabled --log/--selinux-enabled=false --log/g' /etc/sysconfig/docker
sed -i 's/{}/{"registry-mirrors" : ["https:\/\/registry.docker-cn.com"]}/g' /etc/docker/daemon.json


cd /sobeyhive
curl http://91sc.top/sobeyhive/start.sh -o start.sh
chmod a+x start.sh


#echo "/sobeyhive/start.sh">>/etc/rc.d/rc.local
#chmod a+x /etc/rc.d/rc.local
echo "start to reboot"
sleep 5
reboot
