cd "/Users/varunshah/opt/zookeeper"
bin/zkServer.sh start
cd "/Users/varunshah/opt/kafka"
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic upload_topic
bin/kafka-topics.sh --list --zookeeper localhost:21
echo "Topics Created Successfully"
