let mongo = require("../../mongo/mongo");
let mongoURL = "mongodb://kayak:kayak@cluster0-shard-00-00-j61pv.mongodb.net:27017,cluster0-shard-00-01-j61pv.mongodb.net:27017,cluster0-shard-00-02-j61pv.mongodb.net:27017/kayak?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
let mysql = require('../../mysql/mysql');
let Car = require("../../Models/Car");
let async = require("async");

let searchCriteria = {
    city: "",
    from_date: "",
    to_date: "",
};

exports.listCars = ((message, callback) => {
    try {
        if (message === null || message === undefined || message === '') {
            callback("no criteria to search for");
        } else {
            // searchCriteria = message.criteria;
            let criteriaArr = message.criteria.split("_");
            console.log(criteriaArr);

            searchCriteria.city = criteriaArr[0].toString();
            searchCriteria.from_date = criteriaArr[1].toString();
            searchCriteria.to_date = criteriaArr[2].toString();


            Car.find({city: searchCriteria.city.toLowerCase()}, function (err, results) {
                if (err) {
                    callback(err);
                }

                let CarList = [];
                if (results) {

                    if (results.length > 0) {

                        async.forEachOf(results, function (car, index, cb) {

                            if (car !== null || car !== "") {

                                console.log("car to match");
                                console.log(car);


                                mysql.fetchData(function (err, result1) {

                                    if (err) {

                                        cb(err);

                                    } else {

                                        console.log("results from booking");

                                        console.log(result1);

                                        if (result1 !== null) {

                                            console.log(car.rooms);
                                            if (result1[0].total < 1) {

                                                CarList.push(car);
                                                cb();

                                            } else {

                                                cb();

                                            }
                                        } else {

                                            cb();

                                        }

                                    }
                                }, "select count(bookingId) as total from carbooking where carbooking.carId = '" + car._id + "' and carbooking.fromDate = '" + searchCriteria.from_date + "' and carbooking.toDate = '" + searchCriteria.to_date + "'")
                            }
                        }, function (err) {
                            if (err) {
                                callback(err)
                            } else {
                                console.log("CarList");

                                console.log(CarList);
                                callback(null, CarList);
                            }
                        });
                    } else {
                        callback("no cars in the city")
                    }
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