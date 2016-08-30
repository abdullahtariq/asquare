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
 * @api {Post} api/unlike_post Request to Unlike a user post
 * @apiName Unlike post
 * @apiGroup User_POST
 *
 * @apiParam {ID} post_id User Post id.
 * @apiParam {ID} userid User Who like post.
 *
 *
 * @apiSuccess {Boolean} status True/false.
 * @apiSuccess {String} message  Response message.
 */


router.post("/unlike_post", function(req,res){
    if(typeof req.body.post_id=='undefined')
    {
        res.send({"status" : false , "message" : "post id is not given"});
        return;
    }
    else if(typeof req.body.userid=='undefined')
    {
        res.send({"status" : false , "message" : "userid is not given"});
        return;
    }
    var post_id= req.body.post_id;
    var userid= req.body.userid;
    var total_likes=0;
    if(post_id=="")
    {
        res.send({"status" : false , "message" : "post id is not given"});
        return;
    }
    else if( userid == "")
    {
        res.send({"status" : false , "message" : "User id is not given "});
        return;
    }

     userCollection.findOne({_id: userid},{"_id":true,"Name": true, "Lname":true},function(err, result) {
          if(err)
          {
            console.log("Not found");
            return;
          }
          if (!result)
          {
            res.send({"status":false ,"message":"not user exits with this id"});
            return;
          }
      });
    userlikes.findOne({post_id: post_id,user_id:userid},function(err, result) {
    if(err)
    {
      res.send({"status":false, "message":err});
    }
    if (result)
    {  
        userPosts.findOne({_id: post_id},function(err, result) {
        if(err)
        {
          res.send({"status":false, "message":err});
        }
        if (result)
        {  
            if(typeof result.likes=='undefined')
                total_likes=0;
            else
                total_likes=result.likes;
            total_likes--;
            userPosts.findByIdAndUpdate(post_id, { $set: { likes: total_likes}}, function (err, tank) {
              if (err) 
                {res.send({"status":false, "message" : err});}
              else
                {
                    userlikes.remove({post_id: post_id, user_id:userid }, function(err, result) 
                      {
                          if(err)
                          {
                            res.send({"status" : false , "message" : err});
                          }
                          else if(result)
                          {
                            res.send({"status" : true , "message" : "succussfully unlike"});
                          }
                          else
                          {
                            res.send({"status" : false , "message" : "Erroorrrroorrroorrr"});
                          }
                      });
                }  
            });
        }
        else
        {
            res.send({"status":false, "message":"no post exits with this id"});   
        }   
        });
    }
    else
    {
        res.send({"status":false, "message":"you have not like this post"});
    }
    }); 
});