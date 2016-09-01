  var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
  userPosts = mongoose.model('posts');


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

     userCollection.findOne({_id: userid},{"_id":true,"Name": true, "Lname":true},function(err, user) {
          if(err)
          {
            res.send({"status" : false , "message" : "userid not exits"});
            return;
          }
          if (!user)
          {
            res.send({"status":false ,"message":"not user exits with this id"});
            return;
          }
          else
          {
              userPosts.findOne({_id: post_id},function(err, post) {
                if(err)
                {
                  res.send({"status":false, "message":err});
                }
                if (post)
                {  
                    if(typeof post.total_likes=="")
                    {
                        total_likes=0;
                        res.send({"status":false ,"message":"you have not liked this post"});
                        return;
                    }    
                    else
                    {
                      userPosts.findOne({'user_likes.like_user_id':userid}, function(err,found)
                        {
                          if(found)
                          {
                            total_likes=post.total_likes;
                            total_likes--;
                            userPosts.findByIdAndUpdate(post_id, 
                                {
                                  $set: { total_likes: total_likes},
                                  $pop: {'user_likes': 
                                {
                                  
                                  like_user_id: userid,
                                 like_user_first_name: user.first_name,
                                 like_user_last_name: user.last_name,
                                 like_profile_picture_url: user.profile_picture_url
                              }}}
                                , function(err,yes){
                              if (err) 
                                {res.send({"status":false, "message" : err});}
                              else
                                {
                                          res.send({"status" : true , "message" : "succussfully unlike"});
                                }  
                            });
                          }
                          else
                          {
                            res.send({"status": false, "message":"you have not like this post"})
                          }
                        });
                    }
                }
                else
                {
                    res.send({"status":false, "message":"no post exits with this id"});   
                }   
                });
          }
      }); 
});