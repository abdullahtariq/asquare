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


    userCollection.findOne({_id:option}, function(err,friend)
      {
        if(err)
          {
            res.send({"status" : false,"message" : "friend_id not exits"});
          return;
          }
        if(!friend)
        {
          res.send({"status" : false,"message" : "friend_id not exits"});
          return;
        }
        else
        {
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
            else
            {

              userfollow.findOne({follower_id:option, following_id:userid}, function(err, found){
                if(found)
                {
                    res.send({"status" : false,"message" : "you already follow this friend"});
                  return;
                }
                else
                {
                  var total_follower=friend.total_follower;
                  var total_following=result.total_following;
                  if (total_following=="")
                    total_following=0;
                  if(total_follower=="")
                    total_follower=0;
                  total_follower++;
                  total_following++;
                  friend.follower.push({following_id: result._id, following_first_name: result.first_name, following_last_name: result.last_name, following_profile_picture_url: result.profile_picture_url});
                  result.following.push({follower_id: friend._id, follower_first_name: friend.first_name, follower_last_name: friend.last_name, follower_profile_picture_url: friend.profile_picture_url});
                  result.save(function (err, tank) {
                    if(tank)
                    {
                       user1= new userfollow({
                        follower_id:option,
                        following_id: userid
                       });
                        

                       userCollection.findByIdAndUpdate(option, { $set: { "total_follower": total_follower}}, function(err,yes){
                        if(err)
                        {
                            res.send({"status" : false,"message" : err});
                            return;         
                        }
                       });
                       userCollection.findByIdAndUpdate(userid, { $set: { "total_following": total_following}}, function(err,yes){
                        if(err)
                        {
                            res.send({"status" : false,"message" : err});
                            return;         
                        }
                       });                        
                       user1.save();
                       friend.save();
                       res.send({"status":true, "message":"sucessfully follow"});                 
                    }
                  }); 
                }
              });
            }
          });
        }
      });
});