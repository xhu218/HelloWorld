docker run --privileged=true  \
-d \
-p 1880:1880 \
--name my-nodered-script \
-v /etc/hosts:/etc/hosts:ro \
-v /sobeyhive/data/node-red-data:/data \
nodered/node-red-docker
