docker run  --privileged=true -d --name my-jdserver-script \
-v $(pwd)/script/:/home/Service/script \
-v $(pwd)/package.json:/home/Service/package.json \
-v /home/administrator/Documents/node_modules:/home/Service/node_modules \
-v /infinityfs1/hivefiles/sobeyhive:/ext_file_root \
--add-host hive.sobey.com:172.16.168.205 \
-v /etc/localtime:/etc/localtime:ro \
-p 8888:8888 my-cmserver-autotest-app

