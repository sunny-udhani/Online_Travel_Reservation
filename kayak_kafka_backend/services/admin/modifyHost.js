let mysql = require('../../mysql/mysql')

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };

    try {
        console.log("Hotel Fetch");
        console.log(data);
        let fetchQuery = "select * from host where hostName = '"+data.hostName.toLowerCase()+"' and serviceType = '"+data.serviceType+"';";
        let updateQuery = "update host set hostName = '"+ data.hostName.toLowerCase() +"', serviceType='"+data.serviceType+"' " +
            "where hostId = '"+ data.hostId +"';";

        mysql.fetchData(function (err, result) {
            if(err){
                console.log(err);
                callback(err, response);
            }
            else {
                console.log(result);
                if(result.length===0){
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


