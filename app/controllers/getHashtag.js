  var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userPosts = mongoose.model('posts'),
  userCollection = mongoose.model('users'),
  userhashtag = mongoose.model('hashtag');
  
var user_id=0;
var userid=0;
module.exports = function (app) {
  app.use('/api', router);
};



/**
 * @api {Post} api/get_hashtag Request to Get Post on Tags 
 * @apiName Get Post On HashTag
 * @apiGroup User_POST
 *
 * @apiParam {String} tag HashTag name.
 * @apiParam {Int} offset Offset.
 * @apiParam {Int} bucket Bucket.
 *
 *
 * @apiSuccess {Boolean} status  Response status.
 * @apiSuccess {String} message  Response posts.
 */


router.post("/get_hashtag",function(req,res){
    if(typeof req.body.tag=='undefined')
    {
      res.send({"status" : false , "message" : "tag is not given."});
        return;
    }
    else if(typeof req.body.offset == 'undefined')
    {
      res.send({"status":false, "message":"offset is not given"}); 
      return;
    }
    else if(typeof req.body.bucket == 'undefined')
    {
      res.send({"status":false, "message":"bucket is not given"}); 
      return;
    }
    offset=req.body.offset;
    bucket=req.body.bucket;
    tag = req.body.tag;
    if(tag=="")
    {
      res.send({"status" : false , "message" : "tag is empty."});
        return; 
    }
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
    userhashtag.findOne({tag:tag},function(err, tagFound){
          if(err)
          {
              res.send({"status" : false , "message" : err});
              return; 
          }
          else if(tagFound)
          {
            tagFound = tagFound.posts;
              var arr= new Array();
                    offset = parseInt(offset)+parseInt(bucket)+1;
                     for (var i = 0; i < Object(tagFound).length; i++) {
                          arr.push(tagFound[i].post_id);
                      } 
                      console.log(arr);
               userPosts.find(arr,{},{skip:parseInt(offset), limit:parseInt(bucket), sort: {time: -1 }}, function(err, result) {
                  if(err)
                  {
                    res.send({"status":false,"message":"Error",  "result":err});
                  }
                  if (Object(result).length>0)
                  {
                     res.send({"status" : true, "message" : result, "offset":offset});
                  }
                  else
                  {
                      res.send({"status" : false, "message" : "No post found", "offset":offset}); 
                  }
                });  
          }
    });
});