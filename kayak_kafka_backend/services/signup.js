let bcrypt = require('bcrypt');
let mysql = require('../mysql/mysql');

handle_request = ((data, callback) => {
    let response = {
        status : 400
    };
    try {
        let salt = bcrypt.genSaltSync(10);

        let password = bcrypt.hashSync(data.password, salt);
        let sqlQuery = "insert into users (username, password) values ('"+data.username+"','"+password+"');";
        console.log(sqlQuery);
        mysql.fetchData(function (err, result) {
            if(err){
                console.log(err);
            }
            else {
                console.log(result);
                if(result.rows===1){
                    response.status = 401;
                    response.message = "User Already Exists";
                    callback(null, response);
                }
                else {
                    mysql.insertData(function (err, result) {
                        if(err){
                            console.log(err);
                        }
                        else {
                            console.log(result);
                            if(result.affectedRows===1){
                                response.status = 200;
                                response.message = "Signup Successful";
                                callback(null, response);
                            }
                            else {
                                response.status = 400;
                                response.message = "Failed to Signup";
                                callback(null, response);
                            }
                        }
                    });
                }
            }
        });
    }
    catch (e){
        console.log(e);
        err = e;
        response.status = 401;
        response.message = "Signup Failed";
        callback(err,response);
    }
});

exports.handle_request = handle_request;
