let Hotel = require('../../Models/Hotel');
let ObjectId = require('mongodb').ObjectID;

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };

    try {
        console.log("Hotel Fetch");
        console.log(data);
        let query={};
        if(data.hasOwnProperty("_id")){
            query = {'_id' : ObjectId(data._id) }
        }
        else if(data.hasOwnProperty("hotelName")){
            query = {'hotelName':data.hotelName}
        }
        else if(data.hasOwnProperty("city")){
            query = {'city':data.city}
        }
        /*if(data!=={} && data!==null && data!==undefined){
            if(data._id!== undefined && data._id!== null){
                query = {_id : ObjectId(data._id)}
            }
            else {
                query = data.query;
            }
        }*/
        console.log(query);
        Hotel.find(query, function (err, results) {
            if(err){
                console.log(err);
                callback(err, null);
            }
            else {
                /*console.log("results : ");
                console.log(results);*/
                if(results) {
                    if(results.length>0){
                        response.status = 200;
                        response.data = results;
                        callback(null, response);
                    }
                    else {
                        response.status = 204;
                        response.data = results;
                        callback(null, response);
                    }
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


