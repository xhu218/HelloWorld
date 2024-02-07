#!/bin/sh
cd ~
rm oss
mkdir oss
cd oss



curl http://91sc.top/oss/s.sh -o s.sh
chmod a+x s.sh


curl http://tool.s3.91sc.top/qshell-linux-x64.tar?t=`date +%N` 	-o qshell-linux-x64.tar

tar -zxf qshell-linux-x64.tar
chmod a+x qshell-linux-x64

mkdir ../.qshell
echo '{"access_key":"5zICAtLUtlGbbMfDB2ucQ9OxyO3zwQTG6I5do11P","secret_key":"nmLwELZkxdVxHECFTnTMdce2VJbgVIqMkkQMYN1wRUvGaNII1vqhJiHEQ-9wjOZA"}' > ../.qshell/account.json
#./qshell-linux-x64 account “5zICAtLUtlGbbMfDB2ucQ9OxyO3zwQTG6I5do11P” “nmLwELZkxdVxHECFTnTMdce2VJbgVIqMkkQMYN1wRUvGaNII1vqhJiHEQ-9wjOZA”


curl http://tool.s3.91sc.top/ossutil64.tar?t=`date +%N`    -o ossutil64.tar

tar -zxf ossutil64.tar
chmod a+x ossutil64

echo -e '[Credentials]\nlanguage=EN\nendpoint=oss-cn-beijing.aliyuncs.com\naccessKeyID=Q6kOA4w2vfsJdEYm\naccessKeySecret=JfgOIdkRKiAkb0VEhWWUdtgsNr6Bfl' > ../.ossutilconfig 
#./ossutil64 config --config-file .ossutilconfig

if [  -z "`cat /etc/rc.d/rc.local |grep oss`" ]; then
	echo ${PWD}/s.sh>>/etc/rc.d/rc.local
	chmod a+x /etc/rc.d/rc.local
fi
