let mysql = require('../mysql/mysql');
var mongo =require('../mongo/mongo.js');
var mongoURL = "mongodb://kayak:kayak@cluster0-shard-00-00-j61pv.mongodb.net:27017,cluster0-shard-00-01-j61pv.mongodb.net:27017,cluster0-shard-00-02-j61pv.mongodb.net:27017/kayak?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";


handle_request = ((data, callback) => {
    console.log("*************************************car");
    let response = {
        status: 400
    };
    let username=data.username;
    try {
        let getcarbookingsinfo = "select * from carbooking where carbooking.username = '" + data.username + "' ";

        mysql.fetchData(function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(result.length);
                if (result.length === 1) {
                    let mongoquery=result[0].carId;
                    console.log(mongoquery);
                    let resultcars=[];
                    resultcars.push(result);
                    mongo.connect(mongoURL, function(db){
                        console.log('Connected to mongo at: ' + mongoURL);
                        db.collection('cars').findOne({hostId:"123"}, function(err, user){
                            console.log(user);
                            if (user) {
                                resultcars.push(user);
                            }
                            else{
                                console.log("in error");

                            }
                            db.close();
                            callback(null,resultcars);
                        });
                    });

                }
            }
        },getcarbookingsinfo);
    }
    catch (e) {
        console.log(e);
        callback(e, null)
    }
});

exports.handle_request = handle_request;
