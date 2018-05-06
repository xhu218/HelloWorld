docker run  --privileged=true -it \
--name hadoopbase \
-d \
-v $(pwd)/step1.sh:/step1.sh \
-v $(pwd)/step2.sh:/step2.sh \
-v $(pwd)/data:/data \
-p 50070:50070 \
-p 8088:8088 \
sequenceiq/hadoop-docker:2.7.0 \
/etc/bootstrap.sh -bash
