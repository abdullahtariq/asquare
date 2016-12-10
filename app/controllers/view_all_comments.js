  var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
   userPosts = mongoose.model('posts'),
  userfollow = mongoose.model('follows');

var user_id=0;
var userid=0;
module.exports = function (app) {
  app.use('/api', router);
};


/**
 * @api {Post} api/view_all_comments Request to View All Comments 
 * @apiName View all comments 
 * @apiGroup DASHBOARD
 *
 * @apiParam {ID} userid login User Id.
 * @apiParam {ID} post_id POst Id.
 * @apiParam {Int} offset Offset.
 * @apiParam {Int} bucket Bucket.
 *
 *
 * @apiSuccess {Boolean} status  Response stauts.
 * @apiSuccess {String} message  Response All coments array Json.
 * @apiSuccess {String} offset  Response offset.
 */


router.post("/view_all_comments",function(req,res){
    if(typeof req.body.userid=='undefined')
    {
      res.send({"status" : false,"message" : "userid id not given"});
      return;
    }
    else if(typeof req.body.post_id=='undefined')
    {
      res.send({"status" : false,"message" : "post_id is not given"});
      return;
    }
    var userid = req.body.userid;
    var post_id = req.body.post_id;
    if(userid=="")
    {
      res.send({"status" : false , "message" : "userid is empty"});
    }
    else if(post_id=="")
    {
      res.send({"status" : false , "message" : "post_id is empty"});
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


    userPosts.findOne({_id:post_id, user_id:userid}, {user_comment:{$slice: [parseInt(offset), parseInt(bucket)]}}, function(err,result){
      if(err)
      {
        res.send({"status" : false , "message" : "error... No result found"});
      }
      else if(result)
      {
         offset = parseInt(offset)+parseInt(bucket)+1;
             res.send({"status" : true, "message" : result.user_comment, "offset":offset});
      }
    });
});