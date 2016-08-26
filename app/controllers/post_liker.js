  var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
  userPosts = mongoose.model('posts'),
  userlikes = mongoose.model('userlikes'),
  userfollow = mongoose.model('follows');

var user_id=0;
var userid=0;
module.exports = function (app) {
  app.use('/api', router);
};


/**
 * @api {Post} api/post_liker Request to Post liker 
 * @apiName Post likers
 * @apiGroup User_POST
 *
 * @apiParam {ID} post_id User Post id.
 *
 *
 * @apiSuccess {Boolean} stauts  Response stauts.
 * @apiSuccess {String} message  Response message.
 */


router.post("/post_liker",function(req,res){
    if(typeof req.body.post_id=='undefined')
    {
      res.send({"status" : false,"message" : "post_id is not given"});
      return;
    }
    var post_id = req.body.post_id;
    if(post_id=="")
    {
      res.send({"status" : false,"message" : "post_id is empty"});
      return; 
    }
    userlikes.find({post_id: post_id},{"user_id":true}, function(err, result) 
      {
          if(err)
          {
            res.send({"status" : false , "message" : err});
            return;
          }
          else if(result.length>0)
          {
            res.send({"status" : true , "message" : result});
            return;
          }
          else
          {
            res.send({"status" : false , "message" : "no likes for this post"});
            return;   
          }
      });
});