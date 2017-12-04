let mysql = require('../mysql/mysql');

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };

    try {
        console.log("Users CreditCard Fetch");
        console.log(data);
        let dataToBeFetched = "nameoncard, creditCardNumber,validThrough,cvv";
        let fetchQuery = "select " + dataToBeFetched + " from paymentdetails where username='"+data.username+"';";
        console.log(fetchQuery);
        mysql.fetchData(function (err, results) {
            if(err){
                console.log(err);
                callback(err, response);
            }
            else {
                console.log("result");
                console.log(results);
                if(results.length>0){
                    response.status=200;
                    response.data = results;
                    callback(null, response);
                }
                else {
                    response.status=204;
                    callback(null, response);
                }
            }
        }, fetchQuery);
    }
    catch (e) {
        console.log(e);
        callback(e, response);
    }
});

exports.handle_request = handle_request;


