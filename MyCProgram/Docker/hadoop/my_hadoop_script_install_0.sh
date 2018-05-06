docker run  --privileged=true -it \
--name hadoop0 \
-d \
--ip 192.168.3.10 \
-v /etc/hosts:/etc/hosts:ro \
-v /etc/localtime:/etc/localtime:ro \
-v $(pwd)/data/hadoop:/usr/local/hadoop/etc/hadoop \
--net mynetwork \
-v $(pwd)/step1.sh:/step1.sh \
-v $(pwd)/step2.sh:/step2.sh \
-v $(pwd)/data:/data \
-v $(pwd)/data/bootstrap.sh:/etc/bootstrap.sh \
--add-host hadoop0:192.168.3.10 \
--add-host hadoop1:192.168.3.11 \
--add-host hadoop2:192.168.3.12 \
-p 50070:50070 \
-p 8088:8088 \
-p 8888:8888 \
my-hadoop-app  \
/etc/bootstrap.sh -bash
