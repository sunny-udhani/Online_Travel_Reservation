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
    console.log("*************************************Hotels");
    let response = {
        status: 400
    };
    let username = data.username;
    let hotelId = '';
    try {
        let gethotelbookingsinfo = "select * from hotelbooking where hotelbooking.username = '" + data.username + "' ";

        mysql.fetchData(function (err, result) {
            if (err) {
                console.log(err);
                callback(err, null);
            }
            else {
                if (result.length !== 0) {
                    let resulthotels = [];

                    async.forEachOf(result, function (booking, index, cb) {
                        console.log(booking);
                        hotelId = booking.hotelId;

                        db.collection('hotels').findOne({_id: new ObjectID(hotelId)}, function (err, hotelDetails) {
                            console.log(hotelDetails);
                            console.log(err);
                            if (hotelDetails) {
                                let hotel_booking = {one: {}, two: {}}

                                hotel_booking.two = booking;
                                hotel_booking.one = hotelDetails;
                                resulthotels.push(hotel_booking);
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

                            console.log(resulthotels);
                            callback(null, resulthotels);
                        }
                    });
                }else{
                    callback(null, result);
                }


            }
        }, gethotelbookingsinfo);
    }

    catch (e) {
        console.log(e);
        callback(e, null)
    }
});

exports.handle_request = handle_request;
