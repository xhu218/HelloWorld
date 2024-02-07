docker run --rm -v $PWD:/work -it my-openvpn-app openssl req -out /work/CSR.csr -new -newkey rsa:2048 -nodes -keyout /work/privateKey.key 
docker run --rm -v $PWD:/work -it my-openvpn-app openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout privateKey.key -out /work/certificate.crt

