docker run  --privileged=true -it \
--name hadoop-hivenode01 \
-d \
-v /etc/hosts:/etc/hosts:ro \
-v /etc/localtime:/etc/localtime:ro \
-v $(pwd)/data/hadoop:/usr/local/hadoop/etc/hadoop \
-v $(pwd)/step1.sh:/step1.sh \
-v $(pwd)/step2.sh:/step2.sh \
-v $(pwd)/data:/data \
-v $(pwd)/data/bootstrap.sh:/etc/bootstrap.sh \
$otherparameters \
--net=host \
my-hadoop-app  \
/etc/bootstrap.sh -bash
