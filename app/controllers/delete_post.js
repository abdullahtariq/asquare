  var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
  userPosts = mongoose.model('posts'),
  userfollow = mongoose.model('follows')
  postShare = mongoose.model('share');

module.exports = function (app) {
  app.use('/api', router);
};


/**
 * @api {Post} api/delete_post Request to delete post 
 * @apiName delete Post
 * @apiGroup User_POST
 *
 * @apiParam {ID} post_id Post Id.
 *
 *
 * @apiSuccess {Boolean} stauts  Response stauts.
 * @apiSuccess {String} message  Response succussfully Delete.
 */


router.post("/delete_post",function(req,res){
    if(typeof req.body.post_id=='undefined')
    {
      res.send({"status" : false,"message" : "post_id is undefined"});
      return;
    }
    var post_id = req.body.post_id;
    if(post_id=="")
    {
      res.send({"status" : false,"message" : "post_id is not given"});
      return;
    }
    
    userPosts.remove({_id: post_id},function(err, result) {
        if(err)
        {
          res.send({"status":false, "message":err});
        }
        if (result)
        {  
          
                    res.send({"status" : true , "message" : "succussfully deteled"});
        }
        else
        {
            res.send({"status":false, "message":"no post exits with this id"});   
        }   
        });
});