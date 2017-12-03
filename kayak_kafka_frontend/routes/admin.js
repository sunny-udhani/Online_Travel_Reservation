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

router.post('/dashboard', function(req, res, next) {
    console.log(req.session.username);
    let username = req.session.username;
    //Uncomment when Session issue is resolved
    // if(req.session.username!==null && req.session.username!==undefined){
    console.log(req.body);

    kafka.make_request(req_topic_enums.GET_CHART_DATA, req.body, function(err,results){
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

router.post('/fetchHosts', function(req, res, next) {
    console.log(req.session.username);
    let username = req.session.username;
    //Uncomment when Session issue is resolved
    // if(req.session.username!==null && req.session.username!==undefined){
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
    // }
    // else {
    //
    // }

    // res.send('respond with a resource');
});

router.post('/addHost', function(req, res, next) {
    console.log(req.session.username);
    let username = req.session.username;
    //Uncomment when Session issue is resolved
    // if(req.session.username!==null && req.session.username!==undefined){
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
    // }
    // else {
    //
    // }

    // res.send('respond with a resource');
});

router.post('/modifyHost', function(req, res, next) {
    console.log(req.session.username);
    let username = req.session.username;
    //Uncomment when Session issue is resolved
    // if(req.session.username!==null && req.session.username!==undefined){
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
    // }
    // else {
    //
    // }

    // res.send('respond with a resource');
});

router.post('/fetchUsers', function(req, res, next) {
    console.log(req.session.username);
    let username = req.session.username;
    //Uncomment when Session issue is resolved
    // if(req.session.username!==null && req.session.username!==undefined){
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
    // }
    // else {
    //
    // }

    // res.send('respond with a resource');
});


router.post('/modifyUsers', function(req, res, next) {
    console.log(req.session.username);
    let username = req.session.username;
    //Uncomment when Session issue is resolved
    // if(req.session.username!==null && req.session.username!==undefined){
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
    // }
    // else {
    //
    // }

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
            res.status(203).end();
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


module.exports = router;
