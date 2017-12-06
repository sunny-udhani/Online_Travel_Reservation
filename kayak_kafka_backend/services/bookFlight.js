let bcrypt = require('bcrypt');
let mysql = require('../mysql/mysql');

doFlightBooking = ((data, callback) => {
    let response = {
        status: 400
    };
    try {

        console.log("In bookFlight.js");
        console.log("The payload is : ");
        console.log(data);

        let insertFlightBooking = "";

        console.log("To date : " + data.tripType);

        let today_date = new Date();

        let month = today_date.getUTCMonth() + 1;
        let day = today_date.getUTCDate();
        let year = today_date.getUTCFullYear();

        console.log(today_date);
        console.log(month);
        console.log(day);
        console.log(year);


        if (data.tripType === 'one-way') {
            insertFlightBooking = "insert into flightbooking (flightId, noOfPassengers, flightClass, tripType, fromDate, ticketPrice, totalAmount, username, hostId, bill_day, bill_month, bill_year) " +
                "values ('" + data.flightId + "','" + data.noOfPassengers + "', '" + data.flightClass + "', '" + data.tripType + "', '" + data.fromDate + "', '" + data.ticketPrice + "', '" + data.totalAmount + "', '" + data.username + "', '" + data.hostId + "', '" + day + "', '" + month + "', '" + year + "');";

            }
        else {
            insertFlightBooking = "insert into flightbooking (flightId, noOfPassengers, flightClass, tripType, fromDate, toDate, ticketPrice, totalAmount, username, hostId, bill_day, bill_month, bill_year) " +
                "values ('" + data.flightId + "','" + data.noOfPassengers + "', '" + data.flightClass + "', '" + data.tripType + "', '" + data.fromDate + "', '" + data.toDate + "', '" + data.ticketPrice + "', '" + data.totalAmount + "', '" + data.username + "', '" + data.hostId + "', '" + day + "', '" + month + "', '" + year + "');";

        }

        console.log("bookFlight - SQL Query " + insertFlightBooking);

        mysql.insertData(function (err, result) {
            if (err) {
                console.log(err);
                callback(err, null);
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
        response.message = "Flight booking Failed";
        callback(err, response);
    }
})
;

exports.doFlightBooking = doFlightBooking;
