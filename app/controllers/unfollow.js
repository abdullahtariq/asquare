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
 * @api {Post} api/unfollow Request to Unfollow a friend 
 * @apiName UnFollow a friend
 * @apiGroup Follow
 *
 * @apiParam {ID} userid login User Id.
 * @apiParam {ID} friend_id friend User Id.
 *
 *
 * @apiSuccess {Boolean} stauts  Response stauts.
 * @apiSuccess {String} message  Response succussfully follow.
 */


router.post("/unfollow",function(req,res){
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
      res.send({"status" : false , "message" : "userid is empty"});
    }
    else if(option=="")
    {
      res.send({"status" : false , "message" : "friend_id is empty"});
    }


    userfollow.findOne({follower_id:option, following_id:userid}, function(err, result) 
      {
          if(err)
          {
            res.send({"status" : false , "message" : "Error", "result" : err});
            return;
          }
          else if(result)
          {
            userfollow.remove({follower_id: option, following_id:userid }, function(err, result) 
              {
                  if(err)
                  {
                    res.send({"status" : false , "message" : "Error", "result" : err});
                  }
                  else if(result)
                  {
                    res.send({"status" : true , "message" : "succussfully UnFollow"});
                  }
                  else
                  {
                    res.send({"status" : false , "message" : "You are not following this id"});
                  }
              });
          }
          else
          {
              res.send({"status" : false , "message" : "You are not following this id"});
          }
      });
});