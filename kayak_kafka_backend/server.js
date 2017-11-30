let connection =  new require('./kafka/Connection');
let req_topics =  require('./config/topic_enum').req_topic_names;

require('./config/mongooseConfig');

let producer = connection.getProducer();
let login = require('./services/login');
let signup = require('./services/signup');
let hotel_listing = require('./services/listing/hotelListing');
let addflight = require('./services/admin/addFlight');
let addhotel = require('./services/admin/addHotel');
let fetchhotels = require('./services/admin/fetchHotels');
let addRooms = require('./services/admin/addRooms');

let loginConsumer = connection.getConsumerObj("login_topic");
let signupConsumer = connection.getConsumerObj("signup_topic");

let addFlightConsumer = connection.getConsumerObj("addflight_topic");
let addHotelConsumer = connection.getConsumerObj("addhotel_topic");
let fetchHotelsConsumer = connection.getConsumerObj("fetchhotels_topic");
let addroomsConsumer = connection.getConsumerObj("addrooms_topic");

let hotelListing_Consumer = connection.getConsumerObj(req_topics.HOTEL_LISTING);

try {
    loginConsumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        login.handle_request(data.data, function (err, res) {
            console.log('after handle' + res);
            let payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                // console.log(data);
                console.log(payloads);
            });
            // return;
        });
    });

    signupConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        signup.handle_request(data.data, function (err, res) {
            console.log('after handle' + res);
            let payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                // console.log(data);
                console.log(payloads);
            });
            // return;
        });
    });

    addFlightConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        addflight.handle_request(data.data, function (err, res) {
            console.log('after handle' + res);
            let payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                // console.log(data);
                console.log("Payload : ");
                console.log(payloads);
            });
            // return;
        });
    });

    addHotelConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        addhotel.handle_request(data.data, function (err, res) {
            console.log('after handle' + res);
            let payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                // console.log(data);
                console.log("Payload : ");
                console.log(payloads);
            });
            // return;
        });
    });

    fetchHotelsConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        fetchhotels.handle_request(data.data, function (err, res) {
            console.log('after handle' + res);
            let payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                // console.log(data);
                console.log("Payload : ");
                console.log(payloads);
            });
            // return;
        });
    });

    addroomsConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        addRooms.handle_request(data.data, function (err, res) {
            console.log('after handle' + res);
            let payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                // console.log(data);
                console.log("Payload : ");
                console.log(payloads);
            });
            // return;
        });
    });

    hotelListing_Consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        hotel_listing.listHotels(data.data, function (err, res) {
            let response_message = {};

            if (err) {
                response_message.status = 400;
                response_message.err = err;
                response_message.data = null
            } else {
                response_message.status = 200;
                response_message.err = null;
                response_message.data = res
            }

            console.log('after handle :');
            console.log(response_message);

            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: response_message
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                // console.log(data);
                console.log(payloads);
            });
            // return;
        });
    });
}
catch (e){
    console.log(e)
}

