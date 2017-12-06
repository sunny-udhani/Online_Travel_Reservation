let bcrypt = require('bcrypt');
let mysql = require('../mysql/mysql');

doHotelBooking = ((data, callback) => {
    let response = {
        status: 400
    };
    try {

        console.log("In bookHotel.js");
        console.log("Hotel ID : " + data.hotelId);

        let insertHotelBooking = "";

        let today_date = new Date();

        let month = today_date.getUTCMonth() + 1;
        let day = today_date.getUTCDate();
        let year = today_date.getUTCFullYear();

        insertHotelBooking = "insert into hotelbooking (hotelId, noOfPeople, roomType, fromDate, toDate, ticketPrice, totalAmount, username, hostId, bill_day, bill_month, bill_year) " +
            "values ('" + data.hotelId + "','" + data.noOfPeople + "', '" + data.roomType + "', '" + data.fromDate + "', '" + data.toDate + "', '" + data.ticketPrice + "', '" + data.totalAmount + "', '" + data.username + "', '" + data.hostId + "', '" + day + "', '" + month + "', '" + year + "');";

        console.log("bookHotel - SQL Query " + insertHotelBooking);

        mysql.insertData(function (err, result) {
            if (err) {
                console.log(err);
                callback(err, null);
            }
            else {
                console.log(result);
                if (result.affectedRows === 1) {

                    response.status = 200;
                    response.message = "Hotel booked successfully";
                    callback(null, response);
                }
                else {
                    response.status = 400;
                    response.message = "Hotel booking failed";
                    callback(null, response);
                }
            }
        }, insertHotelBooking);

    }
    catch
        (e) {
        console.log(e);
        err = e;
        response.status = 401;
        response.message = "Hotel booking Failed";
        callback(err, response);
    }
})
;

exports.doHotelBooking = doHotelBooking;
