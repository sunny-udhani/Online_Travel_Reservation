const express = require('express');
//const logger = require('../config/winstonLogger');
const redis_client = require("../config/redisConnect").getClient();
const router = express.Router();
const req_topic_enums = require('../config/topic_enum').req_topic_names;
const kafka = require('./kafka/client');
/* GET users listing. */
router.post('/', function (req, res, next) {
    res.send('respond with a resource');
    next();
});

router.post('/getHotels', function (req, res) {
    try {
        if (req.body.criteria) {

            //logger.info({for: 'Hotel Listing request', data : {user: (req.session.username? req.session.username : "potential customer"), url_clicked: '/listings/hotels'}});
            redis_client.hget(req.body.criteria.toString(), req.body.criteria.toString(), function (err, reply) {

                if (err) {

                    console.log(err);
                    console.log("error in hget");
                    res.status(400).send();

                } else {
                    if (reply) {

                        console.log(JSON.parse(reply));
                        console.log("reply from cache");
                        //send data if we get from cache - redis
                        res.status(200).send(JSON.parse(reply));

                    } else {

                        //kafka request - no data found from cache
                        kafka.make_request(req_topic_enums.HOTEL_LISTING, req.body, function (err, results) {

                            console.log('in result');

                            console.log(results.data);

                            if (err) {
                                console.log(err);
                                throw err;
                            }

                            else {
                                if (results.status === 200) {

                                    redis_client.hset(req.body.criteria.toString(), req.body.criteria.toString(), JSON.stringify(results.data), function (err, reply) {

                                        if (err) {

                                            console.log(err);
                                            console.log("error on hset");

                                            redis_client.hdel(req.body.criteria.toString(), req.body.criteria.toString(), function (err, reply) {

                                                console.log(err);
                                                console.log("error on delete");
                                                console.log(reply);
                                                console.log("reply for delete");

                                            })
                                        }

                                        else {
                                            console.log("successfully set cache entry");
                                            redis_client.expire(req.body.criteria.toString(), 30);
                                            res.status(results.status).send(results.data);
                                        }

                                    });

                                }
                                else if (results.status === 400) {
                                    res.status(results.status).send();
                                }
                            }
                        });
                    }
                }
            })
        }

        // kafka.make_request(req_topic_enums.HOTEL_LISTING, req.body, function (err, results) {
        //     console.log('in result');
        //     console.log(results.data);
        //     if (err) {
        //         console.log(err);
        //         throw err;
        //     }
        //     else {
        //         if (results.status === 200) {
        //             redis_client.hset(req.body.criteria.toString(), req.body.criteria.toString(), JSON.stringify(results.data), function (err, reply) {
        //                 if (err) {
        //
        //                     console.log(err);
        //                     console.log("error on hset");
        //                     redis_client.del(req.body.criteria.toString(), req.body.criteria.toString(), function (err, reply) {
        //                         console.log(err);
        //                         console.log("error on delete");
        //                         console.log(reply);
        //                         console.log("reply for delete");
        //                     })
        //                 }
        //                 else {
        //                     res.status(results.status).send(results.data);
        //                 }
        //             });
        //         }
        //         else if (results.status === 400) {
        //             res.status(results.status).send();
        //         }
        //     }
        // });
    }
    catch (e) {
        console.log(e);
        res.status(400).json({message: "search Failed"});
    }
});

router.post('/getFlights', function (req, res) {
    try {

        if (req.body.criteria) {

            logger.info({for: 'Flight Listing request', data : {user: (req.session.username? req.session.username : "potential customer"), searchCriteria: req.body.criteria,  url_clicked: '/listings/flights'}});
            redis_client.hget(req.body.criteria.toString(), req.body.criteria.toString(), function (err, reply) {

                if (err) {

                    console.log(err);
                    console.log("error in hget");
                    res.status(400).send();

                } else {
                    if (reply) {

                        console.log(JSON.parse(reply));
                        console.log("reply from cache");
                        //send data if we get from cache - redis
                        res.status(200).send(JSON.parse(reply));

                    } else {

                        //kafka request - no data found from cache
                        kafka.make_request(req_topic_enums.FLIGHT_LISTING, req.body, function (err, results) {

                            console.log('in result');

                            console.log(results.data);

                            if (err) {
                                console.log(err);
                                throw err;
                            }

                            else {
                                if (results.status === 200) {

                                    redis_client.hset(req.body.criteria.toString(), req.body.criteria.toString(), JSON.stringify(results.data), function (err, reply) {

                                        if (err) {

                                            console.log(err);
                                            console.log("error on hset");

                                            redis_client.hdel(req.body.criteria.toString(), req.body.criteria.toString(), function (err, reply) {

                                                console.log(err);
                                                console.log("error on delete");
                                                console.log(reply);
                                                console.log("reply for delete");

                                            })
                                        }

                                        else {
                                            console.log("successfully set cache entry");
                                            redis_client.expire(req.body.criteria.toString(), 30);
                                            res.status(results.status).send(results.data);
                                        }

                                    });

                                }
                                else if (results.status === 400) {
                                    res.status(results.status).send();
                                }
                            }
                        });
                    }
                }
            })
        }

    }
    catch (e) {
        console.log(e);
        res.status(400).json({message: "search Failed"});
    }
});

logItPro = function () {

}

module.exports = router;
