let Hotel = require('../../Models/Hotel');
let Flight = require('../../Models/Flight');
let Car = require('../../Models/Car');

handle_request = ((data, callback) => {
    let response = {
        status: 400,
        analytics:{
            reviewsOnProperties:{
                labels: [],
                data: []
            },
        }
    };
    try {

        console.log("data");

        let hotelCounter = 0;

        let flightCounter = 0;

        let carCounter = 0;

        // ---------------------------------------------------------

        console.log("Hotel Fetch");
        let query={};
        if(data!=={}){
            if(data.hotelId!== undefined && data.hotelId!== null){
                query = {_id : ObjectId(data.hotelId)}
            }
        }
        console.log(query);
        Hotel.find(query, function (err, results) {
            if(err){
                console.log(err);
                callback(err, null);
            }
            else {
                console.log("results : ");
                console.log(results);
                if(results) {

                    results.forEach((result)=>{
                        if(result.reviews.reviews !== "" || result.reviews.reviews !== undefined || result.reviews.reviews !== null ){
                            hotelCounter ++;
                        }
                    });

                    // ----------------------------------------------

                    console.log("Flights Fetch");
                    let query={};
                    if(data!=={}){
                        if(data.flightId!== undefined && data.flightId!== null){
                            query = {
                                _id : ObjectId(data.flightId)
                            }
                        }
                    }
                    console.log(query);
                    Flight.find(query, function (err, results) {
                        if(err){
                            console.log(err);
                            callback(err, null);
                        }
                        else {
                            console.log("results : ");
                            console.log(results);
                            if(results) {

                                results.forEach((result)=>{
                                    if(result.reviews.reviews !== "" || result.reviews.reviews !== undefined || result.reviews.reviews !== null ){
                                        flightCounter ++;
                                    }
                                });

                                // -----------------------------------------------

                                console.log("Car Fetch");
                                let query={};
                                if(data!=={}){
                                    if(data.carId!== undefined && data.carId!== null){
                                        query = {_id : ObjectId(data.carId)}
                                    }
                                }
                                console.log(query);
                                Car.find(query, function (err, results) {
                                    if(err){
                                        console.log(err);
                                        callback(err, response);
                                    }
                                    else {
                                        console.log("results : ");
                                        console.log(results);
                                        if(results) {

                                            results.forEach((result)=>{
                                                if(result.reviews.reviews !== "" || result.reviews.reviews !== undefined || result.reviews.reviews !== null ){
                                                    carCounter ++;
                                                }
                                            });

                                            // ----------- FINAL ------------


                                            response.status = 200;

                                            console.log("Hotel - "+hotelCounter+" Flight - "+flightCounter+" Car - "+carCounter);

                                            response.analytics.reviewsOnProperties.labels = ['Hotel','Flight','Car'];

                                            response.analytics.reviewsOnProperties.data = [hotelCounter,flightCounter,carCounter];

                                            callback(null, response);

                                            // ------------------------------

                                        }
                                        else{
                                            response.status = 404;
                                            callback(null, response);
                                        }
                                    }
                                });

                                // -----------------------------------------------

                            }
                            else{
                                response.status = 404;
                                callback(null, response);
                            }
                        }
                    });

                    //-----------------------------------------------

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
