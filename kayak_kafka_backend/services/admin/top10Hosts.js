let mysql = require('../../mysql/mysql');

function compare(a,b) {
    if (a.data < b.data)
        return 1;
    if (a.data > b.data)
        return -1;
    return 0;
}

// data.sort(function (a, b) {
//     return a.name.localeCompare(b.name);
// });
// response.analytics.top10Hosts.sort(function(a, b) {
//     return a.data > b.data;
// });

handle_request = ((data, callback) => {
    let response = {
        status: 400,
        analytics:{
            top10Hosts: [
                // {
                //     label: "A",
                //     data: 170
                // },
                // {
                //     label: "B",
                //     data: 160
                // },
                // {
                //     label: "C",
                //     data: 150
                // },
                // {
                //     label: "D",
                //     data: 140
                // },
                // {
                //     label: "E",
                //     data: 130
                // },
                // {
                //     label: "F",
                //     data: 120
                // },
                // {
                //     label: "G",
                //     data: 110
                // },
                // {
                //     label: "H",
                //     data: 100
                // },
                // {
                //     label: "I",
                //     data: 90
                // },
                // {
                //     label: "J",
                //     data: 80
                // },
                // {
                //     label: "K",
                //     data: 70
                // },
                // {
                //     label: "L",
                //     data: 60
                // },
                // {
                //     label: "M",
                //     data: 50
                // },
                // {
                //     label: "N",
                //     data: 40
                // },
                // {
                //     label: "O",
                //     data: 30
                // },
                // {
                //     label: "P",
                //     data: 20
                // },
            ]
        }
    };
    try {

        console.log('In Handle request for top10Hosts');

        let sqlQuery_hotels = "select h.hostName, SUM(hb.totalAmount) as totalRevenue from host as h " +
            "left outer join hotelbooking as hb " +
            "on h.hostId=hb.hostId " +
            " where h.serviceType='hotel' and hb.bill_year="+(new Date().getFullYear())+
            " group by h.hostId " +
            "order by totalRevenue desc limit 10";

        // let sqlQuery_hotels = "select h.hostName, SUM(hb.totalAmount) as totalRevenue from hotelbooking as hb join host as h on hb.hostId=h.hostId group by hb.hostId order by totalRevenue desc limit 10";

        mysql.fetchData(function(err,results){

            if(err){

                console.log(`Database query Error - ${err}`);
                callback(err, null);
            }

            else{

                if(results){

                    results.forEach(function (result) {
                        console.log("Pushed - "+result.hostName);
                        if(result.totalRevenue === null){
                            response.analytics.top10Hosts.push({label: result.hostName, data: 0});
                        }
                        else{
                            response.analytics.top10Hosts.push({label: result.hostName, data: result.totalRevenue});
                        }
                    });

                    let sqlQuery_flights = "select h.hostName, SUM(fb.totalAmount) as totalRevenue from host as h " +
                        "left outer join flightbooking as fb " +
                        "on h.hostId=fb.hostId " +
                        " where h.serviceType='flight' and fb.bill_year="+(new Date().getFullYear())+
                        " group by h.hostId " +
                        "order by totalRevenue desc limit 10";

                    // let sqlQuery_flights = "select h.hostName, SUM(fb.totalAmount) as totalRevenue from flightbooking as fb join host as h on fb.hostId=h.hostId group by fb.hostId order by totalRevenue desc limit 10";

                    mysql.fetchData(function(err,results) {

                        if (err) {

                            console.log(`Database query Error - ${err}`);
                            callback(err, null);
                        }
                        else {
                            if (results) {

                                results.forEach(function (result) {
                                    console.log("Pushed - "+result.hostName);
                                    if(result.totalRevenue === null){
                                        response.analytics.top10Hosts.push({label: result.hostName, data: 0});
                                    }
                                    else{
                                        response.analytics.top10Hosts.push({label: result.hostName, data: result.totalRevenue});
                                    }
                                });

                                let sqlQuery_cars = "select h.hostName, SUM(cb.totalAmount) as totalRevenue from host as h " +
                                    "left outer join carbooking as cb " +
                                    "on h.hostId=cb.hostId " +
                                    " where h.serviceType='car' and cb.bill_year="+(new Date().getFullYear())+
                                    " group by h.hostId " +
                                    "order by totalRevenue desc limit 10";

                                mysql.fetchData(function(err,results) {

                                    if (err) {

                                        console.log(`Database query Error - ${err}`);
                                        callback(err, null);
                                    }
                                    else {

                                        if (results) {

                                            results.forEach(function (result) {
                                                console.log("Pushed - "+result.hostName);
                                                if(result.totalRevenue === null){

                                                    response.analytics.top10Hosts.push({label: result.hostName, data: 0});

                                                }
                                                else{

                                                    response.analytics.top10Hosts.push({label: result.hostName, data: result.totalRevenue});

                                                }
                                            });

                                            response.analytics.top10Hosts.sort(compare);

                                            // console.log("-----------------------------------------------");
                                            // if(response.analytics.top10Hosts[0]){
                                            //
                                            //     console.log("L --- 0 --- "+response.analytics.top10Hosts[0].label);
                                            //     console.log("D --- 0 --- "+response.analytics.top10Hosts[0].data);
                                            //     console.log("L --- 1 --- "+response.analytics.top10Hosts[1].label);
                                            //     console.log("D --- 1 --- "+response.analytics.top10Hosts[1].data);
                                            //     console.log("L --- 2 --- "+response.analytics.top10Hosts[2].label);
                                            //     console.log("D --- 2 --- "+response.analytics.top10Hosts[2].data);
                                            //     console.log("L --- 3 --- "+response.analytics.top10Hosts[3].label);
                                            //     console.log("D --- 3 --- "+response.analytics.top10Hosts[3].data);
                                            //     console.log("L --- 4 --- "+response.analytics.top10Hosts[4].label);
                                            //     console.log("D --- 4 --- "+response.analytics.top10Hosts[4].data);
                                            //     console.log("L --- 5 --- "+response.analytics.top10Hosts[5].label);
                                            //     console.log("D --- 5 --- "+response.analytics.top10Hosts[5].data);
                                            //     console.log("L --- 6 --- "+response.analytics.top10Hosts[6].label);
                                            //     console.log("D --- 6 --- "+response.analytics.top10Hosts[6].data);
                                            //     console.log("L --- 7 --- "+response.analytics.top10Hosts[7].label);
                                            //     console.log("D --- 7 --- "+response.analytics.top10Hosts[7].data);
                                            //     console.log("L --- 8 --- "+response.analytics.top10Hosts[8].label);
                                            //     console.log("D --- 8 --- "+response.analytics.top10Hosts[8].data);
                                            //     console.log("L --- 9 --- "+response.analytics.top10Hosts[9].label);
                                            //     console.log("D --- 9 --- "+response.analytics.top10Hosts[9].data);
                                            //     console.log("-----------------------------------------------");

                                            // }

                                            // convert to required format

                                            response.status = 200;

                                            callback(null, response);

                                        }

                                        else{

                                            console.log("No results received");

                                        }

                                    }

                                },sqlQuery_cars);

                            }

                            else{

                                console.log("No results received");

                            }

                        }

                    },sqlQuery_flights);

                }

                else{

                    console.log("No results received");

                }

            }

        },sqlQuery_hotels);

    }

    catch (e) {
        console.log(e);
        callback(e, response);
    }
});

exports.handle_request = handle_request;
