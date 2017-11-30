let express = require('express');
let router = express.Router();
let kafka = require('./kafka/client');
const req_topic_enums = require('../config/topic_enum').req_topic_names;

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/addFlightData', function(req, res, next) {
    console.log(req.session.username);
    let username = req.session.username;
    //Uncomment when Session issue is resolved
    // if(req.session.username!==null && req.session.username!==undefined){
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
    // }
    // else {
    //
    // }

    // res.send('respond with a resource');
});


router.post('/addHotel', function(req, res, next) {
    console.log(req.session.username);
    let username = req.session.username;
    //Uncomment when Session issue is resolved
    // if(req.session.username!==null && req.session.username!==undefined){
    console.log(req.body);

    kafka.make_request(req_topic_enums.ADD_HOTEL, req.body, function(err,results){
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
    // }
    // else {
    //
    // }

    // res.send('respond with a resource');
});

router.post('/fetchHotels', function(req, res, next) {
    console.log(req.session.username);
    let username = req.session.username;
    //Uncomment when Session issue is resolved
    // if(req.session.username!==null && req.session.username!==undefined){
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
    // }
    // else {
    //
    // }

    // res.send('respond with a resource');
});


router.post('/addRoomInHotel', function(req, res, next) {
    console.log(req.session.username);
    let username = req.session.username;
    //Uncomment when Session issue is resolved
    // if(req.session.username!==null && req.session.username!==undefined){
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
    // }
    // else {
    //
    // }

    // res.send('respond with a resource');
});


router.post('/fetchFlights', function(req, res, next) {
    console.log(req.session.username);
    let username = req.session.username;
    //Uncomment when Session issue is resolved
    // if(req.session.username!==null && req.session.username!==undefined){
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
    // }
    // else {
    //
    // }

    // res.send('respond with a resource');
});


router.post('/modifyHotel', function(req, res, next) {
    console.log(req.session.username);
    let username = req.session.username;
    //Uncomment when Session issue is resolved
    // if(req.session.username!==null && req.session.username!==undefined){
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
    // }
    // else {
    //
    // }

    // res.send('respond with a resource');
});


router.post('/modifyFlight', function(req, res, next) {
    console.log(req.session.username);
    let username = req.session.username;
    //Uncomment when Session issue is resolved
    // if(req.session.username!==null && req.session.username!==undefined){
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
    // }
    // else {
    //
    // }

    // res.send('respond with a resource');
});

router.post('/modifyFlightClass', function(req, res, next) {
    console.log(req.session.username);
    let username = req.session.username;
    //Uncomment when Session issue is resolved
    // if(req.session.username!==null && req.session.username!==undefined){
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
    // }
    // else {
    //
    // }

    // res.send('respond with a resource');
});


router.post('/fetchCars', function(req, res, next) {
    console.log(req.session.username);
    let username = req.session.username;
    //Uncomment when Session issue is resolved
    // if(req.session.username!==null && req.session.username!==undefined){
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
    // }
    // else {
    //
    // }

    // res.send('respond with a resource');
});

router.post('/addCar', function(req, res, next) {
    console.log(req.session.username);
    let username = req.session.username;
    //Uncomment when Session issue is resolved
    // if(req.session.username!==null && req.session.username!==undefined){
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
    // }
    // else {
    //
    // }

    // res.send('respond with a resource');
});

router.post('/modifyCar', function(req, res, next) {
    console.log(req.session.username);
    let username = req.session.username;
    //Uncomment when Session issue is resolved
    // if(req.session.username!==null && req.session.username!==undefined){
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
    // }
    // else {
    //
    // }

    // res.send('respond with a resource');
});




module.exports = router;
