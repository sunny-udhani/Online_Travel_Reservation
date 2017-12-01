let bcrypt = require('bcrypt');
let mysql = require('../mysql/mysql');

doFlightBooking = ((data, callback) => {
    let response = {
        status: 400
    };
    try {

        console.log("In bookFlight.js");
        console.log("Flight ID : " + data.flightId);

        let insertFlightBooking = "insert into flightbooking (flightId, noOfPassengers, flightClass, tripType, fromDate, toDate, ticketPrice, totalAmount, username) " +
            "values ('" + data.flightId + "','" + data.noOfPassengers + "', '" + data.flightClass + "', '" + data.tripType + "', '" + data.fromDate + "', '" + data.toDate + "', '" + data.ticketPrice + "', '" + data.totalAmount + "', '" + data.username + "');";

        console.log("signup - SQL Query " + insertFlightBooking);

        mysql.insertData(function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(result);
                if (result.affectedRows === 1) {

                    response.status = 200;
                    response.message = "Flight booked successfully";
                    callback(null, response);
                }
                else {
                    response.status = 400;
                    response.message = "Flight booking failed";
                    callback(null, response);
                }
            }
        }, insertFlightBooking);

    }
    catch
        (e) {
        console.log(e);
        err = e;
        response.status = 401;
        response.message = "Signup Failed";
        callback(err, response);
    }
})
;

exports.doFlightBooking = doFlightBooking;
