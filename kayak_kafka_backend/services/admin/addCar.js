let Car = require('../../Models/Car');

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };
    try {
        console.log("data");
        console.log(data);
        let car = new Car({
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
        });
        console.log(car);
        car.save(function (err, results) {
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


