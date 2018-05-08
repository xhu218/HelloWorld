#https://github.com/s7anley/redis-sentinel-docker
docker run --name redis-sentinel_1 -d -e QUORUM=2 -e MASTER=172.16.134.31 -e SENTINEL_PORT=26379 -e SLAVES="172.16.148.88;172.16.134.8" -p 26379:26379 -e MASTER_NAME=mymastter 96e
docker run --name redis-sentinel_1 -d -e QUORUM=2 -e MASTER=172.16.134.31 -e SENTINEL_PORT=26379 -e SLAVES="172.16.148.88;172.16.134.8" -p 26379:26379 -e MASTER_NAME=mymastter 96e
docker run --name redis-sentinel_1 -d -e QUORUM=2 -e MASTER=172.16.134.31 -e SENTINEL_PORT=26379 -e SLAVES="172.16.148.88;172.16.134.8" -p 26379:26379 -e MASTER_NAME=mymastter 96e
