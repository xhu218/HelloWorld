#!/bin/bash

BIN=`dirname "${BASH_SOURCE-$0}"`
BIN=`cd "$BIN">/dev/null; pwd`
cd $BIN


#for haproxy
mkdir ./ssl/
openssl req -new -sha256 -nodes -out ./ssl/hive_crt.csr -newkey rsa:2048 -keyout ./ssl/hive_crt.key -config <( cat hive_crt.csr.cnf )
openssl x509 -req -in ./ssl/hive_crt.csr -CA ./CA/rootCA.pem -CAkey ./CA/rootCA.key -CAcreateserial -out ./ssl/hive_crt.crt -days 500 -sha256 -extfile v3.ext
cat ./ssl/hive_crt.crt ./ssl/hive_crt.key |tee ./ssl/hive_crt.pem
#for jove
openssl pkcs12 -export -out ./ssl/server.pfx -inkey ./ssl/hive_crt.key -in ./ssl/hive_crt.crt

#decode
openssl rsa -in ./ssl/hive_crt.key -out ./ssl/hive_crt_dec.key
