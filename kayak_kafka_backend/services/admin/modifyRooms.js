let Hotel = require('../../Models/Hotel');
let ObjectId = require('mongodb').ObjectID;

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };
    try {
        console.log("data");
        console.log(data);
        // {_id:ObjectId(data.hotelId)},
        Hotel.updateOne({$and:[{_id:ObjectId(data.hotelId)},{'rooms._id': ObjectId(data._id)}]},
            {$set:
                {
                    // 'rooms.$.roomType':data.roomType,
                    'rooms.$.roomCapacity':data.roomCapacity,
                    'rooms.$.roomPrice':data.roomPrice,
                    'rooms.$.noOfRooms':data.noOfRooms
                }
            },
            function (err, result) {
                if(err){
                    console.log(err);
                    callback(err, null);
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
    catch (e) {
        console.log(e);
        callback(e, response);
    }
});

exports.handle_request = handle_request;


