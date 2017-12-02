let bcrypt = require('bcrypt');
let mysql = require('../mysql/mysql');

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };
    try {

        let salt = bcrypt.genSaltSync(10);

        let password = bcrypt.hashSync(data.password, salt);

        let userExist = "select password from user where username = '" + data.username + "'";

        let insertUser = "insert into user (username, password, accessInd) values ('" + data.username + "','" + password + "', '" + data.accessInd + "');";
        let insertUserProfile = "insert into userprofile (username, firstName, lastName, dateofbirth, gender) values ('" + data.username + "', '" + data.firstname + "' ,  '" + data.lastname + "' , '" + data.dob + "' ,  '" + data.gender + "' );";

        console.log("signup - SQL Query " + insertUser);

        mysql.fetchData(function (err, result) {
            if (err) {
                console.log(err);
                callback(err);
            }
            else {
                console.log(result);
                console.log(result.length);
                if (result.length === 1) {
                    response.status = 401;
                    response.message = "User Already Exists";
                    callback(null, response);
                }
                else {
                    mysql.insertData(function (err, result) {
                        if (err) {
                            console.log(err);
                            callback(err);
                        }
                        else {
                            console.log(result);
                            if (result.affectedRows === 1) {

                                mysql.insertData(function (err, result) {
                                        if (err) {
                                            console.log(err);
                                            callback(err);
                                        }
                                        else {
                                            console.log(result);
                                            if (result.affectedRows === 1) {
                                                if(data.accessInd === "admin") {
                                                    response.status = 201;
                                                    response.username = data.username;
                                                    response.message = "User Signup Successful";
                                                    callback(null, response);
                                                }
                                                else {
                                                    response.status = 200;
                                                    response.username = data.username;
                                                    response.message = "Admin Signup Successful";
                                                    callback(null, response);
                                                }
                                            }
                                        }
                                    }
                                    , insertUserProfile)

                            }
                            else {
                                response.status = 400;
                                response.message = "Failed to Signup";
                                callback(null, response);
                            }
                        }
                    }, insertUser);
                }
            }
        }, userExist);
    }
    catch
        (e) {
        console.log(e);
        err = e;
        response.status = 401;
        response.message = "Signup Failed";
        callback(err, response);
    }
})
;

exports.handle_request = handle_request;
