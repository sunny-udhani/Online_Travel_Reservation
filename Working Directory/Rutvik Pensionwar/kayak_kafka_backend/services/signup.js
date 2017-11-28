let bcrypt = require('bcrypt');
let mysql = require('../mysql/mysql');
// var UserProfile = require('../models/userprofile');
// let mongo = require('./mongo');
// let mongoURL = "mongodb://localhost:27017/dropbox";

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };
    try {

        let salt = bcrypt.genSaltSync(10);

        let password = bcrypt.hashSync(data.password, salt);

        let userExist = "select password from users where username = '" + data.username + "'";

        let insertUser = "insert into users (username, password) values ('" + data.username + "','" + password + "');";
        console.log("signup - SQL Query " + insertUser);

        mysql.fetchData(function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(result);
                console.log(result.length);
                if (result.rows === 1) {
                    response.status = 401;
                    response.message = "User Already Exists";
                    callback(null, response);
                }
                else {
                    mysql.insertData(function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(result);
                            if (result.affectedRows === 1) {
                                response.status = 200;
                                response.username = data.username;
                                response.message = "Signup Successful";
                                callback(null, response);
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
