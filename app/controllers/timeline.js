  var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
  userPosts = mongoose.model('posts');


module.exports = function (app) {
  app.use('/api', router);
};



/**
 * @api {Post} api/time_line Request to Show time line posts 
 * @apiName Timeline Posts
 * @apiGroup User_POST
 *
 * @apiParam {ID} user_id User Id of loginuser.
 * @apiParam {ID} myuser_id User Id of timeline user.
 * @apiParam {Int} offset Offset.
 * @apiParam {Int} bucket Bucket.
 *
 *
 * @apiSuccess {Boolean} stauts  Response stauts.
 * @apiSuccess {String} message  Response succussfully comment a post.
 * @apiSuccess {Boolean} isfollow  Response follow or not.
 */

 

router.post("/time_line", function(req,res){
    if(typeof req.body.user_id=='undefined')
    {
      res.send({"status" : false,"message" : "user_id is undefined"});
      return;
    }
    else if(typeof req.body.offset == 'undefined')
    {
      res.send({"status":false, "message":"offset is not given"}); 
      return;
    }
    else if(typeof req.body.myuser_id == 'undefined')
    {
      res.send({"status":false, "message":"myuser_id is not given"}); 
      return;
    }
    else if(typeof req.body.bucket == 'undefined')
    {
      res.send({"status":false, "message":"bucket is not given"}); 
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

    var user_id = req.body.user_id;
    var myuser_id = req.body.myuser_id;

    if(user_id=="")
    {
      res.send({"status" : false,"message" : "user_id is not given"});
      return;
    }
    else if(myuser_id=="")
    {
      res.send({"status" : false,"message" : "myuser_id is not given"});
      return;
    }
    userCollection.findOne({_id:myuser_id}, function(err,userFound){
      if(err)
      {
        res.send({"status" : false,"message" : "No user exits with this id"});
      }
      else if(userFound)
      {
        var isfollow = false;
        for (var j = 0; j < Object(userFound.follower).length; j++) {
                if(userFound.follower[j].following_id==user_id)
                {
                  isfollow = true;
                  break;
                }
              }
        userPosts.find({user_id:user_id},{},{skip:parseInt(offset), limit:parseInt(bucket), sort: {time: -1 }}, function(err,postes){
          if(err)
          {   
            res.send({"status" : false, "message" : err});
          }
          else if(Object(postes).length<=0)
          {
            res.send({"status" : false, "message" : "No posts found"});
          }
          else
          {
            offset = parseInt(offset)+parseInt(bucket)+1;
            res.send({"status" : true, "message" : postes, "offset":offset, "isfollow" : isfollow});
          }
        });
      }
    });
  }); 