const express = require('express');
const redis_client = require("../config/redisConnect").getClient();
const winston = require('../config/winston');
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

            let log = {
                propertyClick: {
                    userId: "anonymous",
                    propertyName: "Hotel",
                    url_clicked: '/listings/hotels',
                    date: new Date().getDate(),
                    month: new Date().getMonth(),
                    year: 1900 + new Date().getYear(),
                    timeStamp: new Date().toLocaleTimeString()
                }
            };
            if (req.session.username) {
                log.propertyClick.userId = req.session.username;
            }
            console.log(log);
            console.log("Log added - ");
            winston.info(log);
            //-----------------------------------------------------------------------------------

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
                                res.status(400).json({message: err});

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
                                                res.status(400).json({message: "search Failed"});

                                            })
                                        }

                                        else {
                                            console.log("successfully set cache entry");
                                            redis_client.expire(req.body.criteria.toString(), 300);
                                            res.status(results.status).send(results.data);
                                        }

                                    });

                                }
                                else if (results.status === 400) {
                                    res.status(results.status).send();
                                } else {
                                    res.status(400).json({message: "search Failed"});

                                }
                            }
                        });
                    }
                }
            })
        } else {
            res.status(400).json({message: "search Failed"});

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

            // ----------------------------------------------------------------------------------
            let log = {
                propertyClick: {
                    userId: "anonymous",
                    propertyName: "Flight",
                    url_clicked: '/listings/flights',
                    date: new Date().getDate(),
                    month: new Date().getMonth(),
                    year: 1900 + new Date().getYear(),
                    timeStamp: new Date().toLocaleTimeString()
                }
            };
            if (req.session.username) {
                log.propertyClick.userId = req.session.username;
            }
            console.log(log);
            console.log("Log added - ");
            winston.info(log);
            //-----------------------------------------------------------------------------------

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
                                res.status(400).end();
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
                                                res.status(400).json({message: "search Failed"});

                                            })
                                        }

                                        else {
                                            console.log("successfully set cache entry");
                                            redis_client.expire(req.body.criteria.toString(), 300);
                                            res.status(results.status).send(results.data);
                                        }

                                    });

                                }
                                else if (results.status === 400) {
                                    res.status(results.status).send();
                                } else {
                                    res.status(400).json({message: "search Failed"});

                                }
                            }
                        });
                    }
                }
            })
        } else {
            res.status(400).json({message: "search Failed"});

        }

    }
    catch (e) {
        console.log(e);
        res.status(400).json({message: "search Failed"});
    }
});

router.post('/getCars', function (req, res) {
    try {

        if (req.body.criteria) {

            // ---------------------------------------------------------------------------
            let log = {
                propertyClick: {
                    userId: "anonymous",
                    propertyName: "Car",
                    url_clicked: '/listings/cars',
                    date: new Date().getDate(),
                    month: new Date().getMonth(),
                    year: 1900 + new Date().getYear(),
                    timeStamp: new Date().toLocaleTimeString()
                }
            };
            if (req.session.username) {
                log.propertyClick.userId = req.session.username;
            }
            console.log(log);
            console.log("Log added - ");
            winston.info(log);
            //-----------------------------------------------------------------------------------

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
                        kafka.make_request(req_topic_enums.CAR_LISTING, req.body, function (err, results) {

                            console.log('in result');

                            console.log(results.data);

                            if (err) {
                                console.log(err);
                                res.status(400).json({message: err});

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
                                                res.status(400).json({message: "search Failed"});

                                            })
                                        }

                                        else {
                                            console.log("successfully set cache entry");
                                            redis_client.expire(req.body.criteria.toString(), 300);
                                            res.status(results.status).send(results.data);
                                        }

                                    });

                                }
                                else if (results.status === 400) {
                                    res.status(results.status).send();
                                } else {
                                    res.status(400).json({message: "search Failed"});

                                }
                            }
                        });
                    }
                }
            })
        } else {
            res.status(400).json({message: "search Failed"});

        }

    }
    catch (e) {
        console.log(e);
        res.status(400).json({message: "search Failed"});
    }
});

module.exports = router;
