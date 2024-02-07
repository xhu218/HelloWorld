#!/bin/sh

if [ -d $(pwd)/node_modules ]; then
    echo "exist node_modules"
else
    curl http://172.16.148.14:82/node_modules.tar
    tar -zxf node_modules.tar    
fi

if [ -n "`docker images | grep cmserver-autotest-app`" ]; then
	echo "exist cmserver-autotest-app "
else
	docker build -t cmserver-autotest-app .
fi



docker run  --privileged=true --rm -it \
-v $(pwd)/script/:/home/Service/script \
-v $(pwd)/package.json:/home/Service/package.json \
-v $(pwd)/run.sh:/run.sh \
-v $(pwd)/node_modules:/node_modules \
-v /infinityfs1:/ext_file_root \
--add-host hive.sobey.com:172.16.168.205 \
-P  cmserver-autotest-app

