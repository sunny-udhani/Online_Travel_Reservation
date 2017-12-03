let mysql = require('../../mysql/mysql');

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };
    try {
        console.log("data");
        console.log(data);
        let insertQuery = "insert into host (hostName, serviceType) values('"+data.hostName.toLowerCase()+"','"+
            data.serviceType+"');";
        let fetchQuery = "select * from host where hostName = '"+data.hostName+"';";
        console.log(fetchQuery);
        console.log(insertQuery);

        mysql.fetchData(function (err, results) {
            if(err){
                console.log(err);
                callback(err, response);
            }
            else {
                console.log("results : ");
                console.log(results);
                if(results.length===0) {
                    mysql.insertData(function (err, results1) {
                        if(err){
                            console.log(err);
                            callback(err, response);
                        }
                        else {
                            console.log(results1);
                            if(results1.affectedRows===1){
                                mysql.fetchData(function (err, results2) {
                                    if(err){
                                        response.status = 201;
                                        console.log("Data added but failed to fetch");
                                        callback(err, response);
                                    }
                                    else {
                                        response.status = 200;
                                        response.data = results2;
                                        callback(null, response);
                                    }
                                }, fetchQuery);
                            }
                            else {
                                response.status = 400;
                                response.message = "Failed to add data";
                                callback(null, response);
                            }

                        }
                    }, insertQuery);
                }
                else if(results.length===1){
                    response.status = 300;
                    callback(null, response);
                }
                else {
                    response.status = 400;
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


