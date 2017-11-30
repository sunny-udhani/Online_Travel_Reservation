let Car = require('../../Models/Car');
let ObjectId = require('mongodb').ObjectID;

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };

    try {
        console.log("Car Fetch");
        let query={};
        if(data!=={}){
            if(data.carId!== undefined && data.carId!== null){
                query = {_id : ObjectId(data.carId)}
            }
        }
        console.log(query);
        Car.find(query, function (err, results) {
            if(err){
                console.log(err);
                callback(err, response);
            }
            else {
                console.log("results : ");
                console.log(results);
                if(results) {
                    response.status = 200;
                    response.data = results;
                    callback(null, response);
                }
                else{
                    response.status = 404;
                    callback(null, response);
                }
            }
        });
    }
    catch (e) {
        console.log(e);
        callback(e, response);
    }
});

exports.handle_request = handle_request;


