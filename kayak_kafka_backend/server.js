let connection =  new require('./kafka/Connection');
let producer = connection.getProducer();
let login = require('./services/login');
let signup = require('./services/signup');
let addflight = require('./services/admin/addFlight');
let addhotel = require('./services/admin/addHotel');
let fetchhotels = require('./services/admin/fetchHotels');
let addRooms = require('./services/admin/addRooms');

let addFlightConsumer = connection.getConsumerObj("addflight_topic");
let loginConsumer = connection.getConsumerObj("login_topic");
let signupConsumer = connection.getConsumerObj("signup_topic");
let addHotelConsumer = connection.getConsumerObj("addhotel_topic");
let fetchHotelsConsumer = connection.getConsumerObj("fetchhotels_topic");
let addroomsConsumer = connection.getConsumerObj("addrooms_topic");

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

}
catch (e){
    console.log(e)
}

