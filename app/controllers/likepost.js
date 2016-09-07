  var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
  userPosts = mongoose.model('posts'),
  userlikes = mongoose.model('userlikes'),
  userfollow = mongoose.model('follows'); 

var http = require('http').Server(router);
var io = require('socket.io')(http);


module.exports = function (app) {
  app.use('/api', router);
};

/**
 * @api {Post} api/likepost Request to like a user post
 * @apiName Like post
 * @apiGroup User_POST
 *
 * @apiParam {ID} post_id User Post id.
 * @apiParam {ID} userid User Who like post.
 *
 *
 * @apiSuccess {Boolean} status True/false.
 * @apiSuccess {String} message  Response message.
 */


router.post("/likepost", function(req,res){
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



     userCollection.findOne({_id: userid}, function(err, result) {
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
          else
          {
            userPosts.findOne({_id: post_id},function(err, post) {
              if(err)
              {
                res.send({"status":false, "message":err});
              }
              if (post)
              {  
                  if(typeof post.total_likes=='undefined' || typeof post.total_likes=="")
                      total_likes=0;
                  else
                      total_likes=post.total_likes;
                  total_likes++;
                      var milliseconds = (new Date).getTime(); 


                  post.user_likes.push();
                  


                  userPosts.findOne({_id:post_id,"user_likes.like_user_id":userid},  function(err, userlike) {
                    if(err)
                    {
                      res.send({"status":false, "message":err});
                    }
                    if (userlike)
                    {  
                        res.send({"status":false, "message":"already like"});
                    }
                    else
                    {
                      userPosts.findByIdAndUpdate(post_id,
                        {$push:
                          {
                            user_likes:
                              {
                                  like_user_id: result._id,
                                  like_user_first_name: result.first_name,
                                   like_user_last_name: result.last_name,
                                   like_profile_picture_url: result.profile_picture_url,
                                   like_time:milliseconds
                              }
          }, $set: { "total_likes": total_likes}},
                        function(err,yes){
                        if(err)
                        {
                            res.send({"status" : false,"message" : err});
                            return;         
                        }
                        else{
                              io.on('connection', function (socket) {
                                      socket.broadcast.emit('new message', "data");
                                  });
                            res.send({"status" : true,"message" : "sucessfully like"});
                            return;          
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
      }); 
});