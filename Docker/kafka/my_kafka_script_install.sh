docker run --name my-kafka-script -d -e HOST_IP=centos -e KAFKA_ADVERTISED_PORT=9092 -e KAFKA_BROKER_ID=1 -e ZK=zk -p 9092:9092  --link my-zookeeper-script:zk -t wurstmeister/kafka

