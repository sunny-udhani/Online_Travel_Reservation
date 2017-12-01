let mysql = require('../../../mysql/mysql');

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };

    try {
        console.log("Users Fetch");
        console.log(data);
        /*console.log(data.hasOwnProperty("hostName"));
        console.log(data.hasOwnProperty("serviceType"));
        console.log(data.hasOwnProperty("hostId"));*/
        let fetch = "select * from userprofile where userprofile.username " +
            "IN (select username from user where accessInd='user');";
        let dataToBeFetched = "u.username, firstName, lastName, street, city, " +
            "state, zipCode, phoneNumber, profileImage, dateofbirth, gender";
        let fetchQuery = "select "+ dataToBeFetched +" from user as u join userprofile as up on u.username=up.username " +
            "where accessInd = 'user';";
        if(data.hasOwnProperty("username")) {
            fetchQuery = "select "+ dataToBeFetched +" from user as u join userprofile as up on u.username=up.username " +
                "where accessInd = 'user' and up.username = '"+data.searchCriteria+"';";
            fetch = "select * from userprofile where userprofile.username " +
                "IN (select username from user where accessInd='user') and username = '"+ data.username +"';";
        }
        /*    fetchQuery = "select * from host where hostName = '"+ data.hostName +"';";
        }
        else if(data.hasOwnProperty("serviceType")){
            fetchQuery = "select * from host where serviceType = '"+ data.serviceType +"';";
        }
        else if(data.hasOwnProperty("hostId")){
            fetchQuery = "select * from host where hostId = '"+ data.hostId +"';";
        }*/
        console.log(fetch);
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
        }, fetch);
    }
    catch (e) {
        console.log(e);
        callback(e, response);
    }
});

exports.handle_request = handle_request;


