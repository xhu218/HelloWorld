#!/bin/bash

BIN=`dirname "${BASH_SOURCE-$0}"`
BIN=`cd "$BIN">/dev/null; pwd`
cd $BIN




#for client

openssl genrsa -out client/client-key.pem 1024

openssl req -new -out client/client-req.csr -key client/client-key.pem 

openssl x509 -req -in client/client-req.csr -out client/client-cert.pem -signkey client/client-key.pem -CA ./CA/rootCA.pem -CAkey ./CA/rootCA.key -CAcreateserial -days 3650

openssl pkcs12 -export -clcerts -in client/client-cert.pem -inkey client/client-key.pem -out client/client.p12 
