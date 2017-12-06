let mysql = require('../mysql/mysql');
handle_request = ((data, callback) => {
    console.log("*************************************ala");
    console.log(data.nameoncard);
    let response = {
        status: 400
    };
    try {
        let street = data.usercard.streetone + "," + data.usercard.streettwo;
        let validity = data.usercard.monthexpiry + "-" + data.usercard.yearexpiry;
        console.log(validity);
        let insertCard2 = "insert into billingaddress(username,street1,street2,postalcode,city,state,country) values ('" + data.username + "','" + data.usercard.streetone+ "','" + data.usercard.streettwo + "','" + data.usercard.postcode + "','"+data.usercard.city+"','"+data.usercard.stateuser+"','"+data.usercard.country+"');";
        let insertCard = "insert into paymentdetails(username, nameoncard, creditCardNumber,validThrough,cvv) values ('" + data.username + "','" + data.usercard.nameoncard + "','" + data.usercard.cardnumber + "','" + validity + "','"+data.usercard.cvv+"');";
        console.log("---SQL Query " + insertCard);

        mysql.insertData(function (err, result) {
            console.log("***********************Query 1")
            if (err) {
                console.log(err);
                callback(err, null);
            }
            else {
                // console.log(result);
                if (result.affectedRows === 1) {
                    mysql.insertData(function (err, result) {
                        console.log("***********************Query 2")
                        if (err) {
                            console.log(err);
                            callback(err, null);
                        }
                        else {
                            // console.log(result);
                            if (result.affectedRows === 1) {

                                response.status = 200;
                                response.username = data.username;
                                response.message = "Added Card Successfully";
                                callback(null, response);
                            }
                            else {
                                response.status = 400;
                                response.message = "Failure in adding Billing Address";
                                callback(null, response);
                            }
                        }
                    }, insertCard2);
                }
                else {
                    response.status = 400;
                    response.message = "Failed to Add Card";
                    callback(null, response);
                }
            }
        }, insertCard);

    }
    catch (e) {
        console.log(e);
        err = e;
        response.status = 401;
        response.message = "Failure in Adding Card";
        callback(err, response);
    }
});

exports.handle_request = handle_request;
