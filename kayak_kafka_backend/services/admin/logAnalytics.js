const elasticsearch = require('elasticsearch');
const esClient = new elasticsearch.Client({
    host: '127.0.0.1:9200',
    log: 'info'
});

create_Index = ((data,callback)=>{

    try{

    let bulkBody = [];

    // let index = "useranalytics"+Math.random();
    let index = "useranalytics";

    esClient.indices.exists({index: index},function(err,resp,status) {

        console.log("Exists - ", resp);

        if (resp) {

            esClient.indices.delete({index: index},function(err,resp,status) {
                console.log("delete ",resp);

                let type = "userinfo";

                let i = 0;

                let temp = true;

                data.forEach( d => {

                    if(temp){
                        console.log("Type of d - "+ typeof d);
                        console.log(d.pageClick);
                        if(d.pageClick !== undefined){
                            console.log("Page - "+d.pageClick);
                        }
                        if(d.propertyClick !== undefined){
                            console.log("Property - "+d.propertyClick);
                        }
                        temp = false;
                    }

                    bulkBody.push({
                        index: {
                            _index: index,
                            _type: type,
                            _id: i++
                        }
                    });

                    if(d.pageClick !== undefined){
                        bulkBody.push(d.pageClick);
                    }
                    if(d.propertyClick !== undefined){
                        bulkBody.push(d.propertyClick);
                    }

                });

                esClient.bulk({headers: {'content-type': 'application/x-ndjson'}, body: bulkBody})
                    .then(response => {

                        console.log(response);

                        // Code was here
                        console.log(`Successfully indexed ${data.length} items ----- after deleting`);

                        let results = {

                            pageClicks:{
                                UserHome: 10,
                                SignIn: 10,
                                SignUp: 10,
                                HotelListing: 10,
                                CarListing: 10,
                                FlightListing: 10,
                                UserProfile: 10,
                                UserPaymentPage: 10,
                                SuccesfulPayment: 10
                            },
                            propertyClicks:{
                                Hotel: 10,
                                Flight: 10,
                                Car: 10
                            }

                        };

                        // esClient.cat.indices(
                        //     {v: true})
                        //     .then(console.log)
                        //     .catch(err => console.error(`Error connecting to the es client: ${err}`)
                        //     );

                        setTimeout(function(){ callback(results); }, 1500);

                    })
                    .catch(err => console.log(err));

            });

        }

        else{

            let type = "userinfo";

            let i = 0;

            let temp = true;

            data.forEach( d => {

                if(temp){
                    console.log("Type of d - "+ typeof d);
                    console.log(d.pageClick);
                    if(d.pageClick !== undefined){
                        console.log("Page - "+d.pageClick);
                    }
                    if(d.propertyClick !== undefined){
                        console.log("Property - "+d.propertyClick);
                    }
                    temp = false;
                }

                bulkBody.push({
                    index: {
                        _index: index,
                        _type: type,
                        _id: i++
                    }
                });

                if(d.pageClick !== undefined){
                    bulkBody.push(d.pageClick);
                }
                if(d.propertyClick !== undefined){
                    bulkBody.push(d.propertyClick);
                }

            });

            esClient.bulk({headers: {'content-type': 'application/x-ndjson'}, body: bulkBody})
                .then(response => {

                    console.log(response);

                    // Code was here
                    console.log(`Successfully indexed ${data.length} items`);

                    let results = {

                        pageClicks:{
                            UserHome: 10,
                            SignIn: 10,
                            SignUp: 10,
                            HotelListing: 10,
                            CarListing: 10,
                            FlightListing: 10,
                            UserProfile: 10,
                            UserPaymentPage: 10,
                            SuccesfulPayment: 10
                        },
                        propertyClicks:{
                            Hotel: 10,
                            Flight: 10,
                            Car: 10
                        }

                    };

                    // esClient.cat.indices(
                    //     {v: true})
                    //     .then(console.log)
                    //     .catch(err => console.error(`Error connecting to the es client: ${err}`)
                    //     );

                    setTimeout(function(){ callback(results); }, 1500);

                })
                .catch(err => console.log(err));

        }

    });
    }
    catch (e){
        console.log(e);
    }

});

perform_analytics = ((callback) => {

    try {
        let index = "useranalytics";

        let results = {

            pageClicks: {
                UserHome: 10,
                SignIn: 10,
                SignUp: 10,
                HotelListing: 10,
                CarListing: 10,
                FlightListing: 10,
                UserProfile: 10,
                UserPaymentPage: 10,
                SuccesfulPayment: 10
            },
            propertyClicks: {
                Hotel: 10,
                Flight: 10,
                Car: 10
            }

        };

        let pages = ['UserHome', 'SignIn', 'SignUp', 'HotelListing', 'CarListing', 'FlightListing', 'UserProfile', 'UserPaymentPage','SuccesfulPayment'];

        let properties = ['Hotel', 'Flight', 'Car'];

        let countPages = 9;

        let countProperties = 3;

        pages.forEach(page => {

            let body = {
                from: 0,
                query: {
                    match: {
                        pageName: {
                            query: page
                        }
                    }
                }
            };

            esClient.search({index: index, body: body})
                .then(result => {
                    console.log(`For ${page} - found ${result.hits.total} counts in ${result.took}ms`);

                    switch (page) {
                        case 'UserHome':
                            results.pageClicks.UserHome = result.hits.total;
                            break;
                        case 'SignIn':
                            results.pageClicks.SignIn = result.hits.total;
                            break;
                        case 'SignUp':
                            results.pageClicks.SignUp = result.hits.total;
                            break;
                        case 'HotelListing':
                            results.pageClicks.HotelListing = result.hits.total;
                            break;
                        case 'CarListing':
                            results.pageClicks.CarListing = result.hits.total;
                            break;
                        case 'FlightListing':
                            results.pageClicks.FlightListing = result.hits.total;
                            break;
                        case 'UserProfile':
                            results.pageClicks.UserProfile = result.hits.total;
                            break;
                        case 'UserPaymentPage':
                            results.pageClicks.UserPaymentPage = result.hits.total;
                            break;
                        case 'SuccesfulPayment':
                            results.pageClicks.SuccesfulPayment = result.hits.total;
                            break;
                        default:
                    }

                    countPages--;

                    if (countPages === 0) {

                        properties.forEach(property => {

                            let body = {
                                from: 0,
                                query: {
                                    match: {
                                        propertyName: {
                                            query: property
                                        }
                                    }
                                }
                            };

                            esClient.search({index: index, body: body})
                                .then(result => {
                                    console.log(`For ${property} - found ${result.hits.total} counts in ${result.took}ms`);

                                    switch (property) {
                                        case 'Hotel':
                                            results.propertyClicks.Hotel = result.hits.total;
                                            break;
                                        case 'Flight':
                                            results.propertyClicks.Flight = result.hits.total;
                                            break;
                                        case 'Car':
                                            results.propertyClicks.Car = result.hits.total;
                                            break;
                                        default:
                                    }

                                    countProperties--;

                                    if (countProperties === 0) {
                                        console.log("Returning results UserHome - " + results.pageClicks.UserHome + " UserProfile - " + results.pageClicks.UserProfile);
                                        callback(results);
                                    }
                                });
                        });
                    }


                    // if (results.hits.total > 0) console.log(`returned article titles:`);
                    // results.hits.hits.forEach((hit, index) => console.log(`\t${body.from + ++index} - ${hit._source.pageName} (score: ${hit._score})`));

                })
                .catch(err => console.error(`Error connecting to the es client: ${err}`));

        });
    }
    catch (e){
        console.log(e);
    }
});

handle_request = ((data, callback) => {
try {
    // console.log(data[0].click);

    let response = {status: 400, analytics: {}};

    create_Index(data,
        function (results) {
            try {

                // response.status = 200;
                // // response.clicksPerPage = {UserProfile:results.hits.total};
                // // response.clicksPerPage = results;
                // console.log(results.pageClicks.UserProfile);
                // response.analytics = results;
                // callback(null, response);

                perform_analytics(
                    function (results) {
                        try {
                            response.status = 200;
                            // response.clicksPerPage = {UserProfile:results.hits.total};
                            // response.clicksPerPage = results;
                            console.log(results.pageClicks.UserProfile);
                            response.analytics = results;
                            callback(null, response);
                        }
                        catch (e) {
                            console.log(e);
                            callback(e, response);
                        }
                    });

            }
            catch (e) {
                console.log(e);
                callback(e, response);
            }
        }
    );

    // perform_analytics(
    //     function (results) {
    //         try {
    //             response.status = 200;
    //             // response.clicksPerPage = {UserProfile:results.hits.total};
    //             // response.clicksPerPage = results;
    //             console.log(results.pageClicks.UserProfile);
    //             response.analytics = results;
    //             callback(null, response);
    //         }
    //         catch (e) {
    //             console.log(e);
    //             callback(e, response);
    //         }
    // });
    }
    catch (e){
        console.log(e);
    }
});

exports.handle_request = handle_request;
