let Flight = require('../../Models/Flight');
let ObjectId = require('mongodb').ObjectID;

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };

    try {
        console.log("Hotel Fetch");
        console.log(data);
        let searchQuery={
            _id : ObjectId(data._id)
        };

        let updateQuery={
            $set:
                {
                    hostId : data.hostId,
                    flightNo : data.flightNo,
                    flightOperator : data.flightOperator.toLowerCase(),
                    departureDate : data.departureDate,
                    departureTime : data.departureTime,
                    arrivalDate : data.arrivalDate,
                    arrivalTime : data.arrivalTime,
                    duration : data.duration,
                    origin : data.origin.toLowerCase(),
                    destination : data.destination.toLowerCase()
                    // classes : data.classes
                }
        };

        console.log(searchQuery);
        console.log(updateQuery);

        Flight.find(searchQuery, function (err, result) {
            if(err){
                console.log(err);
                callback(err, response);
            }
            else {
                console.log("found");
                console.log(result);
                if(result){
                    Flight.updateOne(searchQuery, updateQuery , function (err, result1) {
                        if(err){
                            console.log(err);
                            callback(err, response);
                        }
                        else {
                            console.log(result1);
                            if(result1){
                                if(result1.nModified===1){
                                    response.status=200;
                                }
                                else if(result1.nModified===0) {
                                    response.status=300;
                                }
                                else {
                                    response.status=400;
                                }
                                callback(null, response);
                                // console.log(data.hasOwnProperty("flightClass"));
                                /*if(data.hasOwnProperty("flightClass")){
                                    Flight.updateOne({$and:[{_id:ObjectId(data._id)},{'classes._id': ObjectId(data.flightClass._id)}]},
                                        {$set:
                                            {
                                                // 'rooms.$.roomType':data.roomType,
                                                'classes.$.noOfSeats':data.flightClass.noOfSeats,
                                                'classes.$.price':data.flightClass.price
                                            }
                                        },
                                        function (err, result) {
                                            if(err){
                                                console.log(err);
                                            }
                                            else {
                                                if(result.nModified===1){
                                                    response.status=200;
                                                    response.data=result;
                                                    callback(null, response);
                                                }
                                                else {
                                                    callback(null, response);
                                                }
                                            }
                                        }
                                    );
                                }
                                else {
                                    callback(null, response);
                                }*/

                            }
                            else {
                                response.status=400;
                                callback(null, response);
                            }
                        }
                    });
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


