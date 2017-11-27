let Flight = require('../../Models/Flight');

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };
    try {
        console.log("data");
        console.log(data);
        let flight = new Flight({
            flightNo : data.flightNo,
            hostId : data.hostId,
            flightOperator: data.flightOperator,
            departureDate : data.departureDate,
            arrivalDate : data.arrivalDate,
            departureTime : data.departureTime,
            arrivalTime : data.arrivalTime,
            duration : data.duration,
            origin : data.origin,
            destination : data.destination,
            flightImage : data.flightImage,
            classes : data.classes
        });
        // console.log(flight);
        flight.save(function (err, results) {
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


