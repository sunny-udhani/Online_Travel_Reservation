let bcrypt = require('bcrypt');
let mysql = require('../mysql/mysql');

insertAllTravelers = ((data, callback) => {
    let response = {
        status: 400
    };
    try {

        console.log("In insertTravelers.js");
        console.log(data.bookingType);
        console.log(data.userdata);
        console.log(data.traveler_details);
        console.log(data.billing_address);
        console.log(data.payment_details);


        let selectquery = "";

        let insertTravelerDetails = "";
        let insertBillingAddress = "";
        let insertPaymentDetails = "";

        if(data.bookingType === "flight") {

            console.log("1");
            let bookingId = "";
            let insertTraveler = [];
            selectquery = "select bookingId from flightbooking where flightId = '" + data.userdata.flightId + "' and noOfPassengers = '" + data.userdata.noOfPassengers + "' and fromDate = '" + data.userdata.fromDate + "' and ticketPrice = " + data.userdata.ticketPrice + " and username = '" + data.userdata.username + "'";

            console.log("Select Query is : " + selectquery);

            mysql.fetchData(function (err, result) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                }
                else {
                    if (result.length >= 1) {
                        console.log("2: " + result);
                        console.log("3: " + result[0].bookingId);
                        bookingId = result[0].bookingId;

                        let insertBillingAddress = "insert into billingaddress (username, street1, street2, postalcode, city, state, country) values ('" + data.userdata.username + "', '" + data.billing_address.street1 + "', '" + data.billing_address.street2 + "', '" + data.billing_address.postalcode + "', '" + data.billing_address.city + "', '" + data.billing_address.state + "', '" + data.billing_address.country + "')";

                        console.log("insertBilling : " + insertBillingAddress);

                        mysql.insertData(function (err, result) {
                            if (err) {
                                console.log(err);
                                callback(err, null);
                            }
                            else {
                                console.log(result);
                                if (result.affectedRows === 1) {

                                    let insertPaymentDetails = "insert into paymentdetails (username, nameoncard, creditCardNumber, validThrough, cvv) values ('" + data.userdata.username + "', '" + data.payment_details.nameoncard + "', '" + data.payment_details.creditCardnumber + "', '" + data.payment_details.validThrough + "', '" + data.payment_details.cvv + "')";

                                    console.log("insertPayment : " + insertPaymentDetails);
                                    mysql.insertData(function (err, result) {
                                        if (err) {
                                            console.log(err);
                                            callback(err, null);
                                        }
                                        else {
                                            console.log(result);
                                            if (result.affectedRows === 1) {

                                                console.log("no of passengers : " + data.userdata.noOfPassengers);

                                                for (let i = 0 ; i < data.userdata.noOfPassengers ; i++) {
                                                    insertTraveler[i] = "insert into travelerdetails (bookingtype, bookingId, firstname, lastname, email, phonenumber) values" +
                                                        "('flight', '" + bookingId + "', '" + data.traveler_details[i].first_name + "', '" + data.traveler_details[i].last_name +
                                                        "', '" + data.traveler_details[i].email + "', '" + data.traveler_details[i].phonenumber + "')";
                                                }

                                                for (let i = 0 ; i < data.userdata.noOfPassengers ; i++) {

                                                    mysql.insertData(function (err, result) {
                                                        if (err) {
                                                            console.log(err);
                                                            callback(err, null);
                                                        }
                                                        else {
                                                            console.log(result);
                                                            if (result.affectedRows === 1) {
                                                                response.status = 200;
                                                                response.message = "Traveller details added successfully";
                                                                callback(null, response);
                                                            }
                                                            else {
                                                                response.status = 400;
                                                                response.message = "Problem with inserting multiple travelers";
                                                                callback(null, response);
                                                            }
                                                        }
                                                    }, insertTraveler[i]);
                                                }
                                            }
                                            else {
                                                response.status = 400;
                                                response.message = "Problem with inserting payment details";
                                                callback(null, response);
                                            }
                                        }
                                    }, insertPaymentDetails);


                                }
                                else {
                                    response.status = 400;
                                    response.message = "Problem with inserting billing address";
                                    callback(null, response);
                                }
                            }
                        }, insertBillingAddress);


                    }
                    else {
                        response.status = 400;
                        response.message = "Problem with select query";
                        callback(null, response);
                    }
                }
            }, selectquery);
        }

        else if(data.bookingType === "hotel") {

            console.log("1");
            let bookingId = "";
            // let insertTraveler = [];
            selectquery = "select bookingId from hotelbooking where hotelId = '" + data.userdata.hotelId + "' and noOfPeople = '" + data.userdata.noOfPeople + "' and fromDate = '" + data.userdata.fromDate + "' and toDate = '" + data.userdata.toDate + "' and ticketPrice = " + data.userdata.ticketPrice + " and username = '" + data.userdata.username + "'";

            console.log("Select Query is : " + selectquery);

            mysql.fetchData(function (err, result) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                }
                else {
                    if (result.length >= 1) {
                        console.log("2: " + result);
                        console.log("3: " + result[0].bookingId);
                        bookingId = result[0].bookingId;

                        let insertBillingAddress = "insert into billingaddress (username, street1, street2, postalcode, city, state, country) values ('" + data.userdata.username + "', '" + data.billing_address.street1 + "', '" + data.billing_address.street2 + "', '" + data.billing_address.postalcode + "', '" + data.billing_address.city + "', '" + data.billing_address.state + "', '" + data.billing_address.country + "')";

                        console.log("insertBilling : " + insertBillingAddress);

                        mysql.insertData(function (err, result) {
                            if (err) {
                                console.log(err);
                                callback(err, null);
                            }
                            else {
                                console.log(result);
                                if (result.affectedRows === 1) {

                                    let insertPaymentDetails = "insert into paymentdetails (username, nameoncard, creditCardNumber, validThrough, cvv) values ('" + data.userdata.username + "', '" + data.payment_details.nameoncard + "', '" + data.payment_details.creditCardnumber + "', '" + data.payment_details.validThrough + "', '" + data.payment_details.cvv + "')";

                                    console.log("insertPayment : " + insertPaymentDetails);
                                    mysql.insertData(function (err, result) {
                                        if (err) {
                                            console.log(err);
                                            callback(err, null);
                                        }
                                        else {
                                            console.log(result);
                                            if (result.affectedRows === 1) {


                                                insertTraveler = "insert into travelerdetails (bookingtype, bookingId, firstname, lastname, email, phonenumber) values" +
                                                    "('hotel', '" + bookingId + "', '" + data.traveler_details.first_name + "', '" + data.traveler_details.last_name +
                                                    "', '" + data.traveler_details.email + "', '" + data.traveler_details.phonenumber + "')";


                                                mysql.insertData(function (err, result) {
                                                    if (err) {
                                                        console.log(err);
                                                        callback(err, null);
                                                    }
                                                    else {
                                                        console.log(result);
                                                        if (result.affectedRows === 1) {
                                                            console.log("Finally done");
                                                            response.status = 200;
                                                            response.message = "Traveller details added successfully";
                                                            callback(null, response);
                                                        }
                                                        else {
                                                            response.status = 400;
                                                            response.message = "Problem with inserting travelers";
                                                            callback(null, response);
                                                        }
                                                    }
                                                }, insertTraveler);
                                            }
                                            else {
                                                response.status = 400;
                                                response.message = "Problem with inserting payment details";
                                                callback(null, response);
                                            }
                                        }
                                    }, insertPaymentDetails);


                                }
                                else {
                                    response.status = 400;
                                    response.message = "Problem with inserting billing address";
                                    callback(null, response);
                                }
                            }
                        }, insertBillingAddress);


                    }
                    else {
                        response.status = 400;
                        response.message = "Problem with select query";
                        callback(null, response);
                    }
                }
            }, selectquery);
        }

        else if(data.bookingType === "car") {

            console.log("1");
            let bookingId = "";
            // let insertTraveler = [];
            selectquery = "select bookingId from carbooking where carId = '" + data.userdata.carId + "' and noOfDays = '" + data.userdata.noOfDays + "' and fromDate = '" + data.userdata.fromDate + "' and toDate = '" + data.userdata.toDate + "' and ticketPrice = " + data.userdata.ticketPrice + " and username = '" + data.userdata.username + "'";

            console.log("Select Query is : " + selectquery);

            mysql.fetchData(function (err, result) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                }
                else {
                    if (result.length >= 1) {
                        console.log("2: " + result);
                        console.log("3: " + result[0].bookingId);
                        bookingId = result[0].bookingId;

                        let insertBillingAddress = "insert into billingaddress (username, street1, street2, postalcode, city, state, country) values ('" + data.userdata.username + "', '" + data.billing_address.street1 + "', '" + data.billing_address.street2 + "', '" + data.billing_address.postalcode + "', '" + data.billing_address.city + "', '" + data.billing_address.state + "', '" + data.billing_address.country + "')";

                        console.log("insertBilling : " + insertBillingAddress);

                        mysql.insertData(function (err, result) {
                            if (err) {
                                console.log(err);
                                callback(err, null);
                            }
                            else {
                                console.log(result);
                                if (result.affectedRows === 1) {

                                    let insertPaymentDetails = "insert into paymentdetails (username, nameoncard, creditCardNumber, validThrough, cvv) values ('" + data.userdata.username + "', '" + data.payment_details.nameoncard + "', '" + data.payment_details.creditCardnumber + "', '" + data.payment_details.validThrough + "', '" + data.payment_details.cvv + "')";

                                    console.log("insertPayment : " + insertPaymentDetails);
                                    mysql.insertData(function (err, result) {
                                        if (err) {
                                            console.log(err);
                                            callback(err, null);
                                        }
                                        else {
                                            console.log(result);
                                            if (result.affectedRows === 1) {

                                                insertTraveler = "insert into travelerdetails (bookingtype, bookingId, firstname, lastname, email, phonenumber) values" +
                                                        "('car', '" + bookingId + "', '" + data.traveler_details.first_name + "', '" + data.traveler_details.last_name +
                                                        "', '" + data.traveler_details.email + "', '" + data.traveler_details.phonenumber + "')";


                                                    mysql.insertData(function (err, result) {
                                                        if (err) {
                                                            console.log(err);
                                                            callback(err, null);
                                                        }
                                                        else {
                                                            console.log(result);
                                                            if (result.affectedRows === 1) {
                                                                console.log("Hurray once again");
                                                                response.status = 200;
                                                                response.message = "Traveller details added successfully";
                                                                callback(null, response);
                                                            }
                                                            else {
                                                                response.status = 400;
                                                                response.message = "Problem with inserting travelers";
                                                                callback(null, response);
                                                            }
                                                        }
                                                    }, insertTraveler);
                                            }
                                            else {
                                                response.status = 400;
                                                response.message = "Problem with inserting payment details";
                                                callback(null, response);
                                            }
                                        }
                                    }, insertPaymentDetails);


                                }
                                else {
                                    response.status = 400;
                                    response.message = "Problem with inserting billing address";
                                    callback(null, response);
                                }
                            }
                        }, insertBillingAddress);


                    }
                    else {
                        response.status = 400;
                        response.message = "Problem with select query";
                        callback(null, response);
                    }
                }
            }, selectquery);
        }

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

exports.insertAllTravelers = insertAllTravelers;
