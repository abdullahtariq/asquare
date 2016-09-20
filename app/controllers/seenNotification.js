var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
  userPosts = mongoose.model('posts'),
  userlikes = mongoose.model('userlikes'),
  userfollow = mongoose.model('follows'); 
 
module.exports = function (app) {
  app.use('/api', router);
};

/**
 * @api {Post} api/seen Request to notification Seen
 * @apiName Notification seen
 * @apiGroup USER_NOTIFICATIONS
 *
 * @apiParam {ID} userid User Who like post.
 * @apiParam {ID} notification_id Offset.
 *
 *
 * @apiSuccess {Boolean} status  Response status.
 * @apiSuccess {String} message  Response  Message.
 */



router.post("/seen", function(req,res){
    if(typeof req.body.userid=='undefined')
    {
        res.send({"status" : false , "message" : "userid is not given"});
        return;
    }
    else if(typeof req.body.notification_id=='undefined')
    {
        res.send({"status" : false , "message" : "notification_id not given"});
        return;
    }
    var userid= req.body.userid;
    var notification_id = notification_id;
    if( userid == "")
    {
        res.send({"status" : false , "message" : "User id is not given "});
        return;
    }
    else if(notification_id=="")
    {
        res.send({"status" : false , "message" : "notification_id is empty"});
        return;
    }

    userCollection.update({_id:userid, "notification.$._id":notification_id}, {$set: { "notification.$.notification_seen": true}}, function(err, update)
      {
        if(err)
        {
            res.send({"status" : false , "message" : "err"});
        return;
        }
        else if(update)
        {
          res.send({"status" : true , "message" : "sucessfully seen"});
        return;     
        }
      });
});