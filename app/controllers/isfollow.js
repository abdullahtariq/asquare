  var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
  userfollow = mongoose.model('follows');

var user_id=0;
var userid=0;
module.exports = function (app) {
  app.use('/api', router);
};


/**
 * @api {Post} api/isfollow Request to isfollow a friend 
 * @apiName Check follow or not
 * @apiGroup Follow
 *
 * @apiParam {ID} userid login User Id.
 * @apiParam {ID} friend_id friend User Id.
 *
 *
 * @apiSuccess {Boolean} status  Response stauts.
 * @apiSuccess {String} message  Response follow.
 */


router.post("/isfollow",function(req,res){
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


    userCollection.findOne({_id:userid},function(err,ress){
      if(err)
      {
        res.send({"status" : false , "message" : "Error", "result" : "user id or friend_id is wrong"});
      }
      else if(ress)
      {
        userfollow.findOne({follower_id:option, following_id:userid}, function(err, result) 
          {
              if(err)
              {
                res.send({"status" : false , "message" : "Error", "result" : err});
              }
              else if(result)
              {
                res.send({"status" : true , "message" : "you are follower of this friend"});
              }
              else
              {
                res.send({"status" : false , "message" : "You are not following this friend"});
              }
          });
      }
      else
      {
        res.send({"status" : false , "message" : "Error", "result" : "user id or friend_id is wrong"}); 
      }
    });
});