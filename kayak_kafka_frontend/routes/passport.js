let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
let kafka = require('./kafka/client');

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
                        console.log("Local username: "+ username);
                        done(null,results);
                    }
                    else if(results.status === 201){
                        console.log("Local Admin username: "+ username);
                        done(null,results);
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
