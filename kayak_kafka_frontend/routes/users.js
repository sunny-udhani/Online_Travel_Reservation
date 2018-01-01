let express = require('express');
const passport = require("passport");
let router = express.Router();
require('./passport')(passport);
const winston = require('../config/userTraceLog');
var kafka = require('./kafka/client');
var parser = require('multer')({dest: 'uploads/'});
var fs = require('fs');
var path = require('path');
let MongoClient = require('mongodb').MongoClient;
// let newDate = require('mongodb').MongoClient;
var mongoURL = "mongodb://kayak:kayak@kayakcluster-shard-00-00-j61pv.mongodb.net:27017,kayakcluster-shard-00-01-j61pv.mongodb.net:27017,kayakcluster-shard-00-02-j61pv.mongodb.net:27017/kayak?ssl=true&replicaSet=KayakCluster-shard-0&authSource=admin";
let db = null;
MongoClient.connect(mongoURL, function (err, _db) {
    if (err) {
        throw new Error('Could not connect: ' + err);
    }
    db = _db;
    connected = true;
    console.log(connected + " is connected?");
});
// console.log("*******************************************", process.cwd());

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', function (req, res) {
    console.log(req.body);
    passport.authenticate('login', function (err, response) {
        console.log("response:");
        console.log(response);
        if (err) {
            console.log(err);
            res.status(400).send();
        }
        if (response.status === 200) {
            req.session.previousTime = new Date().getTime();
            req.session.pageTime = [];
            req.session.pages = [];
            req.session.lastPage = "UserHome";
            req.session.flag = true;
            req.session.username = response.username;
            console.log("session initialized. :" + req.session.username);
            res.status(response.status).send(req.session.username);
        }
        else if (response.status === 201) {
            req.session.username = response.username;
            console.log("session initialized for admin. : ");
            console.log(req.session.username);
            res.status(response.status).send(req.session.username);
        }
        else if (response.status === 400) {
            res.status(response.status).send({"message": response.message});
        }
        else {
            res.status(401).send({"message": "Login Failed"});
        }
    })(req, res);
});

router.post('/logout', function (req, res) {

    console.log(req.session.username);

    console.log(req.session);

    if (req.session.username !== null && req.session.username !== undefined) {

        let nwTime = new Date().getTime();
        let prvTime = req.session.previousTime;
        let timeSpentOnPage = nwTime - prvTime;
        // req.session.previousTime = nwTime; // user goes anonymous
        req.session.pages.push(req.session.lastPage);
        req.session.pageTime.push(timeSpentOnPage);

            let UserHome = 0;
            let SignIn = 0;
            let SignUp = 0;
            let HotelListing = 0;
            let CarListing = 0;
            let FlightListing = 0;
            let UserProfile = 0;
            let UserPaymentPage = 0;
            let SuccesfulPayment = 0;

            let i =0;
        req.session.pages.forEach((page)=>{
            switch(page){
                case "UserHome":
                    UserHome += req.session.pageTime[i];
                    i++;
                    break;
                case "SignIn":
                    SignIn += req.session.pageTime[i];
                    i++;
                    break;
                case "SignUp":
                    SignUp += req.session.pageTime[i];
                    i++;
                    break;
                case "HotelListing":
                    HotelListing += req.session.pageTime[i];
                    i++;
                    break;
                case "CarListing":
                    CarListing += req.session.pageTime[i];
                    i++;
                    break;
                case "FlightListing":
                    FlightListing += req.session.pageTime[i];
                    i++;
                    break;
                case "UserProfile":
                    UserProfile += req.session.pageTime[i];
                    i++;
                    break;
                case "UserPaymentPage":
                    UserPaymentPage += req.session.pageTime[i];
                    i++;
                    break;
                case "SuccesfulPayment":
                    SuccesfulPayment += req.session.pageTime[i];
                    i++;
                    break;
                default:
            }
        });

        let tree = {
            tree:{
                userId: req.session.username,
                pages:req.session.pages,
                pageTime:req.session.pageTime
            },
        };

        let payload = {
            tree:{
                userId: req.session.username,
                pages:req.session.pages,
                pageTime:req.session.pageTime
            },
            timePerPage:{
                userId: req.session.username,
                UserHome: UserHome,
                SignIn: SignIn,
                SignUp: SignUp,
                HotelListing: HotelListing,
                CarListing: CarListing,
                FlightListing: FlightListing,
                UserProfile: UserProfile,
                UserPaymentPage: UserPaymentPage,
                SuccesfulPayment: SuccesfulPayment
            }
        };

        console.log(" -- Tree -- "+payload.tree);

        console.log(" -- Time Per Page -- "+payload.timePerPage);

        winston.info(tree);

        try{

            kafka.make_request('logUserTracingTree_topic', payload, function (err, results) {
                console.log('in result');
                console.log(results);

                if (err) {
                    console.log(err);
                    throw err;
                }
                else {
                    if (results.status === 200) {

                        console.log("Added Page array to mongoDB- "+results.data.pages);

                        console.log("Added Time per page array to mongoDB- "+results.data.pageTime);

                        req.session.destroy();

                        console.log('Session Destroyed');

                        res.status(200).send();
                        // res.status(results.status).send(results);
                    }
                    else if (results.status === 400) {
                        // res.status(results.status).send({"message": "Fetch unsuccessful"});
                    }
                }
            });

        }
        catch(err){
            console.log();
        }

    }
    else {
        console.log('Session does not exist');
        res.status(400).send();
    }

});

router.post('/validateSession', function (req, res) {
    console.log(req.session.username);
    if (req.session.username !== null && req.session.username !== undefined) {
        res.status(200).send({"username": req.session.username});
    }
    else {
        res.status(204).end();
    }
});

router.post('/signup', function (req, res, next) {
    try {
        console.log(req.body);
        kafka.make_request('signup_topic', req.body, function (err, results) {
            console.log('in result');
            console.log(results);
            if (err) {
                console.log(err);
                throw err;
            }
            else {
                if (results.status === 200) {
                    req.session.username = results.username;
                    console.log("Received username: " + results.username);
                    console.log("Local username: " + req.body.username);
                    res.status(results.status).send({"message": "Signup Successful"});
                }
                else if (results.status === 201) {
                    req.session.username = results.username;
                    console.log("Received admin username: " + results.username);
                    console.log("Local username: " + req.body.username);
                    res.status(results.status).send({"message": "Signup Successful"});
                }
                else if (results.status === 401) {
                    res.status(results.status).send({"message": "User already Exist"});
                }
                else if (results.status === 400) {
                    res.status(results.status).send({"message": "Signup Failed"});
                }
            }
        });
    }
    catch (e) {
        console.log(e);
        res.status(400).json({message: "Signup Failed"});
    }
});

router.post('/getUserDetails', function (req, res) {
    try {
        console.log(req.session.username);

        //edit payload
        payload = {
            username : req.session.username
        };
        console.log("12");

        //edit if statements
        kafka.make_request('getUserDetails_topic', payload, function (err, results) {
            console.log('in result');
            console.log(results);

            if (err) {
                console.log(err);
                throw err;
            }
            else {
                if (results.status === 200) {

                    res.status(results.status).send(results);
                }
                else if (results.status === 400) {
                    res.status(results.status).send({"message": "Fetch unsuccessful"});
                }
            }
        });
    }
    catch (e) {
        console.log(e);
        res.status(400).json({message: "Fetch unsuccessful"});
    }
});

router.post('/getFlightDetails', function (req, res) {

    console.log("2 : " + req.body);
    try {
        kafka.make_request('getFlightDetails_topic', req.body, function(err, results) {

            console.log("8");
            console.log(results);
            console.log(results.status);
            console.log(results.message);
            console.log(results.flight);


            if(err) {
                console.log(err);
                throw(err);
            }
            else {
                if(results.status === 200) {
                    console.log("9");
                    res.status(results.status).send(results.flight);
                }
                else {
                    console.log("In users.js - getFlightDetails - Some other status code");
                }
            }
        });
    }
    catch (e) {
        console.log(e);
        res.status(400).json({message: "Get flight details failed"});
    }
});

router.post('/getHotelDetails', function (req, res) {

    console.log("2 : " + req.body);
    try {
        kafka.make_request('getHotelDetails_topic', req.body, function(err, results) {

        //edit payload
        payload = {
            username: req.session.username
        };
        console.log("12");
            console.log("8");
            console.log(results);
            console.log(results.status);
            console.log(results.message);
            console.log(results.hotel);


            if(err) {
                console.log(err);
                throw(err);
            }
            else {
                if(results.status === 200) {
                    console.log("9");
                    res.status(results.status).send(results.hotel);
                }
                else {
                    console.log("In users.js - getHotelDetails - Some other status code");
                }
            }
        });
    }
    catch (e) {
        console.log(e);
        res.status(400).json({message: "Get hotel details failed"});
    }
});

router.post('/getCarDetails', function (req, res) {

    console.log("2 : " + req.body);
    try {
        kafka.make_request('getCarDetails_topic', req.body, function(err, results) {

            console.log("8");
            console.log(results);
            console.log(results.status);
            console.log(results.message);
            console.log(results.car);


            if(err) {
                console.log(err);
                throw(err);
            }
            else {
                if(results.status === 200) {
                    console.log("9");
                    res.status(results.status).send(results.car);
                }
                else {
                    console.log("In users.js - getCarDetails - Some other status code");
                }
            }
        });
    }
    catch (e) {
        console.log(e);
        res.status(400).json({message: "Get car details failed"});
    }
});

router.post('/bookFlight', function (req, res) {
    try {
        console.log(req.body);
        kafka.make_request('bookFlight_topic', req.body, function (err, results) {
            console.log('in result');
            console.log(results);
            if (err) {
                console.log(err);
                throw err;
            }
            else {
                if (results.status === 200) {

                    res.status(results.status).send({"message": "Flight booking successful"});
                }

                else if (results.status === 400) {
                    res.status(results.status).send({"message": "Flight booking Failed"});
                }
            }
        });
    }
    catch (e) {
        console.log(e);
        res.status(400).json({message: "Flight booking Failed"});
    }
});

router.post('/bookHotel', function (req, res) {
    try {
        console.log(req.body);
        kafka.make_request('bookHotel_topic', req.body, function (err, results) {
            console.log('in result');
            console.log(results);
            if (err) {
                console.log(err);
                res.status(400).json({message: "Fetch unsuccessful"});            }
            else {
                   if (results.status === 200) {

                    res.status(results.status).send({"message": "Hotel booking successful"});
                }

                else if (results.status === 400) {
                    res.status(results.status).send({"message": "Hotel booking Failed"});
                }
            }
        });
    }
    catch (e) {
        console.log(e);
        res.status(400).json({message: "Flight booking Failed"});
    }
});

router.post('/bookCar', function (req, res) {
    try {
        console.log(req.body);
        kafka.make_request('bookCar_topic', req.body, function (err, results) {
            console.log('in result');
            console.log(results);
            if (err) {
                console.log(err);
                throw err;
            }
            else {
                if (results.status === 200) {

                    res.status(results.status).send({"message": "Car booking successful"});
                }

                else if (results.status === 400) {
                    res.status(results.status).send({"message": "Car booking Failed"});
                }
            }
        });
    }
    catch (e) {
        console.log(e);
        res.status(400).json({message: "Flight booking Failed"});
    }
});

router.post('/insertTravelerDetails', function (req, res) {
    try {
        console.log(req.body);
        kafka.make_request('insertTravelers_topic', req.body, function (err, results) {
            console.log('in result');
            console.log(results);
            if (err) {
                console.log(err);
                throw err;
            }
            else {
                if (results.status === 200) {

                    res.status(results.status).send({"message": "Travelers added successful"});
                }

                else if (results.status === 400) {
                    res.status(results.status).send({"message": "Travelers addition Failed"});
                }
            }
        });
    }
    catch (e) {
        console.log(e);
        res.status(400).json({message: "Flight booking Failed"});
    }
});

router.post('/addusercard', parser.any(), function (req, res) {
    try {
        payload = {
            usercard: req.body,
            username: req.session.username
        }
        // console.log(req.body);
        let x = req.body.cardnumber;
        let y = x.toString();
        if (y.length == 16) {
            console.log("Valid");


            kafka.make_request('addusercard_topic', payload, function (err, results) {
                console.log(results);
                if (results.status == 200) {
                    res.json(results.user);
                }
                else {
                    res.status(404).json({message: "Not found"})
                }
            })
        }
        else {
            res.status(411).json({message: "Invalid Card"})
        }
    }
    catch (e){
        console.log(e);
        res.status(400).json({message: "Failed to Get"});
    }

});


router.post('/getuserprofile_user', function (req, res) {
    try {
        payload = {
            username: req.session.username
        }
        console.log(payload);



            kafka.make_request('getuserprofileinfo_topic', payload, function (err, results) {
                console.log(results);
                if (results.status == 200) {
                    res.json(results.data);
                }
                else {
                    res.status(404).json({message: "Not found"})
                }
            })


    }
    catch (e) {
        console.log(e);
        res.status(400).json({message: "Failed to Get"});
    }

});


router.post('/getcreditcarddetails', function (req, res) {
    try {
        payload = {
            username: req.session.username
        }
        // console.log(req.body);



        kafka.make_request('getcreditcarddetails_topic', payload, function (err, results) {
            console.log(results);
            if (results.status == 200) {
                res.json(results.data);
            }
            else {
                res.status(404).json({message: "Not found"})
            }
        })


    }
    catch (e) {
        console.log(e);
        res.status(400).json({message: "Failed to Get"});
    }

});






router.post('/getbookinginfo_user', function (req, res) {
    try {
        payload = {
            username: req.session.username
        };


        console.log(req.body);
        kafka.make_request('getbookinguser_topic', payload, function (err, results) {
            console.log(results);
            let reults1 = results.data;

            //console.log(JSON.stringify(results.rooms))
            if (results.code == 200) {
                res.status(200).send(results.data);

            }
            else {
                res.status(400).json({message: "Invalid Card"})
            }
        })
    }
    catch (e) {
        console.log(e);
        res.status(400).json({message: "Failed to get Details"})

    }
});

router.post('/addprofilepicture', parser.single('profile-picture'), function (req, res) {
    var destination = path.join(process.cwd(), "public", "images", req.session.username + ".jpg");
    fs.createReadStream(req.file.path).pipe(fs.createWriteStream(destination));
    fs.unlink(req.file.path, function (err) {
        if (err) {
            res.status("500");
            return res.send("An error occured");
        }
        res.send("Ohk");
    })
});

router.post('/editprofileofuser', parser.any(), function (req, res) {
    try {
        payload = {
            username: req.session.username,
            details: req.body
        };

        //console.log(useredit);
        console.log(req.session.username);
        console.log(req.body.firstname);
        kafka.make_request('editprofileuser_topic', payload, function (err, results) {
            console.log(results);
            let reults1 = results.data;

            // console.log(reults1.res);
            //console.log(JSON.stringify(results.rooms))
            if (results.status == 200) {
                res.json(results);

            }
            else {
                res.status(400).end();
            }
        })
    }
    catch (e) {
        console.log(e);
        res.status(400).json({message: "Failed to get Details"})

    }
});


router.post('/adddata', parser.any(), function (req, res) {
        try {
            payload = {
                username: req.session.username,
                details: req.body
            };

            for (let i = 0; i < 100; i++) {

                let data = {
                    flightNo: "12" + i%10,
                    hostId: 4,
                    flightOperator: "british airways",
                    departureDate: "2017-12-" + i % 10,
                    arrivalDate: "2017-12-" + i % 10,
                    departureTime: "14:20",
                    arrivalTime: "15:20",
                    duration: 1,
                    origin: "sjc",
                    destination: "sfo",
                    classes: [{
                        classType: "economy",
                        price: 100,
                        noOfSeats: 100,
                    }, {
                        classType: "business",
                        price: 500,
                        noOfSeats: 100,
                    }, {
                        classType: "first-class",
                        price: 700,
                        noOfSeats: 100,
                    }
                    ]
                }

                db.collection('flights').insertOne(data, function (err, res) {
                    console.log(err)
                    console.log(res)

                })
            }

        }

        catch (e) {
            console.log(e);
            res.status(400).json({message: "Failed to get Details"})

        }
    }
)
;


module.exports = router;
