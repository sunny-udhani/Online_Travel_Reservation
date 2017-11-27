var kafka = require('kafka-node');

function ConnectionProvider(topic_name) {
    /*this.getConsumer = function() {
        if (!this.kafkaConsumerConnection) {

            this.client = new kafka.Client("localhost:2181");
            this.kafkaConsumerConnection = new kafka.Consumer(this.client,
                [ { topic: "login_topic", partition: 0 },
                    {topic: "upload_topic", partition: 0 },
                    {topic: "download_topic", partition: 0 },
                    {topic: "signup_topic", partition: 0 },
                    {topic: "createdirectory_topic", partition: 0 },
                    {topic: "retrievedirectory_topic", partition: 0 }

                ]);
            this.client.on('ready', function () { console.log('client ready!') })
        }
        return this.kafkaConsumerConnection;
    };*/

    this.getConsumerObj = function(topic_name) {
        // if (!this.kafkaConsumerConnection) {
        this.client = new kafka.Client("localhost:2181");
        this.kafkaConsumerConnection = new kafka.Consumer(this.client,
            [ { topic: topic_name, partition: 0 }]);
        this.client.on('ready', function () { console.log('client ready!') });
        // }
        return this.kafkaConsumerConnection;
    };

    //Code will be executed when we start Producer
    this.getProducer = function() {

        if (!this.kafkaProducerConnection) {
            this.client = new kafka.Client("localhost:2181");
            var HighLevelProducer = kafka.HighLevelProducer;
            this.kafkaProducerConnection = new HighLevelProducer(this.client);
            //this.kafkaConnection = new kafka.Producer(this.client);
            console.log('producer ready');
        }
        return this.kafkaProducerConnection;
    };
}
exports = module.exports = new ConnectionProvider;