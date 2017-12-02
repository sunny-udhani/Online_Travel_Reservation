let connection =  new require('./kafka/Connection');
let req_topics =  require('./config/topic_enum').req_topic_names;

require('./config/mongooseConfig');

let producer = connection.getProducer();
let login = require('./services/login');
let signup = require('./services/signup');
let hotel_listing = require('./services/listing/hotelListing');
let flight_listing = require('./services/listing/flightListing');

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
let addHost = require('./services/admin/addHost');
let fetchHosts = require('./services/admin/fetchHosts');
let modifyHost = require('./services/admin/modifyHost');
let fetchUsers = require('./services/admin/user/fetchUsers');
let modifyUser = require('./services/admin/user/modifyUser');
let getFlightDetails = require('./services/getFlightDetails');
let getUserDetails = require('./services/getUserDetails');

//Pritam's services
let getUserBooking_Info=require('./services/getUserBooking_Info');
let addUserCard=require('./services/addUserCard');
let getUserBooking_Flights=require('./services/getUserBooking_Flights');
let getUserBooking_Cars=require('./services/getUserBooking_Cars');
let getHotelRooms=require('./services/getHotelRooms.js');


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
let addHostConsumer = connection.getConsumerObj(req_topics.ADD_HOST);
let fetchHostConsumer = connection.getConsumerObj(req_topics.FETCH_HOSTS);
let modifyHostConsumer = connection.getConsumerObj(req_topics.MODIFY_HOST);
let fetchUsersConsumer = connection.getConsumerObj(req_topics.FETCH_USERS);
let modifyUsersConsumer = connection.getConsumerObj(req_topics.MODIFY_USERS);
let fetchCarsConsumer = connection.getConsumerObj(req_topics.FETCH_CARS);
let modifyCarConsumer = connection.getConsumerObj(req_topics.MODIFY_CAR);

let getFlightDetails_Consumer = connection.getConsumerObj(req_topics.FLIGHT_DETAILS);
let getUserDetails_Consumer = connection.getConsumerObj(req_topics.USER_DETAILS);

let flightListing_Consumer = connection.getConsumerObj(req_topics.FLIGHT_LISTING);

//pritam's consumers
let getHotelRoomsConsumer=connection.getConsumerObj("fetchhotels_topic");
let addUserCardConsumer=connection.getConsumerObj("addusercard_topic");
let getUserBooking_InfoConsumer=connection.getConsumerObj("getbookinguser_topic");


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

    flightListing_Consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        flight_listing.listFlights(data.data, function (err, res) {
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

    addHostConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        addHost.handle_request(data.data, function (err, res) {
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

    fetchHostConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        fetchHosts.handle_request(data.data, function (err, res) {
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

    modifyHostConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        modifyHost.handle_request(data.data, function (err, res) {
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

    fetchUsersConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        fetchUsers.handle_request(data.data, function (err, res) {
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

    modifyUsersConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        modifyUser.handle_request(data.data, function (err, res) {
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

    //Pritam's consumer listeners
    getHotelRoomsConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));

        var data = JSON.parse(message.value);

        console.log(data.replyTo);

        getHotelRooms.handle_request(data.data, function (err, res) {
            console.log('after handle' + res);
            var payloads = [
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
                console.log(data);
                console.log(payloads);
            });
            // return;
        });
    });

    addUserCardConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));

        var data = JSON.parse(message.value);

        console.log(data.replyTo);

        addUserCard.handle_request(data.data, function (err, res) {
            console.log('after handle' + res);
            var payloads = [
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
                console.log(data);
                console.log(payloads);
            });
            // return;
        });
    });

    getUserBooking_InfoConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));

        var data = JSON.parse(message.value);

        console.log(data.replyTo);

        getUserBooking_Info.handle_request(data.data, function (err, res) {
           let resusertrip={};
           let result =[];
          //  console.log('after handle' + res);
            if(err){
                console.log("no entries");
            }
            else {
                result.push(res);
                getUserBooking_Flights.handle_request(data.data, function (err, resu) {
                    if(err){
                        console.log(err);
                    }
                    else{
                        result.push(resu);
                    getUserBooking_Cars.handle_request(data.data, function (err, resul) {
                        if(err){
                            console.log(err);
                        }

                        result.push(resul);
                        resusertrip.code=200;
                        resusertrip.value="Successful booking history ";
                        resusertrip.data=JSON.parse(result);

                        console.log("here is the final data ");
                        console.log(result);

                        var payloads = [
                            {
                                topic: data.replyTo,
                                messages: JSON.stringify({
                                    correlationId: data.correlationId,
                                    data: resusertrip
                                }),
                                partition: 0
                            }
                        ];
                        producer.send(payloads, function (err, data) {
                            console.log(data);
                            console.log(payloads);
                        });




            });
            }         // return;
        });
        }
    });
});












}
catch (e){
    console.log(e)
}

