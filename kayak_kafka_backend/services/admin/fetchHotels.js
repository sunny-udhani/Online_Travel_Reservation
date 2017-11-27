let Hotel = require('../../Models/Hotel');

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };

    try {
        console.log("Hotel Fetch");
        Hotel.find({}, function (err, results) {
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


