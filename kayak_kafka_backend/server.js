let connection =  new require('./kafka/Connection');
let req_topics =  require('./config/topic_enum').req_topic_names;

require('./config/mongooseConfig');

let producer = connection.getProducer();
let login = require('./services/login');
let signup = require('./services/signup');
let hotel_listing = require('./services/listing/hotelListing');
let flight_listing = require('./services/listing/flightListing');
let car_listing = require('./services/listing/carListing');

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
let fetchHotelBookings = require('./services/admin/bookings/fetchHotelBookings');
let fetchCarBookings = require('./services/admin/bookings/fetchCarBookings');
let fetchFlightBookings = require('./services/admin/bookings/fetchFlightBookings');

//Rutvik's services
let getFlightDetails = require('./services/getFlightDetails');
let getHotelDetails = require('./services/getHotelDetails');
let getCarDetails = require('./services/getCarDetails');
let getUserDetails = require('./services/getUserDetails');
let bookFlight = require('./services/bookFlight');
let bookHotel = require('./services/bookHotel');
let bookCar = require('./services/bookCar');
let insertTravelers = require('./services/insertTravelers');

//Pritam's services
let addUserCard=require('./services/addUserCard');
let getUserBooking_Hotels=require('./services/getUserBooking_Hotels');
let getUserBooking_Flights=require('./services/getUserBooking_Flights');
let getUserBooking_Cars=require('./services/getUserBooking_Cars');
let getHotelRooms=require('./services/getHotelRooms.js');
let fetchUserProfile = require('./services/fetchUserProfile');
let editUserProfile = require('./services/editUserProfile');
let getUserProfile = require('./services/getUserProfile');
let getCreditCardDetails=require('./services/getCreditCardDetails');

let logAnalytics = require('./services/admin/logAnalytics');
let top10Properties = require('./services/admin/top10Properties');
let top10Hosts = require('./services/admin/top10Hosts');
let cityWiseRevenue = require('./services/admin/cityWiseRevenue');
let reviewsOnProperties = require('./services/admin/reviewsOnProperties');
let logUserTracingTree = require('./services/admin/logUserTracingTree');
let usertimeperpages = require('./services/admin/usertimeperpages');

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
let fetchUserProfileConsumer = connection.getConsumerObj(req_topics.FETCH_USERPROFILE);
let fetchHotelBookingsConsumer = connection.getConsumerObj(req_topics.FETCH_HOTELBOOKINGS);
let fetchCarBookingsConsumer = connection.getConsumerObj(req_topics.FETCH_CARBOOKINGS);
let fetchFlightBookingsConsumer = connection.getConsumerObj(req_topics.FETCH_FLIGHTBOOKINGS);
let userTimePerPagesConsumer = connection.getConsumerObj(req_topics.FETCH_USERTIMEPERPAGE);
// let fetchUserBookingsConsumer = connection.getConsumerObj(req_topics.FETCH_USERBOOKINGS);

//Rutvik's consumers
let getFlightDetails_Consumer = connection.getConsumerObj(req_topics.FLIGHT_DETAILS);
let getHotelDetails_Consumer = connection.getConsumerObj(req_topics.HOTEL_DETAILS);
let getCarDetails_Consumer = connection.getConsumerObj(req_topics.CAR_DETAILS);
let getUserDetails_Consumer = connection.getConsumerObj(req_topics.USER_DETAILS);
let bookFlight_Consumer = connection.getConsumerObj(req_topics.BOOK_FLIGHT);
let bookHotel_Consumer = connection.getConsumerObj(req_topics.BOOK_HOTEL);
let bookCar_Consumer = connection.getConsumerObj(req_topics.BOOK_CAR);
let insertTravelers_Consumer = connection.getConsumerObj(req_topics.INSERT_TRAVELERS);

let flightListing_Consumer = connection.getConsumerObj(req_topics.FLIGHT_LISTING);
 let carListing_Consumer = connection.getConsumerObj(req_topics.CAR_LISTING);

//pritam's consumers
let getHotelRoomsConsumer = connection.getConsumerObj("fetchhotels_topic");
let addUserCardConsumer = connection.getConsumerObj("addusercard_topic");
let getUserBooking_InfoConsumer = connection.getConsumerObj("getbookinguser_topic");
let editUserProfileConsumer = connection.getConsumerObj("editprofileuser_topic");
let getUserProfileConsumer = connection.getConsumerObj("getuserprofileinfo_topic");
let getCreditCardDetailsConsumer=connection.getConsumerObj("getcreditcarddetails_topic");

let logAnalyticsConsumer = connection.getConsumerObj(req_topics.LOG_ANALYTICS_DATA);
let top10PropertiesConsumer = connection.getConsumerObj(req_topics.TOP_10_PROPERTIES);
let top10HostsConsumer = connection.getConsumerObj(req_topics.TOP_10_HOSTS);
let cityWiseRevenueConsumer = connection.getConsumerObj(req_topics.CITY_WISE_REVENUE);
let reviewsOnPropertiesConsumer = connection.getConsumerObj(req_topics.REVIEWS_ON_PROPERTIES);
let logUserTracingTreeConsumer = connection.getConsumerObj(req_topics.LOG_USER_TRACING_TREE);

try {

    logUserTracingTreeConsumer.on('message', function (message) {

        console.log('message received');

        console.log(JSON.stringify(message.value));

        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        logUserTracingTree.handle_request(data.data, function (err, res) {
            console.log('In after handle of logUserTracingTree' + res);
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

    logAnalyticsConsumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        logAnalytics.handle_request(data.data, function (err, res) {
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

    top10PropertiesConsumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        top10Properties.handle_request(data.data, function (err, res) {
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

    top10HostsConsumer.on('message', function (message) {
        console.log('message received for top10Hosts');
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        top10Hosts.handle_request(data.data, function (err, res) {
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

    cityWiseRevenueConsumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        cityWiseRevenue.handle_request(data.data, function (err, res) {
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

    reviewsOnPropertiesConsumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        reviewsOnProperties.handle_request(data.data, function (err, res) {
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
            console.log(res);
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


    getUserProfileConsumer.on('message', function (message) {
        console.log("17");
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        getUserProfile.handle_request(data.data, function (err, res) {
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
                console.log("18");
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
        console.log(data.data);

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
        let resusertrip = {};

        let carResult = [];
        let hotelResult = [];
        let flightResult = [];

        getUserBooking_Hotels.handle_request(data.data, function (err, res1) {

            if (err) {
                console.log(err);
            }
            else {
                hotelResult = res1;

                getUserBooking_Flights.handle_request(data.data, function (err, res2) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        flightResult =res2;

                        getUserBooking_Cars.handle_request(data.data, function (err, res3) {
                            if (err) {
                                console.log(err);
                            }

                            carResult = res3;

                            resusertrip.code = 200;
                            resusertrip.value = "Successful booking history ";
                            let resultJSON = {hotel : hotelResult, flight: flightResult, car: carResult};

                            resusertrip.data = resultJSON

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
                            });


                        });
                    }         // return;
                });
            }
        });
    });

    carListing_Consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        car_listing.listCars(data.data, function (err, res) {
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

    fetchUserProfileConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        fetchUserProfile.handle_request(data.data, function (err, res) {
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

    getCreditCardDetailsConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));

        var data = JSON.parse(message.value);
        console.log(data.data.details);
        console.log(data.replyTo);

        getCreditCardDetails.handle_request(data.data, function (err, res) {
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



    editUserProfileConsumer.on('message', function (message) {
        console.log("******************************");
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));

        var data = JSON.parse(message.value);
        console.log(data.data.details);
        console.log(data.replyTo);

        editUserProfile.handle_request(data.data, function (err, res) {
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


    fetchHotelBookingsConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        fetchHotelBookings.handle_request(data.data, function (err, res) {
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

    fetchCarBookingsConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        fetchCarBookings.handle_request(data.data, function (err, res) {
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

    fetchFlightBookingsConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        fetchFlightBookings.handle_request(data.data, function (err, res) {
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

    userTimePerPagesConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        usertimeperpages.handle_request(data.data, function (err, res) {
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
}
catch (e) {
    console.log(e)
}

