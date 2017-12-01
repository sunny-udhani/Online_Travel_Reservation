let Hotel = require('../../Models/Hotel');
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
                    hotelName : data.hotelName.toLowerCase(),
                    hotelAddress : data.hotelAddress.toLowerCase(),
                    city : data.city.toLowerCase(),
                    state : data.state.toLowerCase(),
                    zipCode : data.zipCode,
                    stars : data.stars,
                    rooms : data.rooms
                }
        };

        console.log(searchQuery);
        console.log(updateQuery);

        Hotel.find(searchQuery, function (err, result) {
            if(err){
                console.log(err);
                callback(err, response);
            }
            else {
                console.log("found");
                console.log(result);
                if(result){
                    Hotel.updateOne(searchQuery, updateQuery , function (err, result1) {
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


