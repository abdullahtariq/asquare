  var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
  userPosts = mongoose.model('posts');
  
 
module.exports = function (app) {
  app.use('/api', router);
};

/**
 * @api {Post} api/post_detail see detail user post
 * @apiName Post detail
 * @apiGroup User_POST
 *
 * @apiParam {ID} post_id User Post id.
 *
 *
 * @apiSuccess {Boolean} status True/false.
 * @apiSuccess {String} message  Response message.
 * @apiSuccess {String} result  Response JSON object.
 */


router.post("/post_detail", function(req,res){
    if(typeof req.body.post_id=='undefined')
    {
        res.send({"status" : false , "message" : "post id is not given"});
        return;
    }
    var post_id= req.body.post_id;
    if(post_id=="")
    {
      res.send({"status" : false , "message" : "post id is empty"});
        return; 
    } 
    userPosts.findOne({_id:post_id}, function(err, result)
      {
        if(err)
        {
            res.send({"status" : false , "message" : "err", "result" : result});
            return;    
        }
        if(result)
        {
          res.send({"status" : true , "message" : "found", "result" : result});
            return;
        }
        else
        {
            res.send({"status" : false , "message" : "not found", "result" : result});
            return; 
        }
      });
});