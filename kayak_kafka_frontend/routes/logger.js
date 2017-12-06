var express = require('express');
var winston = require('../config/winston');
var router = express.Router();

router.post('/logClicksPerPage', function(req, res, next) {

    console.log(req.session.username);

    let username = req.session.username;

    //Uncomment when Session issue is resolved
    // if(req.session.username!==null && req.session.username!==undefined){
    console.log(req.body);

    if(req.session.username){
        req.body.pageClick.userId = username ;
    }

    console.log("UserId "+req.body.pageClick.userId);

    let log = {pageClick: req.body.pageClick};
    console.log(log);
    console.log("Log added - ");

    winston.info(log);

    try{
        if(req.session.username!==null && req.session.username!==undefined && req.session.username !== 'admin'){
            let nwTime = new Date().getTime();
            if(req.session.flag){
                req.session.flag = false;
            }
            else{
                let prvTime = req.session.previousTime;
                let timeSpentOnPage = nwTime - prvTime;
                req.session.previousTime = nwTime;
                req.session.pages.push(req.session.lastPage);
                req.session.pageTime.push(timeSpentOnPage);
                req.session.lastPage = req.body.pageClick.pageName;
            }
        }
        else{
            // if(req.session.anonymous!==null && req.session.anonymous!==undefined){
            //
            // }
            // else{
            //
            // }
        }
    }
    catch(err){
        console.log(err);
    }

    // write code for updating index as new entry is logged

    res.send("Log added for "+ username+" for page - "+req.body.pageClick.pageName+" at "+req.body.pageClick.timeStamp);

    // let cond = true;
    //
    // let temp = {};
    //
    // let logs = [];
    //
    // require('fs').readFileSync('../kayak_kafka_frontend/log/analytics.log').toString().split('\r').forEach(function (line) {
    //     if(cond){
    //         temp = line.split('\n')[0];
    //         cond = false;
    //     }
    //     else{
    //         temp = line.split('\n')[1];
    //     }
    //     if(temp === ""){
    //         // for last line of file -- do nothing
    //     }
    //     else{
    //         let a = JSON.parse(temp);
    //         logs.push(a);
    //     }
    // });
    //
    // console.log(logs.length);
    //
    // console.log(logs);

});

// router.post('/logClicksPerProperty', function(req, res, next) {
//
//     console.log(req.session.username);
//
//     let username = req.session.username;
//
//     //Uncomment when Session issue is resolved
//     // if(req.session.username!==null && req.session.username!==undefined){
//     console.log(req.body);
//
//     if(req.body.propertyClick.userId === "anonymous"){
//         username = req.body.propertyClick.userId ;
//     }
//
//     console.log("UserId "+req.body.propertyClick.userId);
//
//     let log = {pageClick: req.body.propertyClick};
//     console.log(log);
//     console.log("Log added - ");
//
//     winston.info(log);
//
//     // write code for updating index as new entry is logged
//
//     res.send("Log added for "+ username+" for page - "+req.body.propertyClick.pageName+" at "+req.body.propertyClick.timeStamp);
//
// });

module.exports = router;
