docker run  --privileged=true -d --name my-jjserver-script \
-v $(pwd)/script/:/home/Service/script \
-v $(pwd)/package.json:/home/Service/package.json \
-v $(pwd)/node_modules:/home/Service/node_modules \
-v /infinityfs1/hivefiles/sobeyhive:/ext_file_root \
-v $(pwd)/run.sh:/run.sh \
--add-host hive.sobey.com:172.16.168.205 \
-v /etc/localtime:/etc/localtime:ro \
-p 9999:8888 my-node-app

