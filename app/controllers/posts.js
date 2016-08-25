var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userPosts= mongoose.model('posts');

module.exports = function (app) {
  app.use('/api', router);
};


/**
 * @api {Post} api/post Request to Add Post 
 * @apiName Post
 * @apiGroup User_POST
 *
 * @apiParam {String} post User Post.
 * @apiParam {ID} userid User Id .
 *
 *
 * @apiSuccess {Boolean} status True/false.
 * @apiSuccess {String} message  Response message.
 * @apiSuccess {ID} userid Response ID of login user.
 */



//  USER POSTS

router.post("/post",function(req,res){
    if(typeof req.body.userid=='undefined')
    {
      res.send({"status" : false , "message" : "userid is not given."});
        return;
    }
    else if(typeof req.body.post=='undefined')
    {
      res.send({"status" : false , "message" : "post is not given."});
        return;
    }
    var comment= req.body.post;
    userid = req.body.userid;
        
    if(comment == "")
    {
        res.send({"status" : false, "message" : "empty post"});
    }
    else if(typeof req.body.userid=='undefined')
    {
        res.send({"status" : false, "message" : "userid undefined"});
    }
    else
    {    var milliseconds = (new Date).getTime();
      var user1 = new userPosts(
        { user_id:userid,
          post: comment,
          time:milliseconds
        });
      user1.save(function (err, result) {
        if (err) {
          console.log(err);
        } else {
          res.send({"status" : true, "message" : "Successfully Posted" , "userid" : userid});
        }
      });
    }    
});