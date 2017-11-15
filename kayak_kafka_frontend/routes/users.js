var express = require('express');
var router = express.Router();
require('./passport')(passport);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function (req, res) {
   console.log(req.body);
    passport.authenticate('login', function(err, response) {
        if(err) {
            console.log(err);
            res.status(400).send();
        }
        if(response.status===200) {
            req.session.username = response.username;
            console.log(req.session.username);
            console.log("session initilized");
            return res.status(response.status).send(req.session);
        }
        else if(response.status===400){
            res.status(response.status).send({"message":response.message});
        }
        else {
            res.status(401).send({"message":"Login Failed"});
        }
    })(req, res);
});

app.post('/logout', function(req,res) {
    console.log(req.session.username);
    req.session.destroy();
    console.log('Session Destroyed');
    res.status(200).send();
});

router.post('/signup', function(req, res, next){
    try {
        console.log(req.body);
        kafka.make_request('signup_topic',req.body, function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
                console.log(err);
                throw err;
            }
            else
            {
                if(results.status === 200){
                    console.log("Received username: "+results.username);
                    console.log("Local username: "+ req.body.username);
                    res.status(results,status).send({"message":"Signup Successful"});
                }
                else if(results.status === 301){
                    res.status(results.status).send({"message":"User already Exist"});
                }
                else if(results.status === 400) {
                    res.status(results.status).send({"message":"Signup Failed"});
                }
            }
        });
    }
    catch (e){
        console.log(e);
        res.status(400).json({message: "Signup Failed"});
    }
});

module.exports = router;
