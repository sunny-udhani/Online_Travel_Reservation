let mysql = require('../mysql/mysql');
let bcrypt = require("bcrypt");

getDetails = ((data, callback) => {
    let response = {
        status: 400
    };

    // if(data.username==="admin" && data.password==="admin"){
    //     response.status = 201;
    //     response.username = data.username;
    //     response.message = "Login Credentials are correct for admin";
    //     callback(null, response);
    // }

    try {
        console.log("In getUserDetails");
        console.log("USERNAME IS : " + data.username);

        //replace aaj@aaj.com with " + data.username + "
        let getUser = "select * from userprofile where username = '" + data.username + "'";

        let getCardDetails = "select * from paymentdetails where username = '" + data.username + "'";

        let getBillingAddress = "select * from billingaddress where username = '" + data.username + "'";

        mysql.fetchData(function (err, result) {
            console.log("15");

            if (err) {
                console.log(err);
                callback(err, null);
            }
            else {
                console.log(result);
                console.log("0: " + result);
                console.log("1: " + result.length);

                if (result.length === 1) {
                    console.log("No. 1");
                    response.status = 200;

                    response.message = "User exist";
                    response.userDetails = result;

                    mysql.fetchData(function (err, paymentDetails) {
                        console.log("No. 2");

                        if(err) {
                            console.log(err);
                            callback(err, null);
                        }
                        else {
                            console.log("No. 3");

                            if (paymentDetails.length >= 0) {
                                console.log("In paymentDetails");

                                response.message = "Payment details exist";
                                response.paymentDetails = paymentDetails;

                                mysql.fetchData(function (err, billingAddress) {
                                    console.log("No. 4");

                                    if(err) {
                                        console.log(err);
                                        callback(err, null);
                                    }
                                    else {

                                        if(billingAddress.length >= 0) {
                                            console.log("In billing address");

                                            response.message = "Billing address exist";
                                            response.billingAddress = billingAddress;

                                            callback(null, response);
                                        }
                                        else {
                                            callback(null, response);
                                        }
                                    }
                                }, getBillingAddress);
                            }
                            else {
                                callback(null, response);
                            }
                        }
                    }, getCardDetails);
                }
                else {
                    response.status = 400;
                    response.message = "User doen not exist";
                    callback(null, response);
                }
            }
        }, getUser);
    }
    catch (e) {
        console.log(e);
        callback(e, response);
    }
});

exports.getDetails = getDetails;


