let mongo = require("../../mongo/mongo");
let mongoURL = "mongodb://kayak:kayak@cluster0-shard-00-00-j61pv.mongodb.net:27017,cluster0-shard-00-01-j61pv.mongodb.net:27017,cluster0-shard-00-02-j61pv.mongodb.net:27017/kayak?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
let mysql = require('../../mysql/mysql');
let Hotel = require("../../Models/Hotel");
let async = require("async");

let searchCriteria = {
    city: "",
    checkIn_date: "",
    checkOut_date: "",
    no_of_people: "",
};

exports.listHotels = ((message, callback) => {
    try {
        if (message === null || message === undefined || message === '') {
            callback("no criteria to search for");
        } else {
            // searchCriteria = message.criteria;
            let criteriaArr = message.criteria.split("_");
            console.log(criteriaArr);

            searchCriteria.city = criteriaArr[0].toString();
            searchCriteria.checkIn_date = criteriaArr[1].toString();
            searchCriteria.checkOut_date = criteriaArr[2].toString();
            searchCriteria.no_of_people = criteriaArr[3].toString();
            //
            // mongo.collection("Hotel").find({}).toArray( function (err, res) {
            //     console.log(err);
            //     console.log(res);
            // });


            // Hotel.find({hotelId: 1, city: searchCriteria.city.toLowerCase()}, function (err, results) {
            Hotel.find({city: searchCriteria.city.toLowerCase()}, function (err, results) {
                console.log(err);
                if (err) {
                    callback(err);
                }
                let HotelList = [];
                if (results) {
                    async.forEachOf(results, function (hotel, index, cb) {
                        if (hotel !== null || hotel !== "") {
                            console.log("hotel to match");
                            console.log(hotel);
                            mysql.fetchData(function (err, result1) {
                                if (err) {
                                    cb(err);
                                } else {
                                    console.log("results from booking");

                                    console.log(result1);
                                    if (result1 !== null) {
                                        console.log(hotel.rooms);
                                        if (result1[0].total < hotel.rooms[0].noOfRooms) {
                                            HotelList.push(hotel);
                                            cb();
                                        } else {
                                            cb();
                                        }
                                    } else {
                                        cb();
                                    }
                                }
                            }, "select count(bookingid) as total from hotelbooking where hotelbooking.hotelId = '" + hotel._id + "' and hotelbooking.fromDate = '" + searchCriteria.checkIn_date + "' and hotelbooking.toDate = '" + searchCriteria.checkOut_date + "'")
                        }
                    }, function (err) {
                        if (err) {
                            callback(err)
                        } else {
                            console.log("HotelList");

                            console.log(HotelList);
                            callback(null, HotelList);
                        }
                    });
                }
            })
        }

    } catch (e) {
        console.log(e);
        callback(e, null)
    }
});


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}