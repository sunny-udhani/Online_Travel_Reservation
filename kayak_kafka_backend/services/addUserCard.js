let mysql = require('../mysql/mysql');
handle_request = ((data, callback) => {
    console.log("*************************************ala");
    console.log(data.nameoncard);
    let response = {
        status: 400
    };
    try {
        let street = data.streetone + "," + data.streettwo;
        let validity = data.monthexpiry + "-" + data.yearexpiry;
        console.log(validity);
        let insertCard2 = "insert into userprofile(username,street,state,zipCode) values ('" + data.username + "','" + street + "','" + data.state + "','" + data.postcode + "');";
        let insertCard = "insert into paymentdetails(username, nameoncard, creditCardNumber,validThrough,cvv) values ('" + data.username + "','" + data.nameoncard + "','" + data.cardnumber + "','" + validity + "','"+data.cvv+"');";
        console.log("---SQL Query " + insertCard);

        mysql.insertData(function (err, result) {
            console.log("***********************Query 1")
            if (err) {
                console.log(err);
            }
            else {
                // console.log(result);
                if (result.affectedRows === 1) {
                    response.status = 200;
                    response.username = data.userEmail;
                    response.message = "Added Card Successfully";
                    callback(null, response);
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
