var mongo = require('../mongo/mongo.js');
var mongoURL = 'mongodb://kayak:kayak@kayakcluster-shard-00-00-j61pv.mongodb.net:27017,kayakcluster-shard-00-01-j61pv.mongodb.net:27017,kayakcluster-shard-00-02-j61pv.mongodb.net:27017/kayak?ssl=true&replicaSet=KayakCluster-shard-0&authSource=admin';
var ObjectID = require('mongodb').ObjectID;

function getDetails(msg, callback) {
    var db;
    var res = {};
    console.log("In handle request:" + JSON.stringify(msg));

    mongo.connect(mongoURL, function (db) {

        console.log('Connected to mongo at: ' + mongoURL);
        console.log(msg.id);

        db.collection('cars').findOne({_id: ObjectID(msg.id)}, function (err, car) {
            console.log(car);
            if (car) {
                res.car = car;
                res.status = 200;
                res.message = "Car details retrieval successful";
            }

            else {
                console.log("in error");
                res.code = 401;
                res.value = "Failed to fetch";
            }
            db.close();
            callback(null, res);
        });
    })
}

exports.getDetails = getDetails;