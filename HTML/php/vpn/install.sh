#!/bin/sh

#update dns
curl http://91sc.top/vpn/dns.sh | bash

yum install -yq docker
service docker start
systemctl enable docker

docker stop my-vpn-script
docker rm my-vpn-script

curl http://91sc.top/vpn/vpn.sh -o vpn.sh
chmod a+x vpn.sh
nohup ./vpn.sh > /dev/null 2>&1 &

docker run -d --name my-vpn-script -p 1984:1984 oddrationale/docker-shadowsocks -s 0.0.0.0 -p 1984 -k 123456 -m aes-256-cfb

