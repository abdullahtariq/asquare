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



module.exports.likepost = function(socket){

    socket.on('new message', function (data) {
    
    var obj = JSON.parse(data);
    
    var post_id= obj.post_id;
    var userid= obj.userid;
    var total_likes=0;
    if(post_id=="")
    {
        socket.emit('new message', {
                                  "status": false,
                                  "message": "post_id is not given"
                                });
        return;
    }
    else if( userid == "")
    {
        socket.emit('new message', {
                                  "status": false,
                                  "message": "userid is not given"
                                });
    }



     userCollection.findOne({_id: userid}, function(err, result) {
          if(err)
          {
            return;
          }
          if (!result)
          {
            socket.emit('new message', {
                                  "status": false,
                                  "message": "not user exits with this id"
                                });
            return;
          }
          else
          {
            userPosts.findOne({_id: post_id},function(err, post) {
              if(err)
              {
                  socket.emit('new message', {
                                  "status": false,
                                  "message": err
                                });
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
                  


                  userPosts.findOne({_id:post_id, "user_likes.like_user_id":userid},  function(err, userlike) {
                    if(err)
                    {
                      socket.emit('new message', {
                                  "status": false,
                                  "message": err
                                });
                    }
                    if (userlike)
                    {  
                        socket.emit('new message', {
                                  "status": false,
                                  "message": "you have already like this post"
                                });
                        console.log("already");
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
                            socket.emit('new message', {
                                  "status": false,
                                  "message": err
                                });
                            return;         
                        }
                        else{
                          userCollection.findByIdAndUpdate(post.user_id,
                        {$push:
                          {
                            notification:{
                                  userid: userid,
                                  post_id: post_id,
                                  user_first_name: result.first_name,
                                  user_last_name: result.last_name,
                                  notification: "like",
                                  notification_time:milliseconds,
                                  notification_seen:false
                              }
          }}, function(err, notify){
            if(notify)
            {
                socket.emit('new message', {
                      "status": true,
                      message: "user like sucessfully"
                    });
                console.log("aya");
            }
          });
                        }
                       });                                
                    }
                    });
              }
              else
              {
                socket.emit('new message', {
                                  "status": false,
                                  "message": "no post exits with this id"
                                });
              }   
              });
          }
      });
});
  }