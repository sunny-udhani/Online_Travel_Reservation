let express = require('express');
let router = express.Router();
var kafka = require('./kafka/client');

router.post('/getHotelRoom',function(req,res){
    console.log("dsd");
    try{
        console.log(req.body);
        kafka.make_request('fetchhotelrooms_topic',req.body,function (err,results) {
            console.log(results);
            console.log(JSON.stringify(results.rooms))
            if(results.code==200){
                res.json(results.user);


            }
            else {
                res.status(404).json({message:"Not found"})
            }
        })
    }

    catch (e){
        console.log(e);
        res.status(400).json({message: "Failed to Get"});
    }

});
module.exports = router;
