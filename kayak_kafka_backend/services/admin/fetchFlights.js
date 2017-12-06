let Flight = require('../../Models/Flight');
let ObjectId = require('mongodb').ObjectID;

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };

    try {
        console.log("Flights Fetch");
        let query={};
        if(data!=={}){
            if(data._id!== undefined && data._id!== null){
                query = {_id : ObjectId(data._id)}
            }
            else {
                query = data.query;
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


