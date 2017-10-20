##docker run --rm -v $PWD:/work -it my-openvpn-app openssl req -out /work/CSR.csr -new -newkey rsa:2048 -nodes -keyout /work/privateKey.key 
##docker run --rm -v $PWD:/work -it my-openvpn-app openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout privateKey.key -out /work/certificate.crt

#生成顶级CA的公钥证书和私钥文件，有效期10年
docker run --rm -v $PWD:/work -v $PWD/openssl.cnf:/etc/ssl/openssl.cnf -it my-openvpn-app openssl req -new -x509 -days 3650 -keyout /work/CARoot1024.key -out /work/CARoot1024.crt -sha256 -subj '/CN=sobey1.com/subjectAltName=DNS.1=sobey1.com/'

#为顶级CA的私钥文件去掉保护口令
docker run --rm -v $PWD:/work -v $PWD/openssl.cnf:/etc/ssl/openssl.cnf -it my-openvpn-app openssl rsa -in /work/CARoot1024.key -out /work/CARoot1024.key

#为应用证书/中级证书生成私钥文件
docker run --rm -v $PWD:/work -v $PWD/openssl.cnf:/etc/ssl/openssl.cnf -it my-openvpn-app openssl genrsa -out /work/app.key 2048 -subj '/CN=sobey1.com/subjectAltName=DNS.1=sobey1.com/'

#根据私钥文件，为应用证书/中级证书生成CSR证书请求文件
docker run --rm -v $PWD:/work -v $PWD/openssl.cnf:/etc/ssl/openssl.cnf -it my-openvpn-app openssl req -new -key /work/app.key -out /work/app.csr -subj '/CN=sobey1.com/subjectAltName=DNS.1=sobey1.com/'

#使用CA的公钥私钥文件给scr文件签名，生成应用证书，有效期五年
docker run --rm -v $PWD:/work -v $PWD/openssl.cnf:/etc/ssl/openssl.cnf -it my-openvpn-app openssl ca -in /work/app.csr -out /work/app.crt -cert /work/CARoot1024.crt -keyfile /work/CARoot1024.key -days 1826 -policy policy_anything -subj '/CN=sobey1.com/subjectAltName=DNS.1=sobey1.com/'
