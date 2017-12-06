let mysql = require('../../mysql/mysql');
let Flight = require("../../Models/Flight");
let async = require("async");
var date = require('mongodb').Date;

let searchCriteria = {
    from: "",
    to: "",
    depart_date: "",
    return_date: "",
    no_of_people: "",
    class: "",
    booking_type: "",
};

exports.listFlights = ((message, callback) => {
    try {
        if (message === null || message === undefined || message === '') {
            callback("no criteria to search for");
        } else {
            // searchCriteria = message.criteria;
            let criteriaArr = message.criteria.split("_");
            console.log(criteriaArr);


            searchCriteria.booking_type = criteriaArr[0].toString();
            if (searchCriteria.booking_type === "round-trip") {
                searchCriteria.from = criteriaArr[1].toString();
                searchCriteria.to = criteriaArr[2].toString();
                searchCriteria.depart_date = criteriaArr[3].toString();
                searchCriteria.return_date = criteriaArr[4].toString();
                searchCriteria.no_of_people = criteriaArr[5].toString();
                searchCriteria.class = criteriaArr[6].toString();
                let RoundFlightList = [];
                listRoundFlights(function (err, roundFlightList) {

                    if (err) {
                        callback(err);
                    } else {
                        RoundFlightList = roundFlightList;
                        console.log(roundFlightList);
                        console.log("round trip flights");

                        callback(null, RoundFlightList)
                    }
                })

            }
            else {
                searchCriteria.from = criteriaArr[1].toString().toLowerCase();
                searchCriteria.to = criteriaArr[2].toString().toLowerCase();
                searchCriteria.depart_date = criteriaArr[3].toString();
                searchCriteria.no_of_people = criteriaArr[4].toString();
                searchCriteria.class = criteriaArr[5].toString().toLowerCase();

                let FlightListDirect = [];
                let FlightListIndirect = [];
                //
                // console.log(new date(searchCriteria.depart_date));

                listDirectFlights(function (err, directFlightList) {

                    if (err) {
                        callback(err);
                    } else {
                        FlightListDirect = directFlightList;
                        console.log("completed direct");
                        //list
                        console.log(directFlightList);

                        listIndirectFlights(function (err, indirectFlightList) {

                            FlightListIndirect = indirectFlightList
                            console.log("completed both")

                            callback(null, {direct: FlightListDirect, indirect: FlightListIndirect})
                        })
                    }

                })
            }
        }

    }
    catch
        (e) {
        console.log(e);
        callback(e, null)
    }
})
;


function listDirectFlights(callback) {

    let FligthList = [];

    Flight.find({
        origin: searchCriteria.from,
        destination: searchCriteria.to,
        departureDate: searchCriteria.depart_date
    }, function (err, results) {
        // direct flights

        console.log(err);
        console.log(results);

        if (err) {
            callback(err);
        }

        if (results) {

            // direct flights
            console.log("in direct flights");

            if (results.length > 0) {

                async.forEachOf(results, function (flight, index, cb) {

                    if (flight !== null) {

                        mysql.fetchData(function (err, result1) {

                            if (err) {
                                cb(err);
                            }
                            else {

                                if (result1 !== null) {
                                    let flag = false;

                                    for (let i = 0; i < flight.classes.length; i++) {

                                        console.log(flight.classes[i].classType.toString());

                                        if (flight.classes[i].classType.toString().toLowerCase() === searchCriteria.class && result1[0].total < flight.classes[i].noOfSeats && (result1[0].total + parseInt(searchCriteria.no_of_people)) < flight.classes[i].noOfSeats ) {

                                            // direct flights
                                            flag = true;
                                            FligthList.push(flight);
                                            cb();
                                        }
                                        else {
                                            continue;
                                        }

                                    }
                                    console.log(flag);

                                    if (!flag) {
                                        cb();
                                    }
                                }
                                else {
                                    cb();
                                }
                            }

                        }, "select sum(noOfPassengers) as total from flightbooking where flightbooking.flightId = '" + flight._id + "' and flightbooking.flightClass = '" + searchCriteria.class + "' ")
                    }
                }, function (err) {
                    if (err) {
                        callback(err)
                    } else {
                        callback(null, FligthList);
                    }
                });
            } else {
                callback();
            }

        }
    })
}

function listIndirectFlights(callback) {

    let indirectFlights = [];

    let tempFlightRecords = {one: {}, two: {}, totalPrice: 0};
    // indirect flights

    console.log(searchCriteria.from);
    console.log(searchCriteria.to);
    console.log(searchCriteria.depart_date);


    Flight.find({
        origin: searchCriteria.from.toLowerCase(),
        destination: {$ne: searchCriteria.to.toLowerCase()},
        departureDate: searchCriteria.depart_date
    }, function (err, oneHopResults) {

        console.log(err);

        if (err) {
            callback(err);
        }

        if (oneHopResults) {
            // indirect flights

            if (oneHopResults.length > 0) {

                async.forEachOf(oneHopResults, function (flight, index, cb1) {
                        let totalPrice = 0;
                        // indirect flights

                        if (flight !== null) {

                            console.log("flight to match");
                            console.log(flight);
                            console.log("1");


                            mysql.fetchData(function (err, result1) {

                                if (err) {
                                    cb1(err);
                                }
                                else {
                                    // indirect flights

                                    if (result1 !== null) {

                                        console.log(flight.classes);
                                        console.log("1");
                                        let flag = false;

                                        for (let i = 0; i < flight.classes.length; i++) {
                                            console.log("2");
                                            // indirect flights

                                            console.log(flight.classes[i].classType.toString());

                                            if (flight.classes[i].classType.toString().toLowerCase() === searchCriteria.class && result1[0].total < flight.classes[i].noOfSeats) {
                                                // indirect flights

                                                tempFlightRecords.one = flight;
                                                totalPrice = flight.classes[i].price;
                                                flag = true;
                                                console.log("3");
                                                console.log("search nxt flight with following restrictions");
                                                // indirect flights
                                                console.log(flight.destination.toLowerCase());
                                                console.log(searchCriteria.to.toLowerCase());
                                                console.log(flight.arrivalDate);

                                                Flight.findOne(
                                                    {
                                                        origin: flight.destination.toLowerCase(),
                                                        destination: searchCriteria.to.toLowerCase(),
                                                        departureDate: {$gte: flight.arrivalDate},
                                                    },
                                                    function (err, oneHopLastResult) {
                                                        console.log("4");
                                                        console.log(oneHopLastResult);
                                                        // indirect flights

                                                        if (oneHopLastResult) {
                                                            mysql.fetchData(function (err, result1) {

                                                                if (err) {
                                                                    cb1(err);
                                                                }
                                                                else {

                                                                    // indirect flights
                                                                    console.log("results from booking");
                                                                    console.log(result1);

                                                                    if (result1 !== null) {
                                                                        // indirect flights
                                                                        console.log("56")
                                                                        console.log(oneHopLastResult.classes);
                                                                        let flagind = false;
                                                                        for (let i = 0; i < oneHopLastResult.classes.length; i++) {

                                                                            console.log(oneHopLastResult.classes[i].classType.toString());

                                                                            if (oneHopLastResult.classes[i].classType.toString().toLowerCase() === searchCriteria.class && result1[0].total < oneHopLastResult.classes[i].noOfSeats) {
                                                                                // indirect flights
                                                                                console.log("6");
                                                                                tempFlightRecords.two = oneHopLastResult;

                                                                                totalPrice += oneHopLastResult.classes[i].price;
                                                                                tempFlightRecords.totalPrice = totalPrice;
                                                                                indirectFlights.push(tempFlightRecords);
                                                                                cb1();
                                                                            } else {
                                                                                // indirect flights

                                                                                // cb1();

                                                                            }
                                                                        }
                                                                        if (!flagind) {
                                                                            cb1();
                                                                        }
                                                                    }
                                                                    else {
                                                                        cb1();
                                                                    }
                                                                }
                                                            }, "select count(noOfPassengers) as total from flightbooking where flightbooking.flightId = '" + oneHopLastResult._id + "' and flightbooking.flightClass = '" + searchCriteria.class + "' ")

                                                        }
                                                        else {
                                                            cb1();
                                                        }


                                                    }
                                                )


                                            }
                                            else {
                                                // cb1();
                                            }
                                        }
                                        if (!flag) {
                                            cb1();
                                        }
                                    }
                                    else {
                                        cb1();
                                    }
                                }

                            }, "select count(noOfPassengers) as total from flightbooking where flightbooking.flightId = '" + flight._id + "' and flightbooking.flightClass = '" + searchCriteria.class + "' ")
                        }
                    },
                    function (err) {
                        if (err) {
                            callback(err)
                        } else {

                            callback(null, indirectFlights)
                        }
                    })
            } else {
                callback(null, indirectFlights)
            }
        } else {
            callback(null, indirectFlights)
        }
    })

}

function listRoundFlights(callback) {

    let FlightList = [];

    let tempFlightRecords = {one: {}, two: {}, totalPrice: 0};
    // indirect flights

    console.log(searchCriteria.from);
    console.log(searchCriteria.to);
    console.log(searchCriteria.depart_date);
    console.log(searchCriteria.arrivalDate);


    Flight.find({
        origin: searchCriteria.from.toLowerCase(),
        destination: {$ne: searchCriteria.to.toLowerCase()},
        departureDate: searchCriteria.depart_date
    }, function (err, side_one) {

        console.log(err);

        if (err) {
            callback(err);
        }

        if (side_one) {
            // indirect flights

            if (side_one.length > 0) {

                async.forEachOf(side_one, function (flight, index, cb1) {
                        let totalPrice = 0;
                        // indirect flights

                        if (flight !== null) {

                            console.log("flight to match");
                            console.log(flight);
                            console.log("1");


                            mysql.fetchData(function (err, result1) {

                                if (err) {
                                    cb1(err);
                                }
                                else {
                                    // indirect flights

                                    if (result1 !== null) {

                                        console.log(flight.classes);
                                        console.log("1");
                                        let flag = false;

                                        for (let i = 0; i < flight.classes.length; i++) {
                                            console.log("2");
                                            // indirect flights

                                            console.log(flight.classes[i].classType.toString());

                                            if (flight.classes[i].classType.toString().toLowerCase() === searchCriteria.class && result1[0].total < flight.classes[i].noOfSeats) {
                                                // indirect flights

                                                tempFlightRecords.one = flight;
                                                totalPrice = flight.classes[i].price;

                                                console.log("3");
                                                console.log("search nxt flight with following restrictions");
                                                // indirect flights
                                                console.log(searchCriteria.from.toLowerCase());
                                                console.log(searchCriteria.to.toLowerCase());
                                                console.log(searchCriteria.arrivalDate);

                                                Flight.findOne(
                                                    {
                                                        origin: searchCriteria.to.toLowerCase(),
                                                        destination: searchCriteria.from.toLowerCase(),
                                                        arrivalDate: searchCriteria.arrivalDate,
                                                    },
                                                    function (err, side_two) {
                                                        console.log("4");
                                                        console.log(side_two);
                                                        // indirect flights

                                                        if (side_two) {
                                                            mysql.fetchData(function (err, result1) {

                                                                if (err) {
                                                                    cb1(err);
                                                                }
                                                                else {

                                                                    // indirect flights
                                                                    console.log("results from booking");
                                                                    console.log(result1);

                                                                    if (result1 !== null) {
                                                                        // indirect flights
                                                                        console.log("5")
                                                                        console.log(side_two.classes);
                                                                        for (let i = 0; i < side_two.classes.length; i++) {

                                                                            console.log(side_two.classes[i].classType.toString());

                                                                            if (side_two.classes[i].classType.toString().toLowerCase() === searchCriteria.class && result1[0].total < side_two.classes[i].noOfSeats) {
                                                                                // indirect flights
                                                                                console.log("6");
                                                                                tempFlightRecords.two = side_two;

                                                                                totalPrice += side_two.classes[i].price;
                                                                                tempFlightRecords.totalPrice = totalPrice;
                                                                                FlightList.push(tempFlightRecords);
                                                                                cb1();
                                                                            } else {
                                                                                // indirect flights

                                                                                // cb1();

                                                                            }
                                                                        }
                                                                    }
                                                                    else {
                                                                        cb1();
                                                                    }
                                                                }
                                                            }, "select count(noOfPassengers) as total from flightbooking where flightbooking.flightId = '" + side_two._id + "' and flightbooking.flightClass = '" + searchCriteria.class + "' ")

                                                        }
                                                        else {
                                                            cb1();
                                                        }


                                                    }
                                                )


                                            }
                                            else {
                                                // cb1();
                                            }
                                        }
                                    }
                                    else {
                                        cb1();
                                    }
                                }

                            }, "select count(noOfPassengers) as total from flightbooking where flightbooking.flightId = '" + flight._id + "' and flightbooking.flightClass = '" + searchCriteria.class + "' ")
                        }
                    },
                    function (err) {
                        if (err) {
                            callback(err)
                        } else {

                            callback(null, FlightList)
                        }
                    })
            } else {
                callback()
            }
        }
    })
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}