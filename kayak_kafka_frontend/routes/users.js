let express = require('express');
const passport = require("passport");
let router = express.Router();
require('./passport')(passport);
var kafka = require('./kafka/client');
var parser = require('multer')({dest: 'uploads/'});
var fs = require('fs');
var path = require('path');

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
        req.session.destroy();
        console.log('Session Destroyed');
        res.status(200).send();
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
        kafka.make_request('getFlightDetails_topic', req.body, function (err, results) {

            console.log("8");
            console.log(results);
            console.log(results.status);
            console.log(results.message);
            console.log(results.flight);


            if (err) {
                console.log(err);
                throw(err);
            }
            else {
                if (results.status === 200) {
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

<<<<<<< HEAD
        //edit payload
        payload = {
            username: req.session.username
        };
        console.log("12");
=======
            console.log("8");
            console.log(results);
            console.log(results.status);
            console.log(results.message);
            console.log(results.hotel);
>>>>>>> 1b762c4be0cd0fdbc36946c53b004181cf81b6a8


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
    catch (e) {
        console.log(e);
        res.status(400).json({message: "Failed to Get"});
    }

});


router.post('/getuserprofile_user', function (req, res) {
    try {
        payload = {
            username: req.session.username
        }
        // console.log(req.body);



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


module.exports = router;
