#!/bin/sh
cd ~
rm -rf /oss
mkdir /oss
cd /oss
curl http://tool.s3.91sc.top/qshell-linux-x64.tar?t=`date +%N` 	-o /oss/qshell-linux-x64.tar
sleep 5
tar -zxf qshell-linux-x64.tar
chmod a+x /oss/qshell-linux-x64

echo '{"access_key":"5zICAtLUtlGbbMfDB2ucQ9OxyO3zwQTG6I5do11P","secret_key":"nmLwELZkxdVxHECFTnTMdce2VJbgVIqMkkQMYN1wRUvGaNII1vqhJiHEQ-9wjOZA"}' > /root/.qshell/account.json

curl http://tool.s3.91sc.top/ossutil64.tar?t=`date +%N`			-o /oss/ossutil64.tar
sleep 5
tar -zxf ossutil64.tar
chmod a+x /oss/ossutil64

echo -e '[Credentials]\nlanguage=EN\nendpoint=oss-cn-beijing.aliyuncs.com\naccessKeyID=Q6kOA4w2vfsJdEYm\naccessKeySecret=JfgOIdkRKiAkb0VEhWWUdtgsNr6Bfl' > /root/.ossutilconfig 

