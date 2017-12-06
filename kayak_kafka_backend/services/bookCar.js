let bcrypt = require('bcrypt');
let mysql = require('../mysql/mysql');

doCarBooking = ((data, callback) => {
    let response = {
        status: 400
    };
    try {

        console.log("In bookCar.js");
        console.log("Car ID : " + data.carId);

        let insertCarBooking = "";

        let today_date = new Date();

        let month = today_date.getUTCMonth() + 1;
        let day = today_date.getUTCDate();
        let year = today_date.getUTCFullYear();

        insertCarBooking = "insert into carbooking (carId, noOfDays, fromDate, toDate, ticketPrice, totalAmount, username, hostId, bill_day, bill_month, bill_year) " +
            "values ('" + data.carId + "','" + data.noOfDays + "', '" + data.fromDate + "', '" + data.toDate + "', '" + data.ticketPrice + "', '" + data.totalAmount + "', '" + data.username + "', '" + data.hostId + "', '" + day + "', '" + month + "', '" + year + "');";

        console.log("bookCar - SQL Query " + insertCarBooking);

        mysql.insertData(function (err, result) {
            if (err) {
                console.log(err);
                callback(err, null);
            }
            else {
                console.log(result);
                if (result.affectedRows === 1) {

                    response.status = 200;
                    response.message = "Car booked successfully";
                    callback(null, response);
                }
                else {
                    response.status = 400;
                    response.message = "Car booking failed";
                    callback(null, response);
                }
            }
        }, insertCarBooking);

    }
    catch
        (e) {
        console.log(e);
        err = e;
        response.status = 401;
        response.message = "Car booking Failed";
        callback(err, response);
    }
})
;

exports.doCarBooking = doCarBooking;
