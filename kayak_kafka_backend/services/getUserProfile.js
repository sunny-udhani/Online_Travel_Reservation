let mysql = require('../mysql/mysql');

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };

    try {
        console.log("Users Profile Fetch");
        console.log(data);
        let dataToBeFetched = "u.username, u.accessInd, firstName, lastName, street, city, " +
            "state, zipCode, phoneNumber, profileImage, dateofbirth, gender";
        let fetchQuery = "select " + dataToBeFetched + " from user as u join userprofile as up on u.username=up.username " +
            "where u.username = '"+ data.username +"';";
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


