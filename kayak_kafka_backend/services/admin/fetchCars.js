let Car = require('../../Models/Car');
let ObjectId = require('mongodb').ObjectID;

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };

    try {
        console.log("Car Fetch");
        console.log(data);
        let query={};
        if(data.hasOwnProperty("_id")){
            query = {'_id' : ObjectId(data._id) }
        }
        else if(data.hasOwnProperty("carType")){
            query = {'carType':data.carType}
        }
        else if(data.hasOwnProperty("carMake")){
            query = {'carMake':data.carMake}
        }
        else if(data.hasOwnProperty("city")){
            query = {'city':data.city}
        }
        else if(data.hasOwnProperty("carName")){
            query = {'carName':data.carName}
        }
        else if(data.hasOwnProperty("capacity")){
            query = {'capacity': {$gte : data.capacity}}
        }

        console.log(query);
        Car.find(query, function (err, results) {
            if(err){
                console.log(err);
                callback(err, response);
            }
            else {
                // console.log("results : ");
                // console.log(results);
                if(results) {
                    if(results.length>0){
                        response.status = 200;
                        response.data = results;
                        callback(null, response);
                    }
                    else {
                        response.status = 204;
                        response.data = results;
                        callback(null, response);
                    }

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


