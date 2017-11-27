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
            hotelName: data.hotelName,
            hotelAddress : data.hotelAddress,
            city : data.city,
            state : data.state,
            zipCode : data.zipCode,
            stars : data.stars,
            rooms : [{
                    roomType: "single",
                    roomCapacity: 0,
                    roomPrice: 0,
                    noOfRooms : 0
                },
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
                },
            ],
            images : data.images
        });
        console.log(hotel);
        hotel.save(function (err, results) {
            if(err){
                console.log(err);
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


