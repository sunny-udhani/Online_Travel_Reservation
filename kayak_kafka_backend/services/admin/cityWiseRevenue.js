let mysql = require('../../mysql/mysql');
let Hotel = require('../../Models/Hotel');
let Car = require('../../Models/Car');
let Flight = require('../../Models/Flight');
let ObjectId = require('mongodb').ObjectID;

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };
    let jsonObj = {
        hotel:[],
        car:[],
        flight:[]
    };
    try {
        console.log("City Wise Revenue");
        console.log(data);

        fetchCityByHotels(function (err, hotelObj) {
            if(err){
                console.log(err);
                callback(err, response);
            }
            else {
                console.log("hotelObj");
                console.log(hotelObj);
                jsonObj.hotel = hotelObj.data;
                fetchCityByCars(function (err, carObj) {
                    if(err){
                        console.log(err);
                        callback(err, response);
                    }
                    else {
                        console.log("carObj");
                        console.log(carObj);
                        jsonObj.car = carObj.data;
                        console.log(jsonObj);
                        fetchCityByFlights(function (err, flightObj) {
                            if(err) {
                                console.log(err);
                                callback(err, response);
                            }
                            else {
                                console.log("carObj");
                                console.log(flightObj);
                                jsonObj.flight = flightObj.data;
                                console.log("jsonObj : ");
                                console.log(jsonObj);
                                filterDataByCity(jsonObj, function (err, result) {
                                    if(err){
                                        console.log(err);
                                        callback(err, response);
                                    }
                                    else {
                                        response.status=200;
                                        response.data = jsonObj;
                                        callback(null, response)
                                    }
                                });

                            }
                        });
                    }

                });
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
                let jsonObj = [];
                let temp = {
                    city:"",
                    totalRevenue:0
                };
                console.log(results);
                if(results.length>0){
                    let mysqlCount=0;
                    results.map((mysqlresult)=>{
                        Hotel.find({_id : ObjectId(mysqlresult.hotelId)},{city:1}, function (err, results1) {
                            console.log(results1);
                            let cityExists = false;
                            let jsoncount = 0;
                            if(jsonObj.length>0){
                                jsonObj.map((obj)=>{
                                    console.log(obj);
                                    if(obj.city===results1[0].city){
                                        obj.totalRevenue = obj.totalRevenue + mysqlresult.totalRevenue;
                                        console.log(obj);
                                        cityExists = true;
                                    }
                                    jsoncount ++;
                                    if(jsoncount===jsonObj.length){
                                        console.log("JSON COunt : " + jsoncount);
                                        mysqlCount++;
                                        if(!cityExists){
                                            console.log("City does not exist" + cityExists);
                                            jsonObj.push(
                                                {
                                                    city:results1[0].city,
                                                    totalRevenue:mysqlresult.totalRevenue
                                                })
                                        }
                                    }
                                    console.log("JSON Count : " + jsoncount);
                                    console.log(jsonObj);
                                    if(mysqlCount===results.length){
                                        console.log("Final1");
                                        console.log(jsonObj);
                                        response.status=200;
                                        response.data = jsonObj;
                                        callback(null, response);
                                    }
                                });
                            }
                            else {
                                jsonObj.push(
                                    {
                                        city:results1[0].city,
                                        totalRevenue:mysqlresult.totalRevenue
                                    });
                                mysqlCount++;
                                console.log(jsonObj);
                            }
                            /*if(mysqlCount===results.length){
                                console.log("Final2");
                                console.log(jsonObj);
                                /!*response.status=200;
                                response.data = jsonObj;
                                callback(null, response);*!/
                            }*/
                            console.log("mysqlCount : "+mysqlCount);
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

fetchCityByCars  = ((callback)=>{
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
                let jsonObj = [];
                console.log(results);
                if(results.length>0){
                    let mysqlCount=0;
                    results.map((mysqlresult)=>{
                        Car.find({_id : ObjectId(mysqlresult.carId)},{city:1}, function (err, results1) {
                            console.log(results1);
                            let cityExists = false;
                            let jsoncount = 0;
                            if(jsonObj.length>0){
                                jsonObj.map((obj)=>{
                                    console.log(obj);
                                    if(obj.city===results1[0].city){
                                        obj.totalRevenue = obj.totalRevenue + mysqlresult.totalRevenue;
                                        console.log(obj);
                                        cityExists = true;
                                    }
                                    jsoncount ++;
                                    if(jsoncount===jsonObj.length){
                                        console.log("JSON COunt : " + jsoncount);
                                        mysqlCount++;
                                        if(!cityExists){
                                            console.log("City does not exist" + cityExists);
                                            jsonObj.push(
                                                {
                                                    city:results1[0].city,
                                                    totalRevenue:mysqlresult.totalRevenue
                                                })
                                        }
                                    }
                                    console.log("JSON Count : " + jsoncount);
                                    console.log(jsonObj);
                                    if(mysqlCount===results.length){
                                        console.log("Car Final1");
                                        console.log(jsonObj);
                                        response.status=200;
                                        response.data = jsonObj;
                                        callback(null, response);
                                    }
                                });
                            }
                            else {
                                jsonObj.push(
                                    {
                                        city:results1[0].city,
                                        totalRevenue:mysqlresult.totalRevenue
                                    });
                                mysqlCount++;
                                console.log(jsonObj);
                            }
                            /*if(mysqlCount===results.length){
                                console.log("Final2");
                                console.log(jsonObj);
                                /!*response.status=200;
                                response.data = jsonObj;
                                callback(null, response);*!/
                            }*/
                            console.log("mysqlCount : "+mysqlCount);
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

fetchCityByFlights  = ((callback)=>{
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
                let jsonObj = [];
                console.log(results);
                if(results.length>0){
                    let mysqlCount=0;
                    results.map((mysqlresult)=>{
                        Flight.find({_id : ObjectId(mysqlresult.flightId)},{origin:1}, function (err, results1) {
                            console.log("results1");
                            console.log(results1);
                            let cityExists = false;
                            let jsoncount = 0;
                            if(jsonObj.length>0){
                                jsonObj.map((obj)=>{
                                    console.log(obj);
                                    if(obj.city===results1[0].origin){
                                        obj.totalRevenue = obj.totalRevenue + mysqlresult.totalRevenue;
                                        console.log(obj);
                                        cityExists = true;
                                    }
                                    jsoncount ++;
                                    if(jsoncount===jsonObj.length){
                                        console.log("JSON COunt : " + jsoncount);
                                        mysqlCount++;
                                        if(!cityExists){
                                            console.log("City does not exist" + cityExists);
                                            jsonObj.push(
                                                {
                                                    city:results1[0].origin,
                                                    totalRevenue:mysqlresult.totalRevenue
                                                })
                                        }
                                    }
                                    console.log("JSON Count : " + jsoncount);
                                    console.log(jsonObj);
                                    if(mysqlCount===results.length){
                                        console.log("Car Final1");
                                        console.log(jsonObj);
                                        response.status=200;
                                        response.data = jsonObj;
                                        callback(null, response);
                                    }
                                });
                            }
                            else {
                                jsonObj.push(
                                    {
                                        city:results1[0].origin,
                                        totalRevenue:mysqlresult.totalRevenue
                                    });
                                mysqlCount++;
                                console.log(jsonObj);
                                if(mysqlCount===results.length){
                                    console.log("Final2");
                                    console.log(jsonObj);
                                    response.status = 200;
                                    response.data = jsonObj;
                                    callback(null, response);
                                }
                            }
                            console.log("mysqlCount : "+mysqlCount);
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
