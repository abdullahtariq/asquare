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
 * @api {Post} api/total_likes Request to see total number like a user post
 * @apiName Total Likes of a post
 * @apiGroup User_POST
 *
 * @apiParam {ID} post_id User Post id.
 *
 *
 * @apiSuccess {Boolean} status True/false.
 * @apiSuccess {String} message  Response total likes .
 */


router.post("/total_likes", function(req,res){
    if(typeof req.body.post_id=='undefined')
    {
        res.send({"status" : false , "message" : "post id is not given"});
        return;
    }
    var post_id= req.body.post_id;
    var total_likes=0;
    if(post_id=="")
    {
        res.send({"status" : false , "message" : "post id is not given"});
        return;
    }
    userPosts.findOne({_id:post_id},{"likes": true }, function(err, result) 
      {
        if(err)
        {
          res.send({"status" : false, "message" : err});
        }
        else if(result)
        {
          res.send({"status" : true, "message" : result.likes});
        }
        else
        {
          res.send({"status" : false, "message" : "Post not found"});
        }
      });    
});