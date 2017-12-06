let mysql = require('../mysql/mysql');
handle_request = ((data, callback) => {
    console.log("*************************************came");
    console.log(data.details)
    // console.log(data.nameoncard);
    let response = {
        status: 400
    };
    try {
        var sql = "UPDATE userprofile SET firstname ='" + data.details.firstname + "',lastname ='" + data.details.lastname + "',state ='" + data.details.state + "',city ='" + data.details.city + "',street ='" + data.details.street + "',zipCode ='" + data.details.zipCode + "',dateofbirth ='" + data.details.dob + "',phoneNumber ='" + data.details.phnumber + "',gender ='" + data.details.gender + "' WHERE username = '" + data.username + "'";


        //let edituser = "insert into paymentdetails(username, nameoncard, creditCardNumber,validThrough,cvv) values ('" + data.details.firstname + "','" + data.nameoncard + "','" + data.cardnumber + "','" + validity + "','" + data.cvv + "');";
        console.log("---SQL Query " + sql);

        mysql.insertData(function (err, result) {
            console.log("***********************Query 1")
            if (err) {
                console.log(err);
                callback(err, null);
            }
            else {
                // console.log(result);
                if (result.affectedRows === 1) {
                    response.status = 200;
                    response.message = "Succesfully Updated";
                    callback(null, response)
                }

            }

        }, sql);
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


