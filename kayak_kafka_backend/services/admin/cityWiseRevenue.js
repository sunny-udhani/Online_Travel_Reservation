let mysql = require('../../mysql/mysql');
let Hotel = require('../../Models/Hotel');
let Car = require('../../Models/Car');
let Flight = require('../../Models/Flight');
let ObjectId = require('mongodb').ObjectID;

let jsonObj = [];

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };

    try {
        console.log("City Wise Revenue");
        console.log(data);
        jsonObj = [];
        fetchCityByHotels(function (err, response) {
            if(err){
                console.log(err);
                callback(err, response);
            }
            else {
                console.log(jsonObj);
                if(response.status===200) {
                    fetchCityByCars(jsonObj, function (err, response) {
                        if (err) {
                            console.log(err);
                            callback(err, response);
                        }
                        else {
                            if(response.status===200){

                                console.log(jsonObj);
                                fetchCityByFlights(jsonObj, function (err, response) {
                                    if (err) {
                                        console.log(err);
                                        callback(err, response);
                                    }
                                    else {
                                        console.log("final jsonObj : ");
                                        console.log(jsonObj);
                                        response.data = jsonObj;
                                        callback(null, response);
                                    }
                                });
                            }
                            else {
                                callback(null, response);
                            }
                        }
                    });
                }
                else {
                    callback(null, response);
                }
            }
        });
    }
    catch (e) {
        console.log(e);
        callback(e, response);
    }
});

fetchCityByHotels = ((callback)=>{
    let response = {
        status : 400
    };
    try{

        let fetchQuery = "select hotelId, SUM(totalAmount) as 'totalRevenue' " +
            "from host as h " +
            "join " +
            "hotelbooking as hb " +
            "on h.hostId = hb.hostId " +
            "where h.serviceType='hotel' " +
            "group by hotelId;";

        mysql.fetchData(function (err, results) {
            if(err){
                console.log(err);
                callback(null, results);
            }
            else {
                // let jsonObj = [];
                // console.log(results);
                if(results.length>0){
                    let mysqlCount=0;
                    results.map((mysqlresult)=>{
                        Hotel.find({_id : ObjectId(mysqlresult.hotelId)},{city:1}, function (err, results1) {
                            // console.log(results1);
                            let cityExists = false;
                            let jsoncount = 0;
                            if(jsonObj.length>0){
                                jsonObj.map((obj)=>{
                                    console.log(obj);
                                    if(obj.city===results1[0].city){
                                        obj.totalRevenue.hotel = obj.totalRevenue.hotel + mysqlresult.totalRevenue;
                                        // console.log(obj);
                                        cityExists = true;
                                    }
                                    jsoncount ++;
                                    if(jsoncount===jsonObj.length){
                                        // console.log("JSON COunt : " + jsoncount);
                                        mysqlCount++;
                                        if(!cityExists){
                                            console.log("City does not exist" + cityExists);
                                            jsonObj.push(
                                                {
                                                    city:results1[0].city,
                                                    totalRevenue:{
                                                        hotel : mysqlresult.totalRevenue,
                                                        flight : 0,
                                                        car : 0
                                                    }
                                                })
                                        }
                                    }
                                    if(mysqlCount===results.length){
                                        console.log("Before CB in Hotel");
                                        console.log(jsonObj);
                                        response.status=200;
                                        callback(null, response);
                                    }
                                });
                            }
                            else {
                                jsonObj.push(
                                    {
                                        city:results1[0].city,
                                        totalRevenue:{
                                            hotel : mysqlresult.totalRevenue,
                                            flight : 0,
                                            car : 0
                                        }
                                    });
                                mysqlCount++;

                                // console.log(jsonObj);
                                if(mysqlCount===results.length) {
                                    console.log("Before CB in Hotel");
                                    response.status=200;
                                    callback(null, response);
                                }

                            }

                            // console.log("mysqlCount : "+mysqlCount);
                        });
                    });
                }
            }
        }, fetchQuery);
    }
    catch (e){
        console.log(e);
        callback(e, response);
    }
});

fetchCityByCars  = ((jsonObj, callback)=>{
    let response = {
        status : 400
    };
    try{

        let fetchQuery = "select carId, SUM(totalAmount) as 'totalRevenue' " +
            "from host as h " +
            "join " +
            "carbooking as cb " +
            "on h.hostId = cb.hostId " +
            "where h.serviceType='car' " +
            "group by carId;";

        mysql.fetchData(function (err, results) {
            if(err){
                console.log(err);
                callback(null, results);
            }
            else {
                // let jsonObj = [];
                // console.log(results);
                if(results.length>0){
                    let mysqlCount=0;
                    results.map((mysqlresult)=>{
                        Car.find({_id : ObjectId(mysqlresult.carId)},{city:1}, function (err, results1) {
                            // console.log(results1);
                            let cityExists = false;
                            let jsoncount = 0;
                            if(jsonObj.length>0){
                                jsonObj.map((obj)=>{
                                    // console.log(obj);
                                    if(obj.city===results1[0].city){
                                        obj.totalRevenue.car = obj.totalRevenue.car + mysqlresult.totalRevenue;
                                        console.log(obj);
                                        cityExists = true;
                                    }
                                    jsoncount ++;
                                    if(jsoncount===jsonObj.length){
                                        // console.log("JSON COunt : " + jsoncount);
                                        mysqlCount++;
                                        if(!cityExists){
                                            console.log("City does not exist" + cityExists);
                                            jsonObj.push(
                                                {
                                                    city:results1[0].city,
                                                    totalRevenue:{
                                                        hotel : 0,
                                                        flight : 0,
                                                        car : mysqlresult.totalRevenue
                                                    }
                                                })
                                        }
                                    }
                                    // console.log("JSON Count : " + jsoncount);
                                    // console.log(jsonObj);
                                    if(mysqlCount===results.length){
                                        console.log("Before CB in Car");
                                        console.log(jsonObj);
                                        response.status=200;
                                        callback(null, response);
                                    }
                                });
                            }
                            else {
                                jsonObj.push(
                                    {
                                        city:results1[0].city,
                                        totalRevenue:{
                                            hotel : 0,
                                            flight : 0,
                                            car : mysqlresult.totalRevenue
                                        }
                                    });
                                mysqlCount++;
                                // console.log(jsonObj);
                                if(mysqlCount===results.length){
                                    console.log("Before CB in Car");
                                    console.log(jsonObj);
                                    response.status=200;
                                    callback(null, response);
                                }
                            }

                            // console.log("mysqlCount : "+mysqlCount);
                        });
                    });
                }
            }
        }, fetchQuery);
    }
    catch (e){
        console.log(e);
        callback(e, response);
    }
});

fetchCityByFlights  = ((jsonObj, callback)=>{
    let response = {
        status : 400
    };
    try{

        let fetchQuery = "select flightId, SUM(totalAmount) as 'totalRevenue' " +
            "from host as h " +
            "join " +
            "flightbooking as fb " +
            "on h.hostId = fb.hostId " +
            "where h.serviceType='flight' " +
            "group by flightId;";

        mysql.fetchData(function (err, results) {
            if(err){
                console.log(err);
                callback(null, results);
            }
            else {
                // let jsonObj = [];
                // console.log(results);
                if(results.length>0){
                    let mysqlCount=0;
                    results.map((mysqlresult)=>{
                        Flight.find({_id : ObjectId(mysqlresult.flightId)},{origin:1}, function (err, results1) {
                            // console.log("results1");
                            // console.log(results1);
                            let cityExists = false;
                            let jsoncount = 0;
                            if(jsonObj.length>0){
                                jsonObj.map((obj)=>{
                                    // console.log(obj);
                                    if(obj.city===results1[0].origin){
                                        console.log(typeof (obj.totalRevenue.flight));
                                        obj.totalRevenue.flight = obj.totalRevenue.flight + mysqlresult.totalRevenue;
                                        console.log(obj);
                                        cityExists = true;
                                    }
                                    jsoncount ++;
                                    if(jsoncount===jsonObj.length){
                                        // console.log("JSON COunt : " + jsoncount);
                                        mysqlCount++;
                                        if(!cityExists){
                                            console.log("City does not exist" + cityExists);
                                            jsonObj.push(
                                                {
                                                    city:results1[0].origin,
                                                    totalRevenue:{
                                                        hotel : 0,
                                                        car : 0,
                                                        flight : mysqlresult.totalRevenue
                                                    }
                                                })
                                        }
                                    }
                                    // console.log("JSON Count : " + jsoncount);
                                    // console.log(jsonObj);
                                    if(mysqlCount===results.length){
                                        console.log("Before CB in Flight");
                                        console.log(jsonObj);
                                        response.status=200;
                                        callback(null, response);
                                    }
                                });
                            }
                            else {
                                jsonObj.push(
                                    {
                                        city:results1[0].origin,
                                        totalRevenue:{
                                            hotel : 0,
                                            car : 0,
                                            flight : mysqlresult.totalRevenue
                                        }
                                    });
                                mysqlCount++;
                                // console.log(jsonObj);
                                if(mysqlCount===results.length){
                                    console.log("Before CB in Flight");
                                    console.log(jsonObj);
                                    response.status=200;
                                    callback(null, response);
                                }
                            }
                            // console.log("mysqlCount : "+mysqlCount);
                        });
                    });
                }
            }
        }, fetchQuery);
    }
    catch (e){
        console.log(e);
        callback(e, response);
    }
});


exports.handle_request = handle_request;
