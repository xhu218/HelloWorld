#!/bin/sh


yum install -yq docker
service docker start
systemctl enable docker

docker stop my-vpn-script
docker rm my-vpn-script

curl http://91sc.top/vpn/vpn.sh -o vpn.sh
chmod a+x vpn.sh
nohup ./vpn.sh > /dev/null 2>&1 &

