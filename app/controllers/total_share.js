  var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userPosts = mongoose.model('posts'); 
 
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
          if(result.total_share=="")
          {
            res.send({"status" : true, "message" : "no post shares", "result":"0"});
          }
          else
          {
              res.send({"status" : true, "message" : "shares found", "result":result.total_share});
          }
        }
        else
        {
          res.send({"status" : false, "message" : "Post not found"});
        }
      });    
});