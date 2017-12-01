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

        //replace aaj@aaj.com with " + data.username + "
        let getUser = "select * from userprofile where username = 'aaj@aaj.com'";

        let getCardDetails = "select * from paymentdetails where username = 'aaj@aaj.com'";

        let getBillingAddress = "select * from billingaddress where username = 'aaj@aaj.com'";

        mysql.fetchData(function (err, result) {
            console.log("15");

            if (err) {
                console.log(err);
            }
            else {
                console.log(result);
                console.log("0: " + result);
                console.log("1: " + result.length);
                console.log("2: " + result[0].firstName);
                console.log("3: " + result[0].lastName);

                if (result.length === 1) {

                    response.status = 200;

                    response.message = "User exist";
                    response.userDetails = result;

                    mysql.fetchData(function (err, paymentDetails) {

                        if(err) {
                            console.log(err);
                        }
                        else {
                            if (paymentDetails.length === 1) {
                                console.log("In paymentDetails");

                                response.message = "Payment details exist";
                                response.paymentDetails = paymentDetails;

                                mysql.fetchData(function (err, billingAddress) {

                                    if(err) {
                                        console.log(err);
                                    }
                                    else {
                                        if(billingAddress.length === 1) {
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


