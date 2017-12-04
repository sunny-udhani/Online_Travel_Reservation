let mysql = require('../../mysql/mysql');

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };

    try {
        console.log("Hosts Fetch");
        console.log(data);
        console.log(data.hasOwnProperty("hostName"));
        console.log(data.hasOwnProperty("serviceType"));
        console.log(data.hasOwnProperty("hostId"));
        let fetchQuery = "select * from host;";
        if(data.hasOwnProperty("hostName")){
            fetchQuery = "select * from host where hostName = '"+ data.hostName +"';";
        }
        else if(data.hasOwnProperty("serviceType")){
            fetchQuery = "select * from host where serviceType = '"+ data.serviceType +"';";
        }
        else if(data.hasOwnProperty("hostId")){
            fetchQuery = "select * from host where hostId = '"+ data.hostId +"';";
        }

        console.log(fetchQuery);

        mysql.fetchData(function (err, results) {
           if(err){
               console.log(err);
               callback(err, response);
           }
           else {
               console.log("result");
               console.log(results);
               if(results.length>0){
                   response.status=200;
                   response.data = results;
                   callback(null, response);
               }
               else {
                   response.status=204;
                   callback(null, response);
               }
           }
        }, fetchQuery);
    }
    catch (e) {
        console.log(e);
        callback(e, response);
    }
});

exports.handle_request = handle_request;


