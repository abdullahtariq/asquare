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
  * @apiSuccess {String} result(user_id,post,time)  Response result(user id,post ,time).
 */



router.post("/newsfeed",function(req,res){
    userid = req.body.userid;
    if(typeof req.body.userid == 'undefined')
    {
      res.send({"status":false, "message":"user id is not given", "result":"user id is not given"}); 
      return;
    }
    else if(userid=="")
    {
      res.send({"status":false,"result":"user id is not given"}); 
      return;   
    }

    var arr=[];
    //arr.push(userid);
    userfollow.find({follower_id: userid },{"following_id": true }, function(err, result) 
      {
          if(err)
          {
            res.send({"status" : false , "result" : err});
          }
          else if(result)
          {
            for (var name in result) {
              if (result.hasOwnProperty(following_id)) {
                arr.push(following_id);
              }
            }
          }
      }); 
    res.send(arr);
    /*userPosts.find({user_id:userid},{"user_id": true, "post": true, "time":true},function(err, result) {
    if(err)
    {
      res.send({"status":false,"message":"Error",  "result":err});
    }
    if (Object.keys(result).length != 0)
    {
      //  Array of follows
   /*   var answer = result;
      var arr;
      userfollow.find({follower_id: userid},{"follow_id" : true}, function(err, result) {
          if(err)
          {
            res.send(err);
          }
          else
          {
            arr= result.map(function(item) {
                return item.id;
            });
            res.send(arr);
          }
      });
      return;
      
     //res.send({"status":true,"message" : "Post found",  "result":result});
    }
    else
    {
      res.send({"status":false,"message":"No post so far",  "result":"no post so far"});
    }
  });*/
 
});