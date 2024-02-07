service docker start
cd /nas
mkdir /sobeyhive
mkdir /sobeyhive/data
mkdir /sobeyhive/data/node-red-data
chmod 777 /sobeyhive/data/node-red-data
docker run --privileged=true  -d -p 1880:1880 --name my-nodered-script -v /etc/hosts:/etc/hosts:ro -v /nas/sobeyhive/data/node-red-data:/data docker.io/nodered/node-red:latest
