  var express = require('express'),
  router = express.Router(),
   mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
  userPosts = mongoose.model('posts'),
  userfollow = mongoose.model('follows');

var user_id=0;
var userid=0;
module.exports = function (app) {
  app.use('/api', router);
};


/**
 * @api {Post} api/newsfeed Request to News Feed
 * @apiName News feed 
 * @apiGroup User_POST
 *
 * @apiParam {ID} userid login User ID.
 *
 *
 * @apiSuccess {Boolean} status  Response status.
 * @apiSuccess {String} message  Response message.
 * @apiSuccess {String} offset  Response offset.
 */



router.post("/newsfeed",function(req,res){
    var offset;
    var bucket;
    userid = req.body.userid;
    if(typeof req.body.userid == 'undefined')
    {
      res.send({"status":false, "message":"user id is not given"}); 
      return;
    }
    else if(typeof req.body.offset == 'undefined')
    {
      res.send({"status":false, "message":"offset is not given"}); 
      return;
    }
    else if(typeof req.body.bucket == 'undefined')
    {
      res.send({"status":false, "message":"bucket is not given"}); 
      return;
    }
    else if(userid=="")
    {
      res.send({"status":false,"message":"user id is not given"}); 
      return;   
    }
    offset=req.body.offset;
    bucket=req.body.bucket;
    if(offset == "")
    {
      res.send({"status":false, "message":"offset is empty"}); 
      return;
    }
    else if(bucket == "")
    {
      res.send({"status":false, "message":"bucket is empty"}); 
      return;
    }
    var arr=[];
    var postarr=[];
    var i = 0;
    userfollow.find({following_id: userid },{"follower_id": true }, function(err, result) 
      {
          if(err)
          {
            res.send({"status" : false , "result" : err});
          }
          else if(result)
          {
             for (; i < Object.keys(result).length; i++) {
               arr[i]=result[i].follower_id;
             }
          }
          arr[i]=userid;
      userPosts.find({user_id: { $in : arr } },{},{skip:parseInt(offset), limit:parseInt(bucket), sort: {time: -1 }}, function(err, result) {
          if(err)
          {
            res.send({"status":false,"message":"Error",  "result":err});
          }
          if (result)
          {
            offset = parseInt(offset)+parseInt(bucket)+1;
             res.send({"status" : true, "message" : result, "offset":offset});
          }
        });  
});
  });