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
let modifyRooms = require('./services/admin/modifyRooms');
let fetchflights = require('./services/admin/fetchFlights');
let modifyHotel = require('./services/admin/modifyHotel');
let modifyFlight = require('./services/admin/modifyFlight');
let modifyFlightClass = require('./services/admin/modifyFlightClass');
let addCar = require('./services/admin/addCar');
let fetchCars = require('./services/admin/fetchCars');
let modifyCar = require('./services/admin/modifyCar');

//Rutvik's services
let getFlightDetails = require('./services/getFlightDetails');
let getHotelDetails = require('./services/getHotelDetails');
let getCarDetails = require('./services/getCarDetails');
let getUserDetails = require('./services/getUserDetails');
let bookFlight = require('./services/bookFlight');
let bookHotel = require('./services/bookHotel');
let bookCar = require('./services/bookCar');
let insertTravelers = require('./services/insertTravelers');

let loginConsumer = connection.getConsumerObj("login_topic");
let signupConsumer = connection.getConsumerObj("signup_topic");
let addFlightConsumer = connection.getConsumerObj(req_topics.ADD_FLIGHT);
let addHotelConsumer = connection.getConsumerObj(req_topics.ADD_HOTEL);
let fetchHotelsConsumer = connection.getConsumerObj(req_topics.FETCH_HOTELS);
let modifyRoomsConsumer = connection.getConsumerObj(req_topics.CHANGE_ROOMS);
let fetchflightsConsumer = connection.getConsumerObj(req_topics.FETCH_FLIGHTS);
let modifyHotelConsumer = connection.getConsumerObj(req_topics.MODIFY_HOTEL);
let hotelListing_Consumer = connection.getConsumerObj(req_topics.HOTEL_LISTING);
let modifyFlightConsumer = connection.getConsumerObj(req_topics.MODIFY_FLIGHT);
let modifyFlightClassConsumer = connection.getConsumerObj(req_topics.MODIFY_FLIGHTCLASS);
let addCarConsumer = connection.getConsumerObj(req_topics.ADD_CAR);
let fetchCarsConsumer = connection.getConsumerObj(req_topics.FETCH_CARS);
let modifyCarConsumer = connection.getConsumerObj(req_topics.MODIFY_CAR);

//Rutvik's consumers
let getFlightDetails_Consumer = connection.getConsumerObj(req_topics.FLIGHT_DETAILS);
let getHotelDetails_Consumer = connection.getConsumerObj(req_topics.HOTEL_DETAILS);
let getCarDetails_Consumer = connection.getConsumerObj(req_topics.CAR_DETAILS);
let getUserDetails_Consumer = connection.getConsumerObj(req_topics.USER_DETAILS);
let bookFlight_Consumer = connection.getConsumerObj(req_topics.BOOK_FLIGHT);
let bookHotel_Consumer = connection.getConsumerObj(req_topics.BOOK_HOTEL);
let bookCar_Consumer = connection.getConsumerObj(req_topics.BOOK_CAR);
let insertTravelers_Consumer = connection.getConsumerObj(req_topics.INSERT_TRAVELERS);

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

            if (err) {
                res.error = err;
            }

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
            if (err) {
                res.error = err;
            }
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
            if (err) {
                res.error = err;
            }
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

    modifyRoomsConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        modifyRooms.handle_request(data.data, function (err, res) {
            if (err) {
                res.error = err;
            }
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

    fetchflightsConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        fetchflights.handle_request(data.data, function (err, res) {
            if (err) {
                res.error = err;
            }
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
        });
    });

    modifyHotelConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        modifyHotel.handle_request(data.data, function (err, res) {
            if (err) {
                res.error = err;
            }
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
        });
    });

    modifyFlightConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        modifyFlight.handle_request(data.data, function (err, res) {
            if (err) {
                res.error = err;
            }
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
        });
    });

    modifyFlightClassConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        modifyFlightClass.handle_request(data.data, function (err, res) {
            if (err) {
                res.error = err;
            }
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
        });
    });

    fetchCarsConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        fetchCars.handle_request(data.data, function (err, res) {
            if (err) {
                res.error = err;
            }
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
        });
    });

    addCarConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        addCar.handle_request(data.data, function (err, res) {
            if (err) {
                res.error = err;
            }
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
        });
    });

    modifyCarConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        modifyCar.handle_request(data.data, function (err, res) {
            if (err) {
                res.error = err;
            }
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
        });
    });

    getUserDetails_Consumer.on('message', function (message) {
        console.log("14");
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        getUserDetails.getDetails(data.data, function (err, res) {
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
                console.log("16");
                console.log(payloads);
            });
            // return;
        });
    });

    getFlightDetails_Consumer.on('message', function (message) {
        console.log("4");
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        getFlightDetails.getDetails(data.data, function (err, res) {

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
                console.log("6");
                console.log(payloads);
            });
            // return;
        });
    });

    getHotelDetails_Consumer.on('message', function (message) {
        console.log("4");
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        getHotelDetails.getDetails(data.data, function (err, res) {

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
                console.log("6");
                console.log(payloads);
            });
            // return;
        });
    });

    getCarDetails_Consumer.on('message', function (message) {
        console.log("4");
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        getCarDetails.getDetails(data.data, function (err, res) {

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
                console.log("6");
                console.log(payloads);
            });
            // return;
        });
    });

    bookFlight_Consumer.on('message', function(message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        bookFlight.doFlightBooking(data.data, function (err, res) {
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

    bookHotel_Consumer.on('message', function(message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        bookHotel.doHotelBooking(data.data, function (err, res) {
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

    bookCar_Consumer.on('message', function(message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        bookCar.doCarBooking(data.data, function (err, res) {
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

    insertTravelers_Consumer.on('message', function(message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        insertTravelers.insertAllTravelers(data.data, function (err, res) {
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
}
catch (e){
    console.log(e)
}

