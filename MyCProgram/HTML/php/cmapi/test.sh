#!/bin/sh

while true;
do
	cd ~
	if [ ! -d "log" ]; then
		mkdir log
	fi
	cd log
    d=${HOSTNAME}`date +"%y%m%d%H"`
    d1=${HOSTNAME}`date +"%y%m%d%H%M%S"`
    echo "start request    "$d1>>/home/ec2-user/$d.txt
    curl -i http://localhost:22768/CMApi/api/basic/account/testconnect >>/home/ec2-user/$d.txt
    echo "end request    "$d1>>/home/ec2-user/$d.txt
    #tar -zcf $d1.txt.tar $d.txt 
    #curl http://91sc.top/upload_file.php -F "file=@$d1.txt.tar"


    sleep 5 
done
