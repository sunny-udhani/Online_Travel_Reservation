var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var kafka = require('./kafka/client');

module.exports = function(passport) {
    passport.use('login', new LocalStrategy(function(username, password, done) {
        try {
            kafka.make_request('login_topic',{"username":username,"password":password}, function(err,results){
                console.log('in result');
                console.log(results);
                if(err){
                    done(err,{});
                }
                else
                {
                    if(results.status === 200){
                        console.log("Received username: "+results.username);
                        console.log("Local username: "+ username);
                        done(null,{username:results.username,status:results.status});
                    }
                    else {
                        done(null,false);
                    }
                }
            });
        }
        catch (e){
            done(e,{});
        }
    }));
};
