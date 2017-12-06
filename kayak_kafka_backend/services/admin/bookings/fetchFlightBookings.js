let mysql = require('../../../mysql/mysql');
let Flight = require('../../../Models/Flight');
let ObjectId = require('mongodb').ObjectID;

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };

    try {
        console.log("Flight Booking Fetch");
        console.log(data);

        let fetchQuery = "select fb.hostId, h.hostName, fb.bookingId, fb.flightId, fb.noOfPassengers, " +
            "fb.flightClass, fb.fromDate ,fb.toDate, fb.ticketPrice, fb.totalAmount, fb.bill_day, fb.bill_month, fb.bill_year, " +
            "fb.username " +
            "from flightbooking as fb, host as h " +
            "where fb.hostId = h.hostId and " +
            "h.serviceType='flight';";
        console.log(data.hasOwnProperty("bookingId"));
        if(data.hasOwnProperty("bookingId")){
            fetchQuery = "select fb.hostId, h.hostName, fb.bookingId, fb.flightId, fb.noOfPassengers, " +
                "fb.flightClass, fb.fromDate ,fb.toDate, fb.ticketPrice, fb.totalAmount, fb.bill_day, " +
                "fb.bill_month, fb.bill_year, fb.username " +
                "from flightbooking as fb " +
                "join host as h " +
                "on fb.hostId = h.hostId where " +
                "h.serviceType='flight' and " +
                "fb.bookingId = "+ data.bookingId + ";";
        }
        else if(data.hasOwnProperty("searchbyusername")){
            console.log(data.searchbyusername);
            fetchQuery = "select fb.hostId, h.hostName, fb.bookingId, fb.flightId, fb.noOfPassengers, " +
                "fb.flightClass, fb.fromDate ,fb.toDate, fb.ticketPrice, fb.totalAmount, fb.bill_day, " +
                "fb.bill_month, fb.bill_year, fb.username " +
                "from flightbooking as fb " +
                "join host as h " +
                "on fb.hostId = h.hostId where " +
                "h.serviceType='flight' and " +
                "fb.username = '"+ data.searchbyusername + "';";
        }

        /*console.log(data.hasOwnProperty("hostName"));
        console.log(data.hasOwnProperty("serviceType"));
        console.log(data.hasOwnProperty("hostId"));

        if(data.hasOwnProperty("hostName")){
            fetchQuery = "select * from host where hostName = '"+ data.hostName +"';";
        }
        else if(data.hasOwnProperty("serviceType")){
            fetchQuery = "select * from host where serviceType = '"+ data.serviceType +"';";
        }
        else if(data.hasOwnProperty("hostId")){
            fetchQuery = "select * from host where hostId = '"+ data.hostId +"';";
        }*/
        console.log(fetchQuery);

        mysql.fetchData(function (err, results) {
            let jsonObj = {};
            if(err){
                console.log(err);
                callback(err, response);
            }
            else {
                console.log("result");
                console.log(results.length);
                console.log(results);

                if(results.length>0){
                    if(data.hasOwnProperty("fetchFullData")) {
                        if(results.length===1){
                            jsonObj.flightInfo = results[0];
                            Flight.find({_id: ObjectId(results[0].flightId)}, function (err, results1) {
                                if (err) {
                                    console.log(err);
                                    callback(err, response);
                                }
                                else {
                                    console.log(results1);
                                    if (results1.length === 1) {
                                        jsonObj.flightInfo.flightNo = results1[0].flightNo;
                                        jsonObj.flightInfo.departureDate = results1[0].departureDate;
                                        jsonObj.flightInfo.departureTime = results1[0].departureTime;
                                        jsonObj.flightInfo.arrivalDate = results1[0].arrivalDate;
                                        jsonObj.flightInfo.arrivalTime = results1[0].arrivalTime;
                                        jsonObj.flightInfo.origin = results1[0].origin;
                                        jsonObj.flightInfo.destination = results1[0].destination;
                                        console.log(jsonObj);
                                        console.log(data.hasOwnProperty("bookingId"));
                                        if(data.hasOwnProperty("bookingId")) {
                                            fetchQuery = "select t.firstname, t.lastname, t.email, t.phonenumber, t.travelerId " +
                                                "from travelerdetails as t join flightbooking as fb " +
                                                "on t.bookingId = fb.bookingId " +
                                                "where t.bookingId = " + data.bookingId + " and " +
                                                "t.bookingtype = 'flight';";

                                            mysql.fetchData(function (err, results2) {
                                                if (err) {
                                                    console.log(err);
                                                    callback(err, null);
                                                }
                                                else {
                                                    console.log(results2);
                                                    if (results2.length > 0) {
                                                        jsonObj.passengerInfo = results2;
                                                        response.status = 200;
                                                        console.log("xyz final");
                                                        console.log(jsonObj);
                                                        response.data = jsonObj;
                                                        console.log(response);
                                                        callback(null, response);
                                                    }
                                                    else {
                                                        console.log("Traveler details not found. Internal Error");
                                                        callback(null, response);
                                                    }

                                                }
                                            }, fetchQuery);
                                        }
                                        else {
                                            response.status = 200;
                                            response.data = jsonObj;
                                            console.log("final");
                                            console.log(jsonObj);
                                            callback(null, response);
                                        }
                                    }
                                    else {
                                        console.log("Received More than one data. Internal Error");
                                        callback(null, response);
                                    }
                                }
                            });
                        }
                        else {
                            console.log("Received More than one data. Internal Error");
                            callback(null, response);
                        }
                    }
                    else {
                        response.status = 200;
                        response.data = results;
                        callback(null, response);
                    }
                }
                else if(results.length===0){
                    response.status=204;
                    callback(null, response);
                }
                else {
                    callback(null, response);
                }
            }
        }, fetchQuery);
    }
    catch (e) {
        console.log(e);
        callback(e, response);
    }
});

exports.handle_request = handle_request;


