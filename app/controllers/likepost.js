

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
 * @api {Socket} likepost Request to like a user post
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


// module.exports.notification = function(socket,io,connection){

//     socket.on('likepost', function (data) {
    
//     var obj = JSON.parse(data);
//     var post_id= obj.post_id;
//     var userid= obj.userid;
//     console.log(userid);
//     var total_likes=0;
//     if(post_id=="")
//     {
//       socket.emit('likepost', {"status" : false , "message" : "post id is not given"});
//         return;
//     }
//     else if( userid == "")
//     {
//       socket.emit('likepost',{"status" : false , "message" : "User id is not given "});
//         return;
//     }



//      userCollection.findOne({_id: userid}, function(err, result) {
//           if(err)
//           {
//             socket.emit('likepost', {"status" : false, "message" : "Not found", "post_id":post_id});
//             return;
//           }
//           if (!result)
//           {
//             socket.emit('likepost', {"status":false ,"message":"not user exits with this id", "post_id":post_id});
//             return;
//           }
//           else
//           {
//             userPosts.findOne({_id: post_id},function(err, post) {
//               if(err)
//               {
//                 socket.emit('likepost', {"status":false, "message":"Error To find Post","post_id":post_id});
//               }
//               if (post)
//               {  
//                   if(typeof post.total_likes=='undefined' || typeof post.total_likes=="")
//                       total_likes=0;
//                   else
//                       total_likes=post.total_likes;
//                   total_likes++;
//                       var milliseconds = (new Date).getTime(); 


//                   post.user_likes.push();
                  


//                   userPosts.findOne({_id:post._id , "user_likes.like_user_id":userid},  function(err, userlike) {
//                     if(err)
//                     {
//                       socket.emit('likepost', {"status":false, "message":"Error", "post_id":post_id});
//                     }
//                     if (userlike)
//                     {  
//                       socket.emit('likepost', {"status":false, "message":"already like want to dislike", "post_id":post_id});
//                     }
//                     else
//                     {
                      
//                       userPosts.findByIdAndUpdate(post_id,
//                         {$push:
//                           {

//                             user_likes:
//                               {
//                                   like_user_id: result._id,
//                                   like_user_first_name: result.first_name,
//                                    like_user_last_name: result.last_name,
//                                    like_profile_picture_url: result.profile_picture_url,
//                                    like_time:milliseconds
//                               }
//           }, $set: { "total_likes": total_likes}},
//                         function(err,yes){
//                         if(err)
//                         {
//                           socket.emit('likepost', {"status" : false,"message" : "Error", "post_id":post_id});
//                             return;         
//                         }
//                         else{

//                           userCollection.findByIdAndUpdate(post.user_id,
//                         {$push:
//                           {
//                             notification:{
//                                   userid: userid,
//                                   post_id: post_id,
//                                   user_first_name: result.first_name,
//                                   user_last_name: result.last_name,
//                                   user_profile_picture_url: commentuser.profile_picture_url,
//                                   notification: "like",
//                                   notification_time:milliseconds,
//                                   notification_seen:false
//                               }
//           }}, function(err, notify){
//             if(notify)
//             {
//               var unseen = 0;
//               if(typeof notify.unseen==undefined || typeof notify.unseen=="")
//                 unseen=0;
//               else
//                 unseen= notify.unseen;
//               unseen++;
//               userCollection.findByIdAndUpdate(post.user_id,{$set: { "unseen": unseen}}, function(err,done){
//               if(done)
//                 {
                  
//                   socket.emit('likepost', {"status" : true,"message" : "sucessfully like", "post_id":post_id});
//                     userCollection.findOne({_id:userid},function(err, result) {
//                       if(err)
//                       {
//                        socket.broadcast.to(socketid).emit('notification', {"status" : false, "message" : "userid not exits for notification"});
//                       }
//                       if (result)
//                       {
                      
//                       var socketid;
//                        for (var i = 0; i < connection.length; i++) {
//                           if(connection[i].userid==post.user_id)
//                           {
//                             socketid=connection[i].socketId;
//                             break;
//                           }
//                         }
//                     socket.broadcast.to(socketid).emit('notification', {"status" : true, "message" : "result.unseen"});                        console.log(socketid);
//                       }
//                       else
//                       {
//                         socket.broadcast.to(socketid).emit('notification', {"status":false,
//                         "message":"no result found...."}); 
//                       }
//                     });   
//                 }
//               });
//             }

//           });
//                             return;          
//                         }
//                        });                                
//                     }
//                     });
//               }
//               else
//               {
//                 socket.emit('likepost', {"status":false, "message":"no post exits with this id", "post_id":post_id});
//               }   
//               });
//           }
//       });
// });
//   }







module.exports.notification = function(socket,io,connection){

    socket.on('likepost', function (data) {
    
    var obj = JSON.parse(data);
    var post_id= obj.post_id;
    var userid= obj.userid;
    console.log(userid);
    var total_likes=0;
    

    if(post_id=="")
    {
      socket.emit('likepost', {"status" : false , "message" : "post id is not given"});
        return;
    }
    else if( userid == "")
    {
      socket.emit('likepost',{"status" : false , "message" : "User id is not given "});
        return;
    }



     userCollection.findOne({_id: userid}, function(err, result) {
          if(err)
          {
            socket.emit('likepost', {"status" : false, "message" : "Not found", "post_id":post_id});
            return;
          }
          if (!result)
          {
            socket.emit('likepost', {"status":false ,"message":"not user exits with this id", "post_id":post_id});
            return;
          }
          else
          {
            userPosts.findOne({_id: post_id},function(err, post) {
              if(err)
              {
                socket.emit('likepost', {"status":false, "message":"Error To find Post","post_id":post_id});
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
                  


                  userPosts.findOne({_id:post._id , "user_likes.like_user_id":userid},  function(err, userlike) {
                    if(err)
                    {
                      socket.emit('likepost', {"status":false, "message":"Error", "post_id":post_id});
                    }
                    if (userlike)
                    {  
                      socket.emit('likepost', {"status":false, "message":"already like want to dislike", "post_id":post_id});
                    }
                    else
                    {
                        socket.emit('likepost', {"status" : true,"message" : "sucessfully like", "post_id":post_id});
                        socket.broadcast.to(socketid).emit('notification', {"status" : true, "message" : "result.unseen"});                        console.log(socketid);
                    }
                    });   
                }
              });
            }
          });
      });                                
}





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
                  


                  userPosts.findOne({_id:post._id , "user_likes.like_user_id":userid},  function(err, userlike) {
                    if(err)
                    {
                      res.send({"status":false, "message":err});
                    }
                    if (userlike)
                    {  
                        res.send({"status":false, "message":"already like want to dislike"});
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
                              if(userid != post.user_id)
                              {
                              userCollection.findByIdAndUpdate(post.user_id,
                                {$push:
                                  {
                                    notification:{
                                          userid: userid,
                                          post_id: post_id,
                                          user_first_name: result.first_name,
                                          user_last_name: result.last_name,
                                          user_profile_picture_url: commentuser.profile_picture_url,
                                          notification: "like",
                                          notification_time:milliseconds,
                                          notification_seen:false
                                      }
                              }}, function(err, notify){
                                if(notify)
                                {
                                  var unseen = 0;
                                  if(typeof notify.unseen==undefined || typeof notify.unseen=="")
                                    unseen=0;
                                  else
                                    unseen= notify.unseen;
                                  unseen++;
                                  userCollection.findByIdAndUpdate(post.user_id,{$set: { "unseen": unseen}}, function(err,done){
                                  if(done)
                                    res.send({"status" : true,"message" : "sucessfully like"});
                                  });
                            }
                          });
                      }
                      else
                      {
                          res.send({"status" : true,"message" : "sucessfully like"});
                      }
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