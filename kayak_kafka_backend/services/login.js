var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";
var act = require("./activity");
var bcrypt = require("bcrypt");

handle_request = ((data, done)=> {
    // passport.use('login', new LocalStrategy(function(username, password, done) {
    let res = {};
    try {
        console.log("In Login");
        mongo.connect(mongoURL, function(){
            console.log('Connected to mongo at: ' + mongoURL);
            var coll = mongo.collection('users');

            coll.findOne({username: data.username}, function(err, result){
                console.log(result);
                if(err){
                    console.log(err);
                    throw err;
                }
                if(result!==null && result!==undefined) {
                    if (bcrypt.compareSync(data.password, result.hashpassword)) {
                        act.insertIntoActivity(function (err, activityInserted) {
                            if (err) {
                                console.log(err);
                                res.status = 301;
                                res.message = "Login Successful. Failed to add user activity";
                                done(err, res);
                            }
                            console.log(activityInserted);
                            if (activityInserted) {
                                res.status = 201;
                                res.username = data.username;
                                res.message = "Login Successful. Login Activity Added";
                                done(err, res);
                            }
                            else {
                                res.status = 301;
                                res.message = "Login Successful. Failed to add Activity";
                                done(err, res);
                            }
                        }, data.username, "login");
                    }
                    else {
                        res.status = 301;
                        res.message = "Incorrect Password";
                        done(err, res);
                    }
                }
                else {
                    res.status = 301;
                    res.message = "Username does not exist. Please signup";
                    done(err, res);
                }
            });
        });
    }
    catch (e){
        done(e,{});
    }
    // }));
});

exports.handle_request = handle_request;


