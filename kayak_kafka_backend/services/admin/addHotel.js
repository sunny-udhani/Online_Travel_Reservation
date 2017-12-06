let Hotel = require('../../Models/Hotel');

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };
    try {
        console.log("data");
        console.log(data);
        let hotel = new Hotel({
            hostId : data.hostId,
            hotelName: data.hotelName.toLowerCase(),
            hotelAddress : data.hotelAddress.toLowerCase(),
            city : data.city.toLowerCase(),
            state : data.state.toLowerCase(),
            zipCode : data.zipCode,
            stars : data.stars,
            rooms : [{
                    roomType: "delux",
                    roomCapacity: 0,
                    roomPrice: 0,
                    noOfRooms : 0
                }
                /*,
                {
                    roomType: "double",
                    roomCapacity: 0,
                    roomPrice: 0,
                    noOfRooms : 0
                },
                {
                    roomType: "queen",
                    roomCapacity: 0,
                    roomPrice: 0,
                    noOfRooms : 0
                },
                {
                    roomType: "king",
                    roomCapacity: 0,
                    roomPrice: 0,
                    noOfRooms : 0
                },*/
            ],
            images : data.images
        });
        console.log(hotel);
        hotel.save(function (err, results) {
            if(err){
                console.log(err);
                callback(err, null);
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
        // mongo.connect(mongoURL, function () {
        //     let
        // });

    }
    catch (e) {
        console.log(e);
        callback(e, response);
    }
});

exports.handle_request = handle_request;


