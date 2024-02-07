docker run  --privileged=true -it \
--name hadoop-hivenode02 \
-d \
--ip $hivenode02 \
-v /etc/hosts:/etc/hosts:ro \
-v /etc/localtime:/etc/localtime:ro \
-v $(pwd)/data/hadoop:/usr/local/hadoop/etc/hadoop \
-v $(pwd)/step1.sh:/step1.sh \
-v $(pwd)/step2.sh:/step2.sh \
-v $(pwd)/data:/data \
$otherparameters \
sequenceiq/hadoop-docker:2.7.0 \
/etc/bootstrap.sh -bash
