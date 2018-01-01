let mysql = require('../mysql/mysql');
var mongo = require('../mongo/mongo.js');
var mongoURL = 'mongodb://kayak:kayak@kayakcluster-shard-00-00-j61pv.mongodb.net:27017,kayakcluster-shard-00-01-j61pv.mongodb.net:27017,kayakcluster-shard-00-02-j61pv.mongodb.net:27017/kayak?ssl=true&replicaSet=KayakCluster-shard-0&authSource=admin';
let async = require("async");
let ObjectID = require("mongodb").ObjectID;
let db = null;
mongo.connect(mongoURL, function (db_actual) {
    db = db_actual;
})


handle_request = ((data, callback) => {
    console.log("*************************************Cars");
    let response = {
        status: 400
    };
    let username = data.username;
    let carId = '';
    try {
        let getcarbookingsinfo = "select * from carbooking where carbooking.username = '" + data.username + "' ";

        mysql.fetchData(function (err, result) {
            if (err) {
                console.log(err);
                callback(err, null);
            }
            else {
                if (result.length !== 0) {
                    let resultcars = [];

                    async.forEachOf(result, function (booking, index, cb) {
                        console.log(booking);
                        carId = booking.carId;
                        db.collection('cars').findOne({_id: new ObjectID(carId)}, function (err, carDetails) {
                            console.log(carDetails);
                            console.log(err);
                            if (carDetails) {
                                let car_booking = {one: {}, two: {}}

                                car_booking.two = booking;
                                car_booking.one = carDetails;
                                resultcars.push(car_booking);
                                cb();
                                // console.log("******************in hotel final result");
                                // console.log(resulthotels)
                            }
                            else {
                                cb(err);
                                console.log("in error");

                            }
                        });


                    }, function (err) {
                        if (err) {
                            callback(err)
                        } else {
                            console.log("flights -- ");

                            console.log(resultcars);
                            callback(null, resultcars);
                        }
                    });
                }
                else{
                    callback(null, result);
                }


            }
        }, getcarbookingsinfo);
    }

    catch (e) {
        console.log(e);
        callback(e, null)
    }
});

exports.handle_request = handle_request;
