docker run  --privileged=true --rm -it \
-v $(pwd)/script/:/home/Service/script \
-v $(pwd)/package.json:/home/Service/package.json \
-v /infinityfs1:/ext_file_root \
--add-host hive.sobey.com:172.16.168.205 \
-p 8888:8888 my-cmserver-autotest-app
