docker run  --privileged=true -it --rm \
-v $(pwd)/step1.sh:/step1.sh \
-v $(pwd)/step2.sh:/step2.sh \
-v $(pwd)/data:/data \
sequenceiq/hadoop-docker:2.7.0 \
/etc/bootstrap.sh -bash
