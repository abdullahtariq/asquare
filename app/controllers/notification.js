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
 * @api {Post} api/notification Request to see notification
 * @apiName See notification
 * @apiGroup USER_NOTIFICATIONS
 *
 * @apiParam {ID} userid User id.
 * @apiParam {Int} offset Offset.
 * @apiParam {Int} bucket Bucket.
 *
 *
 * @apiSuccess {Boolean} status  Response status.
 * @apiSuccess {String} message  Response  Array of Objects.
 * @apiSuccess {String} offset  Response offset.
 */


/**
 * @api {Socket} notification To see number of unreadable notification
 * @apiName Number of unseen notification
 * @apiGroup USER_NOTIFICATIONS
 *
 * @apiParam {ID} userid User Id.
 *
 *
 * @apiSuccess {Boolean} status  Response status.
 * @apiSuccess {String} message  Response  Number of notification.
 */


router.post("/notification", function(req,res){
    if(typeof req.body.userid=='undefined')
    {
        res.send({"status" : false , "message" : "userid is not given"});
        return;
    }
    var userid= req.body.userid;
    if( userid == "")
    {
        res.send({"status" : false , "message" : "User id is not given "});
        return;
    }

    offset=req.body.offset;
    bucket=req.body.bucket;


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



    userCollection.findOne({_id:userid},{notification:{$slice: [parseInt(offset), parseInt(bucket)]}},{sort: {notification_time: -1 }},function(err,found){
      if(err)
          {
            res.send({"status":false,"message":"Error",  "result":err});
          }
          if (found)
          {
            offset = parseInt(offset)+parseInt(bucket)+1;
             res.send({"status" : true, "message" : found.notification, "offset":offset});
          }
          console.log(found);
    });
     
});