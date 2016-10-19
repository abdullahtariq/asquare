  var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users');


var user_id=0;
var userid=0;
module.exports = function (app) {
  app.use('/api', router);
};


/**
 * @api {Post} api/view_profile Request to View Profile 
 * @apiName view profile
 * @apiGroup User
 *
 * @apiParam {ID} userid User id.
 *
 *
 * @apiSuccess {Boolean} status  Response status.
 * @apiSuccess {String} message  Response message.
  * @apiSuccess {String} result  Response JSON object.
 */



router.post("/view_profile", function(req,res){
    if(typeof req.body.userid=='undefined')
    {
      res.send({"status" : false , "message" : "userid is not given."});
        return;
    }
    var search = req.body.userid;
    if(search=="")
    {
      res.send({"status":false,"message":"userid is not given",  "result":"search bar is empty"});
    }
    else
    {
      userCollection.findOne({_id: search},{"_id":true,"first_name": true, "last_name":true,
          "profile_picture_url": true,
          "cover_picture_url":true,
          "user_name":true,
          "total_follower":true,
          "total_following":true},
        function(err, result) {
      if(err)
      {
        console.log("Not found");
      }
      if (result)
      {
        res.send({"status":true ,"message":"succussfully found", "result" : result});
      }
      else
      {
        res.send({"status":false,"message":"invalid userid",  "result":"invalid user name"});
      }
      });
    }
});