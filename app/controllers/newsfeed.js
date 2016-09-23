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
 * @apiParam {Int} offset Offset.
 * @apiParam {Int} bucket Bucket.
 *
 *
 * @apiSuccess {Boolean} status  Response status.
 * @apiSuccess {String} message  Response  Array of Objects.
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
      res.send({"status":false,"message":"user id is empty"}); 
      return;   
    }
    offset=req.body.offset;
    bucket=req.body.bucket;
    userCollection.findOne({_id:userid}, function(err, user_result)
      {
        if(err)
        {
            res.send({"status":false, "message":"user id not exits"}); 
            return;     
        }
        else if(!user_result)
        {
            res.send({"status":false, "message":"user id not exits"}); 
            return;
        }
      });
    if(offset < 0)
    {
      res.send({"status":false, "message":"offset is -ve"}); 
      return;
    }
    if(bucket <= 0)
    {
      res.send({"status":false, "message":"bucket is undefined"}); 
      return;
    }
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
            for (var i = 0; i < Object(result).length; i++) {
                  for (var j = 0; j < Object(result[i].user_likes).length; j++) {
                    console.log();
                      if (result[i].user_likes[j].like_user_id==userid)
                      {
                        result[i].islike=true;
                      } 
                  }
            }
             res.send({"status" : true, "message" : result, "offset":offset});
          }
        });  
});
  });