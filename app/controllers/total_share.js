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
 * @api {Post} api/total_share Request total number share a user post
 * @apiName Total share of a post
 * @apiGroup User_POST
 *
 * @apiParam {ID} post_id User Post id.
 *
 *
 * @apiSuccess {Boolean} status True/false.
 * @apiSuccess {String} message  Response total share.
 */


router.post("/total_share", function(req,res){
    if(typeof req.body.post_id=='undefined')
    {
        res.send({"status" : false , "message" : "post id is not given"});
        return;
    }
    var post_id= req.body.post_id;
    var total_share=0;
    if(post_id=="")
    {
        res.send({"status" : false , "message" : "post id is empty"});
        return;
    }
    userPosts.findOne({_id:post_id}, function(err, result) 
      {
        if(err)
        {
          res.send({"status" : false, "message" : err});
        }
        else if(result)
        {
          res.send({"status" : true, "message" : result.share});
        }
        else
        {
          res.send({"status" : false, "message" : "Post not found"});
        }
      });    
});