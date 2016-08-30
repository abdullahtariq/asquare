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
 * @api {Post} api/follow_friend Request to Follow a friend 
 * @apiName Follow a friend
 * @apiGroup Follow
 *
 * @apiParam {ID} userid login User Id.
 * @apiParam {ID} friend_id friend User Id.
 *
 *
 * @apiSuccess {Boolean} stauts  Response stauts.
 * @apiSuccess {String} message  Response succussfully follow.
 */


router.post("/follow_friend",function(req,res){
    if(typeof req.body.userid=='undefined')
    {
      res.send({"status" : false,"message" : "userid id not given"});
      return;
    }
    else if(typeof req.body.friend_id=='undefined')
    {
      res.send({"status" : false,"message" : "friend_id is not given"});
      return;
    }
    var userid = req.body.userid;
    var option = req.body.friend_id;
    if(userid=="")
    {
      res.send({"status" : false,"message" : "userid is empty"});
      return;
    }
    else if(option=="")
    {
      res.send({"status" : false,"message" : "friend_id is empty"});
      return;
    }


    userCollection.findOne({_id:userid}, function(err,result)
      {
        if(err)
          {
            res.send({"status" : false,"message" : "userid not exits"});
          return;
          }
        if(!result)
        {
          res.send({"status" : false,"message" : "userid not exits"});
          return;
        }
      });



    userCollection.findOne({_id:option}, function(err,result)
      {
        if(err)
          {
            res.send({"status" : false,"message" : "friend_id not exits"});
          return;
          }
        if(!result)
        {
          res.send({"status" : false,"message" : "friend_id not exits"});
          return;
        }
      });



    var user1 = new userfollow(
      {
       follower_id: option, 
        following_id: userid
        });
    userfollow.findOne({follower_id: option, following_id:userid}, function(err, result) 
      {
          if(err)
          {
            res.send({"status" : false , "message" : "Error", "result" : err});
            return;
          }
          else if(result)
          {
            res.send({"status" : false , "message" : "you are already follower of this friend"});
            return;
          }
          else
          {
              user1.save(function (err, result) {
                if (err) {
                  res.send({"status" : false, "message":"Error", "result" : err });
                } else {
                  res.send({"status" : true,"message" : "successfully follow" });
                }
              });
          }
      });
});