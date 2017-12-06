let mysql = require('../../../mysql/mysql');
let Hotel = require('../../../Models/Hotel');
let ObjectId = require('mongodb').ObjectID;

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };

    try {
        console.log("Hosts Fetch");
        console.log(data);

        /*let fetchQuery = "select hb.hostId, h.hostName, hb.bookingId, hb.hotelId, hb.noOfPeople, hb.roomType, " +
            "hb.fromDate, hb.toDate, hb.ticketPrice, hb.totalAmount, hb.bill_day, hb.bill_month, hb.bill_year, " +
            "hb.username, t.firstname, t.lastname, t.email, t.phonenumber, t.travelerId "+
            "from hotelbooking as hb " +
            "join host as h " +
            "on hb.hostId = h.hostId " +
            "join travelerdetails as t " +
            "on hb.bookingId=t.bookingId " +
            "where t.bookingtype='hotel';";*/

        let fetchQuery = "select hb.hostId, h.hostName, hb.bookingId, hb.hotelId, hb.noOfPeople, hb.roomType, " +
            "hb.fromDate, hb.toDate, hb.ticketPrice, hb.totalAmount, hb.bill_day, hb.bill_month, "+
            "hb.bill_year, hb.username, t.firstname, t.lastname, t.email, t.phonenumber, t.travelerId "+
            "from host as h, hotelbooking as hb , "+
            "travelerdetails as t where hb.hostId = h.hostId and hb.bookingId=t.bookingId and  t.bookingtype='hotel';";

        if(data.hasOwnProperty("bookingId")){
            fetchQuery = "select hb.hostId, h.hostName, hb.bookingId, hb.hotelId, hb.noOfPeople, hb.roomType, " +
                "hb.fromDate, hb.toDate, hb.ticketPrice, hb.totalAmount, hb.bill_day, hb.bill_month, "+
                "hb.bill_year, hb.username, t.firstname, t.lastname, t.email, t.phonenumber, t.travelerId "+
                "from host as h, hotelbooking as hb , "+
                "travelerdetails as t where hb.hostId = h.hostId and hb.bookingId=t.bookingId and  t.bookingtype='hotel' " +
                "and hb.bookingId = "+ data.bookingId +";";
        }
        else if(data.hasOwnProperty("searchbyusername")){
            console.log(data.searchbyusername);
            fetchQuery = "select hb.hostId, h.hostName, hb.bookingId, hb.hotelId, hb.noOfPeople, hb.roomType, " +
                "hb.fromDate, hb.toDate, hb.ticketPrice, hb.totalAmount, hb.bill_day, hb.bill_month, "+
                "hb.bill_year, hb.username, t.firstname, t.lastname, t.email, t.phonenumber, t.travelerId "+
                "from host as h, hotelbooking as hb , "+
                "travelerdetails as t where hb.hostId = h.hostId and hb.bookingId=t.bookingId and  t.bookingtype='hotel' " +
                "and hb.username = '"+ data.searchbyusername +"';";
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
                    if(data.hasOwnProperty("fetchFullData")){
                        if(results.length===1){
                            Hotel.find({_id:results[0].hotelId}, function (err, results1) {
                                if(err){
                                    console.log(err);
                                    callback(err, null);
                                }
                                else {
                                    console.log(results1);
                                    if(results1){
                                        if(results1.length===1){
                                            results[0]["hotelName"] = results1[0].hotelName;
                                            results[0]["hotelAddress"] = results1[0].hotelAddress;
                                            results[0]["city"] = results1[0].city;
                                            results[0]["state"] = results1[0].state;
                                            results[0]["zipCode"] = results1[0].zipCode;
                                            results[0]["stars"] = results1[0].stars;
                                            results[0]["rooms"] = results1[0].rooms;
                                            response.status=200;
                                            response.data = results;
                                            callback(null, response);
                                        }
                                    }
                                }
                            })
                        }
                    }
                    else {
                        response.status=200;
                        response.data = results;
                        callback(null, response);
                    }
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


