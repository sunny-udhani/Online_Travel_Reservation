let UserTraceTree = require('../../Models/UserTraceTree');
let UserTimePerPage = require('../../Models/UserTimePerPage');

handle_request = ((data, callback) => {
    let response = {
        status: 400,
        data:{
            message: '',
            pages: [],
            pageTime: []
        }
    };
    try {

        let searchQuery={
            userId : data.tree.userId
        };

        let updateQuery={
            $set:
                {
                    userId: data.tree.userId,
                    page: data.tree.pages,
                    timePerPage: data.tree.pageTime,
                }
        };

        console.log(searchQuery);

        console.log(updateQuery);

        UserTraceTree.updateOne(
            searchQuery,
            updateQuery,
            {upsert: true} ,
            function (err, result) {
                if(err){
                    console.log(err);
                    callback(err, response);
                }
                else {
                    if(result){
                        if(result.nModified ===1 || result.nModified===0){

                            if(result.nModified===1){
                                console.log("Updated one user tree - "+result);
                            }

                            if(result.nModified===0){
                                console.log("Coudn't find user tree added new one - "+result);
                            }

                            // --------------------

                            console.log(" -------------- Time Per Page -------------------");

                            console.log(data.timePerPage);

                            let userTimePerPage = new UserTimePerPage({
                                userId: data.timePerPage.userId,
                                UserHome: data.timePerPage.UserHome,
                                SignIn: data.timePerPage.SignIn,
                                SignUp: data.timePerPage.SignUp,
                                HotelListing: data.timePerPage.HotelListing,
                                CarListing: data.timePerPage.CarListing,
                                FlightListing: data.timePerPage.FlightListing,
                                UserProfile: data.timePerPage.UserProfile,
                                UserPaymentPage: data.timePerPage.UserPaymentPage,
                                SuccesfulPayment: data.timePerPage.SuccesfulPayment
                            });

                            console.log(" -------------- Time Per Page Modal -------------------");

                            console.log(userTimePerPage);

                            userTimePerPage.save(function (err, results) {

                                if(err){
                                    console.log(err);
                                    callback(err, response);
                                }
                                else{

                                    console.log("Saved userTimePerPage : ");
                                    console.log(results);

                                    if(results) {
                                        response.status = 200;
                                        response.data.message = "Saved userTimePerPage and userTraceTree in mongoDB";
                                        // response.data.pages = data.pages;
                                        // response.data.pageTime = data.pageTime;
                                        callback(null, response);
                                    }
                                    else{
                                        response.status = 404;
                                        callback(null, response);
                                    }

                                }


                            });

                                // --------------------

                        }
                        else {
                            response.status=400;
                            callback(null, response);
                        }
                    }
                    else {
                        response.status=400;
                        callback(null, response);
                    }
                }
        });

        // console.log(" -------------- Tree -------------------");
        //
        // console.log(data.tree);
        //
        // let userTraceTree = new UserTraceTree({
        //     userId: data.tree.userId,
        //     page: data.tree.pages,
        //     timePerPage: data.tree.pageTime,
        // });
        //
        // console.log(" -------------- Tree Modal -------------------");
        //
        // console.log(userTraceTree);

    }
    catch (e) {
        console.log(e);
        callback(e, response);
    }
});

exports.handle_request = handle_request;


