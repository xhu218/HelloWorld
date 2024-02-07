#!/bin/sh

# 每个节点=下载环境变量

wget http://net.91sc.top/init.sh -O init.sh
cp init.sh /etc/profile.d/
source /etc/profile.d/init.sh

#设置机器名

#hostnamectl set-hostname hivenode01
#hostnamectl set-hostname hivenode02
#hostnamectl set-hostname hivenode03

#设置免密码登录

#cd  ~
#mkdir .ssh
#cd .ssh
#ssh-keygen -t rsa #(一直按回车即可)
#ssh-copy-id -i localhost
#ssh-copy-id -i hivenode01
#ssh-copy-id -i hivenode02
#ssh-copy-id -i hivenode03

#设置国内源

mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
cd /etc/yum.repos.d/
wget http://mirrors.163.com/.help/CentOS7-Base-163.repo
yum makecache
#yum -y update


#安装docker

yum install -y docker


sed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/sysconfig/selinux 
sed -i 's/overlay2/overlay/g' /etc/sysconfig/docker-storage
sed -i 's/--selinux-enabled --log/--selinux-enabled=false --log/g' /etc/sysconfig/docker
sed -i 's/{}/{"registry-mirrors" : ["https:\/\/registry.docker-cn.com"]}/g' /etc/docker/daemon.json

cd /
mkdir sobeyhive
cd sobeyhive
wget http://tool.s3.91sc.top/Docker.tar -O Docker.tar
tar -xf Docker.tar
mv Docker app
rm Docker.tar


systemctl enable docker

reboot

