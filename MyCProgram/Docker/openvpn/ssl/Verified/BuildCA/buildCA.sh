#!/bin/bash

BIN=`dirname "${BASH_SOURCE-$0}"`
BIN=`cd "$BIN">/dev/null; pwd`
cd $BIN


#rootCA
mkdir ./CA/
openssl genrsa -des3 -out ./CA/rootCA.key 2048
openssl req -x509 -new -nodes -key ./CA/rootCA.key -sha256 -days 1024 -out ./CA/rootCA.pem -config <( cat root.csr.cnf )
cp ./CA/rootCA.pem ./CA/rootCA.crt
cp ./CA/* ../CA/

