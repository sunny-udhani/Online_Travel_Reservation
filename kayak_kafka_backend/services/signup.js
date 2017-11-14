var act = require('./activity');
var bcrypt = require('bcrypt');
var UserProfile = require('../models/userprofile');
let mongo = require('./mongo');
let mongoURL = "mongodb://localhost:27017/dropbox";

handle_request = ((data, callback) => {
    let err=null;
    let response = {};
    try {
        console.log(data);
        var salt = bcrypt.genSaltSync(10);

        let user = {
            _id  : data.username,
            firstname : data.firstname,
            lastname : data.lastname,
            username : data.username,
            hashpassword : bcrypt.hashSync(data.password, salt)
        };

        console.log(user);

        mongo.connect(mongoURL, function () {
            let usercollection = mongo.collection('users');
            usercollection.findOne({username: data.username}, function (err, result) {
                console.log(result);
                if (err) {
                    console.log("error:");
                    console.log(err);
                    throw err;
                }
                if (result) {
                    console.log("User Exists");
                    console.log(result._id);
                    response.status = 301;
                    response.message = "Already Exist";
                    callback(err, response);
                }
                else {
                    usercollection.insertOne(user, function (err, result1) {
                        console.log("result");
                        console.log(result1);

                        if (err) {
                            console.log(err);
                            throw err;
                        }

                        if (result1.insertedCount===1) {
                            console.log("Sign up successful");
                            let userprofilecollection = mongo.collection("userprofiles");

                            let userprofile = {
                                _id: data.username,
                                overview: "",
                                work: "",
                                education: "",
                                contactinfo: "",
                                lifeevents: "",
                                music: false,
                                sports: false,
                                reading: false,
                            };

                            userprofilecollection.insertOne(userprofile, function (err, result2) {
                                console.log(result2);
                                if (err) {
                                    console.log(err);
                                    throw "Error while adding data into userprofile table";
                                }
                                if(result2.insertedCount===1){
                                    act.insertIntoActivity(function (err, activityInserted) {
                                        if (err) {
                                            console.log(err);
                                            response.status = 301;
                                            response.message = "Signup Successful. Failed to add user activity";
                                            callback(err, response);
                                        }
                                        console.log(activityInserted);
                                        if (activityInserted) {
                                            response.status = 201;
                                            response.username = data.username;
                                            response.message = "Signup Successful";
                                            callback(err, response);
                                        }
                                        else {
                                            usercollection.deleteOne({_id: data.username}, function (err, result3) {
                                                console.log(result3);
                                                userprofilecollection.deleteOne({_id: data.username}, function (err, result4) {
                                                    console.log(result4);
                                                    //delete directory here
                                                    response.status = 401;
                                                    response.message = "Signup Failed";
                                                    callback(err, response);
                                                })
                                            })

                                        }
                                    }, data.username, "signup");
                                }
                                else {
                                    usercollection.deleteOne({_id: data.username}, function (err, result3) {
                                        response.status = 401;
                                        response.message = "Signup Failed";
                                        callback(err, response);
                                    })
                                }
                            });
                        }
                        else {
                            response.status = 401;
                            response.message = "Signup Failed";
                            callback(err, response);
                        }
                    });
                }
            });
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
