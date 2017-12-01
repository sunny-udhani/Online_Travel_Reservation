let mysql = require('../mysql/mysql');
handle_request = ((data, callback) => {
    console.log("*************************************ala");
    let response = {
        status: 400
    };
    try {
       // let street=data.streetone+","+data.streettwo;
        let validity=data.monthexpiry+"-"+data.yearexpiry;
        let insertCard2 = "insert into billingaddress(username,street1,street2,postalcode,city,state,country) values ('" + data.username + "','" + data.streetone + "','" + data.streettwo + "','" + data.postcode + "','"+data.city+"','"+data.stateuser+"','"+data.country+"');";
        let insertCard = "insert into paymentdetails(username, nameoncard, creditCardNumber,validThrough,cvv) values ('" + data.username + "','" + data.nameoncard + "','" + data.cardnumber + "','" + validity + "','"+data.cvv+"');";
        console.log("---SQL Query " + insertCard);

        new Promise(function (reject, resolve) { // Query 1
            mysql.insertData(function (err, result) {
                console.log("***********************Query 1")
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    // console.log(result);
                    if (result.affectedRows === 1) {
                        response.status = 200;
                        response.username = data.username;
                        response.message = "Added Card Successfully";
                        // callback(null, response);
                        resolve(response);
                    }
                    else {
                        response.status = 400;
                        response.message = "Failed to Add Card";
                        // callback(null, response);
                        reject(response);
                    }
                }
            }, insertCard);

        }).then(function (response) { // Query 2
            console.log("***********************Query 2")
            mysql.insertData(function (err, result) {
                if (err) {
                    console.log(err);
                    throw new Error(err);
                }
                else {
                    if (result.affectedRows === 1) {
                        response.status = 200;
                        response.username = data.username;
                        response.message = "Added Card Successfully";
                        // callback(null, response);
                        return response;
                    }
                    else {
                        response.status = 400;
                        response.message = "Failed to Add Card";
                        // callback(null, response);
                        throw new Error(response);
                    }
                }
            }, insertCard2);

        }).then( function (response) {
            callback(null, response);
        })
            .catch(function(err) {
                callback(err);
            });
    }
    catch
        (e) {
        console.log(e);
        err = e;
        response.status = 401;
        response.message = "Failure in Adding Card";
        callback(err, response);
    }
});

exports.handle_request = handle_request;
