let Car = require('../../Models/Car');
let ObjectId = require('mongodb').ObjectID;

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };

    try {
        console.log("Car Fetch");
        console.log(data);
        let searchQuery={
            _id : ObjectId(data._id)
        };

        let updateQuery={
            $set:
                {
                    hostId: data.hostId,
                    carName: data.carName.toLowerCase(),
                    carType: data.carType.toLowerCase(),
                    carMake: data.carMake.toLowerCase(),
                    carModel: data.carModel.toLowerCase(),
                    capacity: data.capacity,
                    city: data.city.toLowerCase(),
                    state: data.state.toLowerCase(),
                    zipCode: data.zipCode,
                    price: data.price,
                }
        };

        console.log(searchQuery);
        console.log(updateQuery);


        Car.updateOne(searchQuery, updateQuery , function (err, result) {
            if(err){
                console.log(err);
                callback(err, response);
            }
            else {
                console.log(result);
                if(result){
                    if(result.nModified===1){
                        response.status=200;
                    }
                    else if(result.nModified===0) {
                        response.status=300;
                    }
                    else {
                        response.status=400;
                    }
                    callback(null, response);
                }
                else {
                    response.status=400;
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


