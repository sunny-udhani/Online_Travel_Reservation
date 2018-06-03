let express = require('express');
let router = express.Router();
let kafka = require('./kafka/client');
const req_topic_enums = require('../config/topic_enum').req_topic_names;

/* GET users listing. */
try{


    router.get('/', function(req, res, next) {
        res.send('respond with a resource');
    });

    router.post('/addFlightData', function(req, res, next) {
        console.log(req.session.username);
        let username = req.session.username;
        //Uncomment when Session issue is resolved
        if(req.session.username!==null && req.session.username!==undefined){
            console.log(req.body);

            kafka.make_request(req_topic_enums.ADD_FLIGHT, req.body, function(err,results){
                if(err){
                    console.log(err);
                }
                else
                {
                    console.log(results);
                    if(results.status === 200){
                        console.log("Local username: "+ username);
                        res.status(results.status).send(results.data);
                    }
                    else if(results.status === 201){
                        console.log("Local username: "+ username);
                        res.status(results.status).end();
                    }
                    else {
                        res.status(results.status).end();
                    }
                }
            });

        }
        else {
            console.log("Session does not exist");
            res.status(401).end();
        }
    });

    router.post('/addHotel', function(req, res, next) {
        try {
            console.log(req.session.username);
            let username = req.session.username;
            //Uncomment when Session issue is resolved
            if(req.session.username!==null && req.session.username!==undefined){
                console.log(req.body);

                kafka.make_request(req_topic_enums.ADD_HOTEL, req.body, function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(results);
                        if (results.status === 200) {
                            console.log("Local username: " + username);
                            res.status(results.status).send(results.data);
                        }
                        else if (results.status === 400) {
                            console.log("Local username: " + username);
                            res.status(results.status).end();
                        }
                        else {
                            res.status(results.status).end();
                        }
                    }
                });
            }
            else {
                console.log("Session does not exist");
                res.status(401).end();
            }
        }
        catch (e){
            console.log(e);
            res.status(500).end();
        }
        // res.send('respond with a resource');
    });

    router.post('/fetchHotels', function(req, res, next) {
        console.log(req.session.username);
        let username = req.session.username;
        //Uncomment when Session issue is resolved
        if(req.session.username!==null && req.session.username!==undefined){
            console.log(req.body);

            kafka.make_request(req_topic_enums.FETCH_HOTELS, req.body, function(err,results){
                if(err){
                    console.log(err);
                }
                else
                {
                    console.log(results);
                    if(results.status === 200){
                        console.log("Local username: "+ username);
                        res.status(results.status).send(results.data);
                    }
                    else if(results.status === 400){
                        console.log("Local username: "+ username);
                        res.status(results.status).end();
                    }
                    else {
                        res.status(results.status).end();
                    }
                }
            });
        }
        else {
            console.log("Session does not exist");
            res.status(401).end();
        }

        // res.send('respond with a resource');
    });

    router.post('/addRoomInHotel', function(req, res, next) {
        console.log(req.session.username);
        let username = req.session.username;
        //Uncomment when Session issue is resolved
        if(req.session.username!==null && req.session.username!==undefined){
            console.log(req.body);

            kafka.make_request(req_topic_enums.CHANGE_ROOMS, req.body, function(err,results){
                if(err){
                    console.log(err);
                }
                else
                {
                    console.log(results);
                    if(results.status === 200){
                        console.log("Local username: "+ username);
                        res.status(results.status).send(results.data);
                    }
                    else if(results.status === 400){
                        console.log("Local username: "+ username);
                        res.status(results.status).end();
                    }
                    else {
                        res.status(results.status).end();
                    }
                }
            });
        }
        else {
            console.log("Session does not exist");
            res.status(401).end();
        }

        // res.send('respond with a resource');
    });

    router.post('/fetchFlights', function(req, res, next) {
        console.log(req.session.username);
        let username = req.session.username;
        //Uncomment when Session issue is resolved
        if(req.session.username!==null && req.session.username!==undefined){
            console.log(req.body);

            kafka.make_request(req_topic_enums.FETCH_FLIGHTS, req.body, function(err,results){
                if(err){
                    console.log(err);
                }
                else
                {
                    console.log(results);
                    if(results.status === 200){
                        console.log("Local username: "+ username);
                        res.status(results.status).send(results.data);
                    }
                    else if(results.status === 400){
                        console.log("Local username: "+ username);
                        res.status(results.status).end();
                    }
                    else {
                        res.status(results.status).end();
                    }
                }
            });
        }
        else {
            console.log("Session does not exist");
            res.status(401).end();
        }

        // res.send('respond with a resource');
    });

    router.post('/modifyHotel', function(req, res, next) {
        console.log(req.session.username);
        let username = req.session.username;
        //Uncomment when Session issue is resolved
        if(req.session.username!==null && req.session.username!==undefined){
            console.log(req.body);

            kafka.make_request(req_topic_enums.MODIFY_HOTEL, req.body, function(err,results){
                if(err){
                    console.log(err);
                }
                else
                {
                    console.log(results);
                    if(results.status === 200){
                        console.log("Local username: "+ username);
                        res.status(results.status).send(results.data);
                    }
                    else if(results.status === 300){
                        console.log("Local username: "+ username);
                        res.status(results.status).end();
                    }
                    else if(results.status === 400){
                        console.log("Local username: "+ username);
                        res.status(results.status).end();
                    }
                    else {
                        res.status(results.status).end();
                    }
                }
            });
        }
        else {
            console.log("Session does not exist");
            res.status(401).end();
        }

        // res.send('respond with a resource');
    });

    router.post('/logAnalyticsData', function(req, res, next) {
        // console.log(req.session.username);
        let username = req.session.username;
        //Uncomment when Session issue is resolved
        if(req.session.username!==null && req.session.username!==undefined){
            // console.log(req.body);

            let cond = true;

            let temp = {};

            let logs = [];

            require('fs').readFileSync('../kayak_kafka_frontend/log/analytics.log').toString().split('\r').forEach(function (line) {
                if(cond){
                    temp = line.split('\n')[0];
                    cond = false;
                }
                else{
                    temp = line.split('\n')[1];
                }
                if(temp === ""){
                    // for last line of file -- do nothing
                }
                else{
                    let a = JSON.parse(temp);
                    logs.push(a.message);
                }
            });

            // console.log(logs.length);
            //
            console.log(logs);

            // perform nested kafka calls first for index generation and second for analytics

            kafka.make_request(req_topic_enums.LOG_ANALYTICS_DATA, logs, function(err,results){
                if(err){
                    console.log(err);
                }
                else
                {
                    // let clk = {UserProfile: results.pageClicks.UserProfile};
                    console.log(results.analytics.pageClicks.UserProfile);
                    if(results.status === 200){
                        res.status(results.status).send(results.analytics);
                    }
                    else if(results.status === 400){
                        console.log("Local username: "+ username);
                        res.status(results.status).end();
                    }
                }
            });
        }
        else {
            console.log("Session does not exist");
            res.status(401).end();
        }

        // res.send('respond with a resource');
    });

    router.post('/top10Properties', function(req, res, next) {
        // console.log(req.session.username);
        let username = req.session.username;
        //Uncomment when Session issue is resolved
        if(req.session.username!==null && req.session.username!==undefined){
            // console.log(req.body);

            kafka.make_request(req_topic_enums.TOP_10_PROPERTIES, " ", function(err,results){
                if(err){
                    console.log(err);
                }
                else
                {
                    console.log(results.analytics.Hotel.labels);
                    console.log(results.analytics.Hotel.data);
                    console.log(results.analytics.Flight.labels);
                    console.log(results.analytics.Flight.data);
                    console.log(results.analytics.Car.labels);
                    console.log(results.analytics.Car.data);

                    if(results.status === 200){
                        res.status(results.status).send(results.analytics);
                    }
                    else if(results.status === 400){
                        console.log("Local username: "+ username);
                        res.status(results.status).end();
                    }
                }
            });
        }
        else {
            console.log("Session does not exist");
            res.status(401).end();
        }
    });

    router.post('/top10Hosts', function(req, res, next) {
        // console.log(req.session.username);
        let username = req.session.username;
        //Uncomment when Session issue is resolved
        if(req.session.username!==null && req.session.username!==undefined){
            // console.log(req.body);

            kafka.make_request(req_topic_enums.TOP_10_HOSTS, " ", function(err,results){
                if(err){
                    console.log(err);
                }
                else
                {
                    let label= [];
                    let data= [];
                    let analytics = {
                        top10Hosts:
                            {
                                label: [],
                                data: []
                            }
                    };
                    let temp = results.analytics.top10Hosts;
                    temp.forEach((result)=>{
                        console.log(" Label --- "+result.label);
                        console.log(" Label --- "+result.data);
                        label.push(result.label);
                        data.push(result.data);
                    });
                    // let clk = {UserProfile: results.pageClicks.UserProfile};
                    analytics.top10Hosts.label = label;
                    analytics.top10Hosts.data = data;
                    console.log(" Label - "+analytics.top10Hosts.label[0]+"   "+" Data - "+analytics.top10Hosts.data[0]);
                    if(results.status === 200){
                        res.status(results.status).send(analytics);
                    }
                    else if(results.status === 400){
                        console.log("Local username: "+ username);
                        res.status(results.status).end();
                    }
                }
            });
        }
        else {
            console.log("Session does not exist");
            res.status(401).end();
        }
    });

    router.post('/cityWiseRevenue', function(req, res, next) {
        try{

            // console.log(req.session.username);
            let username = req.session.username;
            //Uncomment when Session issue is resolved
            if(req.session.username!==null && req.session.username!==undefined){
                // console.log(req.body);

                kafka.make_request(req_topic_enums.CITY_WISE_REVENUE, " ", function(err,results){
                    if(err){
                        console.log(err);
                    }
                    else
                    {
                        // let clk = {UserProfile: results.pageClicks.UserProfile};
                        // console.log(results.analytics.pageClicks.UserProfile);
                        console.log(results);
                        if(results.status === 200){
                            res.status(results.status).send(results.data);
                        }
                        else if(results.status === 400){
                            console.log("Local username: "+ username);
                            res.status(results.status).end();
                        }
                    }
                });
            }
            else {
                console.log("Session does not exist");
                res.status(401).end();
            }
        }
        catch (e){
            console.log(e);
        }
    });

    router.post('/reviewsOnProperties', function(req, res, next) {
        // console.log(req.session.username);
        let username = req.session.username;
        //Uncomment when Session issue is resolved
        if(req.session.username!==null && req.session.username!==undefined){
            // console.log(req.body);

            kafka.make_request(req_topic_enums.REVIEWS_ON_PROPERTIES, " ", function(err,results){
                if(err){
                    console.log(err);
                }
                else
                {
                    // let clk = {UserProfile: results.pageClicks.UserProfile};
                    console.log("Data - "+results.analytics.reviewsOnProperties.data);
                    console.log("Label - "+results.analytics.reviewsOnProperties.labels);
                    if(results.status === 200){
                        res.status(results.status).send(results.analytics);
                    }
                    else if(results.status === 400){
                        console.log("Local username: "+ username);
                        res.status(results.status).end();
                    }
                }
            });
        }
        else {
            console.log("Session does not exist");
            res.status(401).end();
        }
    });

    router.post('/modifyFlight', function(req, res, next) {
        console.log(req.session.username);
        let username = req.session.username;
        //Uncomment when Session issue is resolved
        if(req.session.username!==null && req.session.username!==undefined){
            console.log(req.body);

            kafka.make_request(req_topic_enums.MODIFY_FLIGHT, req.body, function(err,results){
                if(err){
                    console.log(err);
                }
                else
                {
                    console.log(results);
                    if(results.status === 200){
                        console.log("Local username: "+ username);
                        res.status(results.status).send(results.data);
                    }
                    else if(results.status === 300){
                        console.log("Local username: "+ username);
                        res.status(results.status).end();
                    }
                    else if(results.status === 400){
                        console.log("Local username: "+ username);
                        res.status(results.status).end();
                    }
                    else {
                        res.status(results.status).end();
                    }
                }
            });
        }
        else {
            console.log("Session does not exist");
            res.status(401).end();
        }

        // res.send('respond with a resource');
    });

    router.post('/modifyFlightClass', function(req, res, next) {
        console.log(req.session.username);
        let username = req.session.username;
        //Uncomment when Session issue is resolved
        if(req.session.username!==null && req.session.username!==undefined){
            console.log(req.body);

            kafka.make_request(req_topic_enums.MODIFY_FLIGHTCLASS, req.body, function(err,results){
                if(err){
                    console.log(err);
                }
                else
                {
                    console.log(results);
                    if(results.status === 200){
                        console.log("Local username: "+ username);
                        res.status(results.status).send(results.data);
                    }
                    else if(results.status === 300){
                        console.log("Local username: "+ username);
                        res.status(results.status).end();
                    }
                    else if(results.status === 400){
                        console.log("Local username: "+ username);
                        res.status(results.status).end();
                    }
                    else {
                        res.status(results.status).end();
                    }
                }
            });
        }
        else {
            console.log("Session does not exist");
            res.status(401).end();
        }

        // res.send('respond with a resource');
    });

    router.post('/fetchCars', function(req, res, next) {
        console.log(req.session.username);
        let username = req.session.username;
        //Uncomment when Session issue is resolved
        if(req.session.username!==null && req.session.username!==undefined){
            console.log(req.body);

            kafka.make_request(req_topic_enums.FETCH_CARS, req.body, function(err,results){
                if(err){
                    console.log(err);
                }
                else
                {
                    console.log(results);
                    if(results.status === 200){
                        console.log("Local username: "+ username);
                        res.status(results.status).send(results.data);
                    }
                    else if(results.status === 400){
                        console.log("Local username: "+ username);
                        res.status(results.status).end();
                    }
                    else {
                        res.status(results.status).end();
                    }
                }
            });
        }
        else {
            console.log("Session does not exist");
            res.status(401).end();
        }

        // res.send('respond with a resource');
    });

    router.post('/addCar', function(req, res, next) {
        console.log(req.session.username);
        let username = req.session.username;
        //Uncomment when Session issue is resolved
        try{

            if(req.session.username!==null && req.session.username!==undefined){
                console.log(req.body);

                kafka.make_request(req_topic_enums.ADD_CAR, req.body, function(err,results){
                    if(err){
                        console.log(err);
                    }
                    else
                    {
                        console.log(results);
                        if(results.status === 200){
                            console.log("Local username: "+ username);
                            res.status(results.status).send(results.data);
                        }
                        else if(results.status === 400){
                            console.log("Local username: "+ username);
                            res.status(results.status).end();
                        }
                        else {
                            res.status(results.status).end();
                        }
                    }
                });
            }
            else {
                console.log("Session does not exist");
                res.status(401).end();
            }
        }
        catch (e){
            console.log(e);
        }
        // res.send('respond with a resource');
    });

    router.post('/modifyCar', function(req, res, next) {
        console.log(req.session.username);
        let username = req.session.username;
        //Uncomment when Session issue is resolved
        if(req.session.username!==null && req.session.username!==undefined){
            console.log(req.body);

            kafka.make_request(req_topic_enums.MODIFY_CAR, req.body, function(err,results){
                if(err){
                    console.log(err);
                }
                else
                {
                    console.log(results);
                    if(results.status === 200){
                        console.log("Local username: "+ username);
                        res.status(results.status).send(results.data);
                    }
                    else if(results.status === 400){
                        console.log("Local username: "+ username);
                        res.status(results.status).end();
                    }
                    else {
                        res.status(results.status).end();
                    }
                }
            });
        }
        else {
            console.log("Session does not exist");
            res.status(401).end();
        }

        // res.send('respond with a resource');
    });

    router.post('/fetchHosts', function(req, res, next) {
        console.log(req.session.username);
        let username = req.session.username;
        //Uncomment when Session issue is resolved
        if(req.session.username!==null && req.session.username!==undefined){
            console.log(req.body);

            kafka.make_request(req_topic_enums.FETCH_HOSTS, req.body, function(err,results){
                if(err){
                    console.log(err);
                }
                else
                {
                    console.log(results);
                    if(results.status === 200){
                        console.log("Local username: "+ username);
                        res.status(results.status).send(results.data);
                    }
                    else if(results.status === 204){
                        console.log("Local username: "+ username);
                        res.status(results.status).end();
                    }
                    else if(results.status === 400){
                        console.log("Local username: "+ username);
                        res.status(results.status).end();
                    }
                    else {
                        res.status(results.status).end(results);
                    }
                }
            });
        }
        else {
            console.log("Session does not exist");
            res.status(401).end();
        }
        // res.send('respond with a resource');
    });

    router.post('/addHost', function(req, res, next) {
        console.log(req.session.username);
        let username = req.session.username;
        //Uncomment when Session issue is resolved
        if(req.session.username!==null && req.session.username!==undefined){
            console.log(req.body);

            kafka.make_request(req_topic_enums.ADD_HOST, req.body, function(err,results){
                if(err){
                    console.log(err);
                }
                else
                {
                    console.log(results);
                    if(results.status === 200){
                        console.log("Local username: "+ username);
                        res.status(results.status).send(results.data);
                    }
                    else if(results.status === 400){
                        console.log("Local username: "+ username);
                        res.status(results.status).end();
                    }
                    else {
                        res.status(results.status).end();
                    }
                }
            });
        }
        else {
            console.log("Session does not exist");
            res.status(401).end();
        }

        // res.send('respond with a resource');
    });

    router.post('/modifyHost', function(req, res, next) {
        console.log(req.session.username);
        let username = req.session.username;
        //Uncomment when Session issue is resolved
        if(req.session.username!==null && req.session.username!==undefined){
            console.log(req.body);

            kafka.make_request(req_topic_enums.MODIFY_HOST, req.body, function(err,results){
                if(err){
                    console.log(err);
                }
                else
                {
                    console.log(results);
                    if(results.status === 200){
                        console.log("Local username: "+ username);
                        res.status(results.status).send(results.data);
                    }
                    else if(results.status === 400){
                        console.log("Local username: "+ username);
                        res.status(results.status).send(results.data);
                    }
                    else if(results.status === 300){
                        console.log("Local username: "+ username);
                        res.status(results.status).send(results.data);
                    }
                    else if(results.status === 204){
                        console.log("Local username: "+ username);
                        res.status(results.status).send(results.data);
                    }
                    else {
                        res.status(results.status).end();
                    }
                }
            });
        }
        else {
            console.log("Session does not exist");
            res.status(401).end();
        }

        // res.send('respond with a resource');
    });

    router.post('/fetchUsers', function(req, res, next) {
        console.log(req.session.username);
        let username = req.session.username;
        //Uncomment when Session issue is resolved
        if(req.session.username!==null && req.session.username!==undefined){
            console.log(req.body);

            kafka.make_request(req_topic_enums.FETCH_USERS, req.body, function(err,results){
                if(err){
                    console.log(err);
                }
                else
                {
                    console.log(results);
                    if(results.status === 200){
                        console.log("Local username: "+ username);
                        res.status(results.status).send(results.data);
                    }
                    else if(results.status === 400){
                        console.log("Local username: "+ username);
                        res.status(results.status).send(results.data);
                    }
                    else if(results.status === 300){
                        console.log("Local username: "+ username);
                        res.status(results.status).send(results.data);
                    }
                    else if(results.status === 204){
                        console.log("Local username: "+ username);
                        res.status(results.status).send(results.data);
                    }
                    else {
                        res.status(results.status).end();
                    }
                }
            });
        }
        else {
            console.log("Session does not exist");
            res.status(401).end();
        }

        // res.send('respond with a resource');
    });

    router.post('/modifyUsers', function(req, res, next) {
        console.log(req.session.username);
        let username = req.session.username;
        //Uncomment when Session issue is resolved
        if(req.session.username!==null && req.session.username!==undefined){
            console.log(req.body);

            kafka.make_request(req_topic_enums.MODIFY_USERS, req.body, function(err,results){
                if(err){
                    console.log(err);
                }
                else
                {
                    console.log(results);
                    if(results.status === 200){
                        console.log("Local username: "+ username);
                        res.status(results.status).send(results.data);
                    }
                    else if(results.status === 400){
                        console.log("Local username: "+ username);
                        res.status(results.status).send(results.data);
                    }
                    else if(results.status === 300){
                        console.log("Local username: "+ username);
                        res.status(results.status).send(results.data);
                    }
                    else if(results.status === 204){
                        console.log("Local username: "+ username);
                        res.status(results.status).send(results.data);
                    }
                    else {
                        res.status(results.status).end();
                    }
                }
            });
        }
        else {
            console.log("Session does not exist");
            res.status(401).end();
        }
        // res.send('respond with a resource');
    });

    router.post('/fetchProfile', function(req, res, next) {
        console.log("Session");
        console.log(req.session.username);
        try{
            if(req.session.username!==null && req.session.username!==undefined){
                req.body.username = req.session.username;
                console.log(req.body);
                kafka.make_request(req_topic_enums.FETCH_USERPROFILE, req.body, function(err,results){
                    if(err){
                        console.log(err);
                    }
                    else
                    {
                        console.log(results);
                        if(results.status === 200){
                            res.status(results.status).send(results.data);
                        }
                        else if(results.status === 400){
                            res.status(results.status).send(results.data);
                        }
                        else if(results.status === 204){
                            res.status(results.status).send(results.data);
                        }
                        else {
                            console.log(results);
                            res.status(results.status).end();
                        }
                    }
                });
            }
            else {
                console.log("Session does not exist");
                res.status(401).end();
            }
        }
        catch (e){
            console.log(e);
        }

    });

    router.post('/validateAdminSession', function (req, res) {
        console.log(req.session.username);
        if (req.session.username !== null && req.session.username !== undefined && req.session.username === "admin") {
            res.status(200).send({"username": req.session.username});
        }
        else {
            res.status(204).end();
        }
    });

    router.post('/fetchHotelBookings', function(req, res, next) {
        console.log("Session");
        console.log(req.session.username);
        try{
            if(req.session.username!==null && req.session.username!==undefined){
                console.log(req.body);
                kafka.make_request(req_topic_enums.FETCH_HOTELBOOKINGS, req.body, function(err,results){
                    if(err){
                        console.log(err);
                    }
                    else
                    {
                        console.log(results);
                        if(results.status === 200){
                            res.status(results.status).send(results.data);
                        }
                        else if(results.status === 400){
                            res.status(results.status).send(results.data);
                        }
                        else if(results.status === 204){
                            res.status(results.status).send(results.data);
                        }
                        else {
                            console.log(results);
                            res.status(results.status).end();
                        }
                    }
                });
            }
            else {
                console.log("Session does not exist");
                res.status(401).end();
            }
        }
        catch (e){
            console.log(e);
        }

    });

    router.post('/fetchCarBookings', function(req, res, next) {
        console.log("Session");
        console.log(req.session.username);
        try{
            if(req.session.username!==null && req.session.username!==undefined){
                console.log(req.body);
                kafka.make_request(req_topic_enums.FETCH_CARBOOKINGS, req.body, function(err,results){
                    if(err){
                        console.log(err);
                    }
                    else
                    {
                        console.log(results);
                        if(results.status === 200){
                            res.status(results.status).send(results.data);
                        }
                        else if(results.status === 400){
                            res.status(results.status).send(results.data);
                        }
                        else if(results.status === 204){
                            res.status(results.status).send(results.data);
                        }
                        else {
                            console.log(results);
                            res.status(results.status).end();
                        }
                    }
                });
            }
            else {
                console.log("Session does not exist");
                res.status(401).end();
            }
        }
        catch (e){
            console.log(e);
        }

    });

    router.post('/fetchFlightBookings', function(req, res, next) {
        console.log("Session");
        console.log(req.session.username);
        try{
            if(req.session.username!==null && req.session.username!==undefined){
                console.log(req.body);
                kafka.make_request(req_topic_enums.FETCH_FLIGHTBOOKINGS, req.body, function(err,results){
                    if(err){
                        console.log(err);
                    }
                    else
                    {
                        console.log(results);
                        if(results.status === 200){
                            res.status(results.status).send(results.data);
                        }
                        else if(results.status === 400){
                            res.status(results.status).send(results.data);
                        }
                        else if(results.status === 204){
                            res.status(results.status).send(results.data);
                        }
                        else {
                            console.log(results);
                            res.status(results.status).end();
                        }
                    }
                });
            }
            else {
                console.log("Session does not exist");
                res.status(401).end();
            }
        }
        catch (e){
            console.log(e);
        }
    });

    router.post('/fetchUserTimePerPage', function(req, res, next) {
        console.log("Session");
        console.log(req.session.username);
        try{
            if(req.session.username!==null && req.session.username!==undefined){
                console.log(req.body);
                kafka.make_request(req_topic_enums.FETCH_USERTIMEPERPAGE, req.body, function(err,results){
                    if(err){
                        console.log(err);
                    }
                    else
                    {
                        console.log(results);
                        if(results.status === 200){
                            res.status(results.status).send(results.data);
                        }
                        else if(results.status === 400){
                            res.status(results.status).send(results.data);
                        }
                        else if(results.status === 204){
                            res.status(results.status).send(results.data);
                        }
                        else {
                            console.log(results);
                            res.status(results.status).end();
                        }
                    }
                });
            }
            else {
                console.log("Session does not exist");
                res.status(401).end();
            }
        }
        catch (e){
            console.log(e);
        }
    });

}
catch (e){
    console.log(e);
}
module.exports = router;
