let Flight = require('../../Models/Flight');
let ObjectId = require('mongodb').ObjectID;

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };

    try {
        console.log(data);
        Flight.find({$and: [{_id: ObjectId(data.flightId)}, {'classes._id': ObjectId(data._id)}]}, function (err, result1) {
            if(err){
                console.log(err);
                callback(err, response);
            }
            else {
                console.log(result1);

                Flight.updateOne({$and: [{_id: ObjectId(data.flightId)}, {'classes._id': ObjectId(data._id)}]},
                    {
                        $set:
                            {
                                // 'rooms.$.roomType':data.roomType,
                                'classes.$.noOfSeats': data.noOfSeats,
                                'classes.$.price': data.price
                            }
                    },
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            callback(err, response);
                        }
                        else {
                            console.log(result);
                            if (result.nModified === 1) {
                                response.status = 200;
                                response.data = result;
                                callback(null, response);
                            }
                            else if(result.nModified === 0){
                                response.status = 300;
                                callback(null, response);
                            }
                            else {
                                callback(null, response);
                            }
                        }
                    }
                );
            }
        });
    }
    catch (e) {
        console.log(e);
        callback(e, response);
    }
});

exports.handle_request = handle_request;


