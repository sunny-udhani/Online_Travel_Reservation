let mysql = require('../../mysql/mysql');

handle_request = ((data, callback) => {
    let response = {
        status: 400,
        analytics:{
            Hotel: {
                labels: [],
                data: []
            },
            Flight: {
                labels: [],
                data: []
            },
            Car: {
                labels: [],
                data: []
            }
        }
    };
    try {

        console.log("data");

        console.log(data);

        let sqlQuery_hotels = "select h.hostName, SUM(hb.totalAmount) as totalRevenue from host as h " +
            "left outer join hotelbooking as hb " +
            "on h.hostId=hb.hostId " +
            " where h.serviceType='hotel'"+
            "group by h.hostId " +
            "order by totalRevenue desc limit 10";

        // let sqlQuery_hotels = "select h.hostName, SUM(hb.totalAmount) as totalRevenue from hotelbooking as hb join host as h on hb.hostId=h.hostId group by hb.hostId order by totalRevenue desc limit 10";

        mysql.fetchData(function(err,results){

            if(err){
                console.log(`Database query Error - ${err}`);
                callback(err, null);
            }

            else{

                if(results){

                    let labels = [];

                    let data = [];

                     results.forEach(function (result) {
                         labels.push(result.hostName);
                         if(result.totalRevenue === null){
                             data.push(0);
                         }
                         else{
                             data.push(result.totalRevenue);
                         }
                    });

                    response.analytics.Hotel.labels = labels;

                    response.analytics.Hotel.data = data;

                    let sqlQuery_flights = "select h.hostName, SUM(fb.totalAmount) as totalRevenue from host as h " +
                        "left outer join flightbooking as fb " +
                        "on h.hostId=fb.hostId " +
                        " where h.serviceType='flight'"+
                        "group by h.hostId " +
                        "order by totalRevenue desc limit 10";

                    // let sqlQuery_flights = "select h.hostName, SUM(fb.totalAmount) as totalRevenue from flightbooking as fb join host as h on fb.hostId=h.hostId group by fb.hostId order by totalRevenue desc limit 10";

                    mysql.fetchData(function(err,results) {

                        if (err) {
                            console.log(`Database query Error - ${err}`);
                            callback(err, null);
                        }
                        else {
                            if (results) {

                                let labels = [];

                                let data = [];

                                results.forEach(function (result) {
                                    labels.push(result.hostName);
                                    if(result.totalRevenue === null){
                                        data.push(0);
                                    }
                                    else{
                                        data.push(result.totalRevenue);
                                    }
                                });

                                response.analytics.Flight.labels = labels;

                                response.analytics.Flight.data = data;

                                let sqlQuery_cars = "select h.hostName, SUM(cb.totalAmount) as totalRevenue from host as h " +
                                    "left outer join carbooking as cb " +
                                    "on h.hostId=cb.hostId " +
                                    " where h.serviceType='car'"+
                                    "group by h.hostId " +
                                    "order by totalRevenue desc limit 10";

                                mysql.fetchData(function(err,results) {

                                    if (err) {
                                        console.log(`Database query Error - ${err}`);
                                        callback(err, null);
                                    }
                                    else {

                                        if (results) {

                                            let labels = [];

                                            let data = [];

                                            results.forEach(function (result) {
                                                labels.push(result.hostName);
                                                if(result.totalRevenue === null){
                                                    data.push(0);
                                                }
                                                else{
                                                    data.push(result.totalRevenue);
                                                }
                                            });

                                            response.analytics.Car.labels = labels;

                                            response.analytics.Car.data = data;

                                            // convert to required format

                                            console.log("car labels - "+response.analytics.Car.labels);

                                            console.log("car data - "+response.analytics.Car.data);

                                            console.log("flight labels - "+response.analytics.Flight.labels);

                                            console.log("flight data - "+response.analytics.Flight.data);

                                            console.log("hotel labels - "+response.analytics.Hotel.labels);

                                            console.log("hotel data - "+response.analytics.Hotel.data);

                                            response.status = 200;

                                            callback(null, response);

                                        }

                                        else{

                                            console.log("No results received");
                                            callback(null, response);
                                        }

                                    }

                                },sqlQuery_cars);

                            }

                            else{

                                console.log("No results received");
                                callback(null, response);
                            }

                        }

                    },sqlQuery_flights);

                }

                else{

                    console.log("No results received");
                    callback(null, response);
                }

            }

        },sqlQuery_hotels);

    }

    catch (e) {
        console.log(e);
        callback(e, response);
    }
});

exports.handle_request = handle_request;
