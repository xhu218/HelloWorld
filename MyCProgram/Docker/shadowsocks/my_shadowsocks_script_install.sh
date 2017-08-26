#!/bin/sh
YOUR_SERVER_IP=45.76.217.92
YOUR_SERVER_PORT=9111
SSPASSWORD=Ibgpssv44
#docker run -d -p 1984:1984 --name my_shadowsocks_script my-shadowsocks-client-app -b 0.0.0.0 -s $YOUR_SERVER_IP -p $YOUR_SERVER_PORT -l 1984 -k $SSPASSWORD -m chacha20
 docker run -d -p 1984:1984 --name my-shadowsocks-script my-shadowsocks-client-app -b 0.0.0.0 -s $YOUR_SERVER_IP -p $YOUR_SERVER_PORT -l 1984 -k $SSPASSWORD -m rc4-md5 -v "$(pwd)"/log:/var/log


