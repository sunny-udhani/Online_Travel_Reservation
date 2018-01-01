let mysql = require('../mysql/mysql');
var mongo = require('../mongo/mongo.js');
var mongoURL = 'mongodb://kayak:kayak@kayakcluster-shard-00-00-j61pv.mongodb.net:27017,kayakcluster-shard-00-01-j61pv.mongodb.net:27017,kayakcluster-shard-00-02-j61pv.mongodb.net:27017/kayak?ssl=true&replicaSet=KayakCluster-shard-0&authSource=admin';
let async = require("async");
let ObjectID = require("mongodb").ObjectID;
let db_actual = null;
mongo.connect(mongoURL, function (db) {
db_actual = db;
})

handle_request = ((data, callback) => {
    console.log("*************************************Flights");
    let response = {
        status: 400
    };
    let username = data.username;
    let flightId = '';
    try {
        let getflightbookingsinfo = "select * from flightbooking where flightbooking.username = '" + data.username + "' ";

        mysql.fetchData(function (err, result) {
            if (err) {
                console.log(err);
                callback(err, null);
            }
            else {
                if (result.length !== 0) {
                    let resultflights = [];

                    async.forEachOf(result, function (booking, index, cb) {
                        console.log(booking);
                        console.log("asdjklasdjlkasjflkasjflkj");
                        flightId = booking.flightId;
                        db_actual.collection('flights').findOne({_id: new ObjectID(flightId)}, function (err, flightDetails) {
                            console.log(flightDetails);
                            console.log(err);
                            if (flightDetails) {
                                let flight_booking = {one: {}, two: {}}

                                flight_booking.two = booking;
                                flight_booking.one = flightDetails;
                                resultflights.push(flight_booking);
                                cb();
                                // console.log("******************in hotel final result");
                                // console.log(resulthotels)
                            }
                            else {
                                cb(err);
                                console.log("in error");

                            }
                        });

                        console.log("aaj")

                    }, function (err) {
                        if (err) {
                            callback(err)
                        } else {
                            console.log("flights -- ");

                            console.log(resultflights);
                            callback(null, resultflights);
                        }
                    });
                }else{
                    callback(null, result);
                }


            }
        }, getflightbookingsinfo);
    }

    catch (e) {
        console.log(e);
        callback(e, null)
    }
});

exports.handle_request = handle_request;
