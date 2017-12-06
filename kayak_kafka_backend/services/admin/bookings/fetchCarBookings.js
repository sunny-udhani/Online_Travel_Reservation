let mysql = require('../../../mysql/mysql');
let Car = require('../../../Models/Car');
let ObjectId = require('mongodb').ObjectID;

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };

    try {
        console.log("CarBooking Fetch");
        console.log(data);

        /*let fetchQuery = "select cb.hostId, h.hostName, cb.bookingId, cb.carId, cb.noOfDays, " +
            "cb.fromDate, cb.toDate, cb.ticketPrice, cb.totalAmount, cb.bill_day, cb.bill_month, cb.bill_year, " +
            "cb.username, t.firstname, t.lastname, t.email, t.phonenumber, t.travelerId "+
            "from carbooking as cb " +
            "join host as h " +
                "on cb.hostId = h.hostId " +
            "join travelerdetails as t " +
                "on cb.bookingId=t.bookingId;";*/

        let fetchQuery = "select cb.hostId, h.hostName, cb.bookingId, cb.carId, cb.noOfDays, " +
            "cb.fromDate, cb.toDate, cb.ticketPrice, cb.totalAmount, cb.bill_day, cb.bill_month, cb.bill_year, "+
            "cb.username, t.firstname, t.lastname, t.email, t.phonenumber, t.travelerId "+
            "from host as h, carbooking as cb , travelerdetails as t "+
            "where cb.hostId = h.hostId and cb.bookingId=t.bookingId and  t.bookingtype='car';";

        if(data.hasOwnProperty("bookingId")){
            fetchQuery = "select cb.hostId, h.hostName, cb.bookingId, cb.carId, cb.noOfDays, " +
                "cb.fromDate, cb.toDate, cb.ticketPrice, cb.totalAmount, cb.bill_day, cb.bill_month, cb.bill_year, "+
                "cb.username, t.firstname, t.lastname, t.email, t.phonenumber, t.travelerId "+
                "from host as h, carbooking as cb , travelerdetails as t "+
                "where cb.hostId = h.hostId and cb.bookingId=t.bookingId and t.bookingtype='car' and " +
                "cb.bookingId = "+ data.bookingId +";";
        }
        if(data.hasOwnProperty("searchbyusername")){
            fetchQuery = "select cb.hostId, h.hostName, cb.bookingId, cb.carId, cb.noOfDays, " +
                "cb.fromDate, cb.toDate, cb.ticketPrice, cb.totalAmount, cb.bill_day, cb.bill_month, cb.bill_year, "+
                "cb.username, t.firstname, t.lastname, t.email, t.phonenumber, t.travelerId "+
                "from host as h, carbooking as cb , travelerdetails as t "+
                "where cb.hostId = h.hostId and cb.bookingId=t.bookingId and t.bookingtype='car' and " +
                "cb.username = '"+ data.searchbyusername +"';";
        }
        /*console.log(data.hasOwnProperty("hostName"));
        console.log(data.hasOwnProperty("serviceType"));
        console.log(data.hasOwnProperty("hostId"));

        if(data.hasOwnProperty("hostName")){
            fetchQuery = "select * from host where hostName = '"+ data.hostName +"';";
        }
        else if(data.hasOwnProperty("serviceType")){
            fetchQuery = "select * from host where serviceType = '"+ data.serviceType +"';";
        }
        else if(data.hasOwnProperty("hostId")){
            fetchQuery = "select * from host where hostId = '"+ data.hostId +"';";
        }*/
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
                    if(data.hasOwnProperty("fetchFullData")){
                        // let jsonObj = results[0];
                        if(data.fetchFullData){
                            Car.find({"_id":ObjectId(results[0].carId)}, function (err, results1) {
                                if(err){
                                    console.log(err);
                                    callback(err, null);
                                }
                                else {
                                    console.log(results1);
                                    if(results1){
                                        if(results1.length===1){
                                            results[0]["carName"] = results1[0].carName;
                                            results[0]["carType"] = results1[0].carType;
                                            results[0]["carMake"] = results1[0].carMake;
                                            results[0]["carModel"] = results1[0].carModel;
                                            results[0]["capacity"] = results1[0].capacity;
                                            results[0]["city"] = results1[0].city;
                                            results[0]["state"] = results1[0].state;
                                            results[0]["zipCode"] = results1[0].zipCode;
                                            console.log(results);
                                            response.status=200;
                                            response.data = results;
                                            callback(null, response);
                                        }
                                    }
                                    else {
                                        console.log("Empty");
                                        callback(null, response);
                                    }
                                }
                            })
                        }
                        else {
                            response.status=200;
                            response.data = results;
                            callback(null, response);
                        }
                    }
                    else {
                        response.status=200;
                        response.data = results;
                        callback(null, response);
                    }

                }
                else if(results.length===0){
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


