#!/bin/sh

echo hello

#touch /ext_file_root/hivefiles/sobeyhive/buckets/u-3ulc5d341cl2tqwr/47e4f93b55cf4578ae4182be1012876cmyfly.mp4
#touch /ext_file_root/hivefiles/sobeyhive/buckets/u-3ulc5d341cl2tqwr/PEF_New_3abaf010db8c4f6686d670610dc92c21.pef

node script/server.js

count=1

while [ $count -le 1 ]; do
    echo $count
    count=$((count + 1))
    sleep 1
done
echo "finished"

