let mysql = require('../../../mysql/mysql');

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };

    try {
        console.log("Modify User");
        console.log(data);
        let fetchQuery = "select * from user where username = '"+data.username+"';";
        let updateQuery = "update userprofile set " +
            "firstName = '"+ data.firstName +"', " +
            "lastName = '"+ data.lastName +"', " +
            "street = '"+ data.street +"', " +
            "city = '"+ data.city +"', " +
            "state = '"+ data.state +"', " +
            "zipCode = '"+ data.zipCode +"', " +
            "phoneNumber = '"+ data.phoneNumber +"', " +
            ((data.dateofbirth===null || data.dateofbirth===undefined || data.dateofbirth==="") ? ""
                :
                "dateofbirth = '"+ data.dateofbirth.substr(0, data.dateofbirth.indexOf("T")) +"', ") +
            "gender = '"+ data.gender +"' " +
            "where username = '"+ data.username +"';";

        mysql.fetchData(function (err, result) {
            if(err){
                console.log(err);
                callback(err, response);
            }
            else {
                console.log(result);
                if(result.length===1){
                    mysql.updateData(function (err, result1) {
                        if(err){
                            console.log(err);
                            callback(err, response);
                        }
                        else {
                            console.log(result1);
                            if(result1.affectedRows===1){
                                response.status = 200;
                                callback(null, response);
                            }
                            else{
                                response.status = 300;
                                callback(null, response);
                            }
                        }
                    }, updateQuery);
                }
                else {
                    response.status = 204;
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


