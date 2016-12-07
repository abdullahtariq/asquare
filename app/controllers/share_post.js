  var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
  userPosts = mongoose.model('posts');


module.exports = function (app) {
  app.use('/api', router);
};


/**
 * @api {Post} sharepost Request to Share post 
 * @apiName Share a friend Post
 * @apiGroup User_POST
 *
 * @apiParam {ID} userid login User Id.
 * @apiParam {ID} post_id Post Id.
 * @apiParam {String} message Post message.
 *
 *
 * @apiSuccess {Boolean} stauts  Response stauts.
 * @apiSuccess {String} message  Response succussfully Share a post.
 */


/**
 * @api {Socket} sharepost Request to Share post 
 * @apiName Share a friend Post
 * @apiGroup SOCKET
 *
 * @apiParam {ID} userid login User Id.
 * @apiParam {ID} post_id Post Id.
 * @apiParam {String} message Post message.
 *
 *
 * @apiSuccess {Boolean} stauts  Response stauts.
 * @apiSuccess {String} message  Response succussfully Share a post.
 */




// module.exports.sharepost = function(socket,io,connection){

//     socket.on('sharepost', function (data) {
    
//     var obj = JSON.parse(data);
//     var post_id= obj.post_id;
//     var userid= obj.userid;
//     var message= obj.message;

//     console.log(post_id);
//     if(userid=="")
//     {
//       socket.emit('sharepost', {"status" : false,"message" : "userid is empty"});
//       return;
//     }
//     else if(post_id=="")
//     {
//       socket.emit('sharepost', {"status" : false,"message" : "post_id is not given"});
//       return;
//     }
//     userCollection.findOne({_id: userid}, function(err, shareuser) {
//           if(err)
//           {
//             socket.emit('sharepost', {"status" : false , "message" : "Invalid user id"});
//             return;
//           }
//           if (Object(shareuser).length<=0)
//           {
//             socket.emit('sharepost', {"status":false ,"message":"not user exits with this id"});
//             return;
//           }
//           else
//           {
//               var total_share=0;
//     userPosts.findOne({_id: post_id},function(err, result) {
//         if(err)
//         {
//           socket.emit('sharepost', {"status":false, "message":"Error"});
//         }
//         if (result)
//         {  
//             if(result.total_share=="")
//                 total_share=0;
//             else
//                 total_share=result.total_share;
//             total_share++;
//             var comment = result.post;
//             userPosts.findByIdAndUpdate(post_id, { $set: { share: total_share}}, function (err, tank) {
//               if (err) 
//                 {
//                   socket.emit('sharepost', {"status":false, "message" : "Error"});
//                 }
//               else
//                 {
//                   userCollection.findOne({_id:userid}, function(err,ress){
//                     var milliseconds = (new Date).getTime();
//                      if(tank.original_postid=="" || tank.original_postid==null)
//                      {var sharepost = new userPosts(
//                                              { 
//                                                user_id:userid,
//                                                post: comment,
//                                                time:milliseconds,
//                                                user_first_name: shareuser.first_name,
//                                                user_last_name:shareuser.last_name,
//                                                user_profile_picture_url:shareuser.profile_picture_url,
//                                                thumbnail:result.thumbnail,
//                                                user_message:result.message,
//                                                message:message,
//                                                original_post_time:result.time,
//                                                total_likes:"",
//                                                total_share:"",
//                                                islike:false,
//                                                original_postid:result._id,
//                                                original_pic_url:result.user_profile_picture_url,
//                                                original_user_first_name: result.user_first_name,
//                                                original_user_last_name:result.user_last_name,
//                                                original_user_id:result.user_id,
//                                                total_comment:""
//                                              });
//                      }
//                      else
//                      {
//                         var sharepost = new userPosts(
//                                              { 
//                                                user_id:userid,
//                                                post: comment,
//                                                time:milliseconds,
//                                                user_first_name: shareuser.first_name,
//                                                user_last_name:shareuser.last_name,
//                                                user_profile_picture_url:shareuser.profile_picture_url,
//                                                thumbnail:tank.thumbnail,
//                                                user_message:tank.message,
//                                                message:message,
//                                                original_post_time:tank.time,
//                                                total_likes:"",
//                                                total_share:"",
//                                                islike:false,
//                                                original_postid:tank.original_postid,
//                                                original_pic_url:tank.user_profile_picture_url,
//                                                original_user_first_name: tank.original_user_first_name,
//                                                original_user_last_name:tank.original_user_last_name,
//                                                original_user_id:tank.original_user_id,
//                                                total_comment:""
//                                              });
//                      }
//                      idForNotification = result.user_id;
//                      userPosts.findByIdAndUpdate(post_id,{$push:
//                           {
//                             user_shares:
//                               {
//                                   share_post_id: tank._id,           //  post id of post that new shared
//                                          share_user_id: userid,
//                                          share_user_first_name: shareuser.first_name,
//                                          share_user_last_name: shareuser.last_name,
//                                          share_profile_picture_url: shareuser.profile_picture_url,
//                                          share_time:milliseconds
//                               }
//           },
//                    $set: { "total_share": total_share}},
//                                   function (err, tank1) {
//                                   if(tank1)
//                                   {
//                                       sharepost.save();
//                                       userCollection.findByIdAndUpdate(idForNotification,
//                         {$push:
//                           {
//                             notification:{
//                                   userid: userid,
//                                   post_id: post_id,
//                                   user_first_name: shareuser.first_name,
//                                   user_last_name: shareuser.last_name,
//                                   user_profile_picture_url: shareuser.profile_picture_url,
//                                   notification: "share",
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
//               userCollection.findByIdAndUpdate(idForNotification,{$set: { "unseen": unseen}}, function(err,done){
//               if(done) 
//                 {
//                   socket.emit('sharepost', {"status" : true, "message":"sucessfully share"});
//                 }
//               else if (err)
//                 {
//                   socket.emit('sharepost', {"status" : false, "message":"Error"});
//                 }
//               });
//             }
//           });

//                           userCollection.findOne({_id:idForNotification},function(err, result) {
//                       if(err)
//                       {
//                        socket.broadcast.to(socketid).emit('notification', {"status" : false, "message" : "userid not exits for notification"});
//                       }
//                       if (result)
//                       {
                      
//                       var socketid;
//                        for (var i = 0; i < connection.length; i++) {
//                           if(connection[i].userid==idForNotification)
//                           {
//                             socketid=connection[i].socketId;
//                             break;
//                           }
//                         }
//                     socket.broadcast.to(socketid).emit('notification', {"status" : true, "message" : result.unseen});                        
//                     console.log(socketid);
//                       }
//                       else
//                       {
//                         socket.broadcast.to(socketid).emit('notification', {"status":false,
//                         "message":"no result found...."}); 
//                       }
//                     });
//                                   }
//                                   else
//                                   {
//                                     socket.emit('sharepost', {"status":false, "message":"cannot share"});
//                                       res.send(); 
//                                   }
//                                });
//                   });
//                 }  
//             });
//         }
//         else
//         {
//           socket.emit('sharepost', {"status":false, "message":"no post exits with this id"});
//         }   
//         });
//           }
//       }); 
    
//   });
//   }







module.exports.sharepost = function(socket,io,connection){

    socket.on('sharepost', function (data) {
    
    var obj = JSON.parse(data);
    var post_id= obj.post_id;
    var userid= obj.userid;
    var message= obj.message;

    console.log(post_id);
    if(userid=="")
    {
      socket.emit('sharepost', {"status" : false,"message" : "userid is empty"});
      return;
    }
    else if(post_id=="")
    {
      socket.emit('sharepost', {"status" : false,"message" : "post_id is not given"});
      return;
    }
    userCollection.findOne({_id: userid}, function(err, shareuser) {
          if(err)
          {
            socket.emit('sharepost', {"status" : false , "message" : "Invalid user id"});
            return;
          }
          else
          {
              var total_share=0;
          userPosts.findOne({_id: post_id},function(err, result) {
              if(err)
              {
                socket.emit('sharepost', {"status":false, "message":"Error"});
              }
              if (result)             
              {  
                  var idForNotification = result.user_id;
                  socket.emit('sharepost', {"status" : true, "message":"sucessfully share"});
                  userCollection.findOne({_id:idForNotification},function(err, result) {
                  if(err)
                  {
                   socket.broadcast.to(socketid).emit('notification', {"status" : false, "message" : "userid not exits for notification"});
                  }
                  else
                  {
                  
                      var socketid;
                       for (var i = 0; i < connection.length; i++) {
                          if(connection[i].userid==idForNotification)
                          {
                            socketid=connection[i].socketId;
                            break;
                          }
                        }
                      socket.broadcast.to(socketid).emit('notification', {"status" : true, "message" : result.unseen});                        
                      console.log(socketid);
                  }
                  });
              }  
            });
      }
      });
  }); 
    
  }




var idForNotification;
router.post("/share_post",function(req,res){
    if(typeof req.body.userid=='undefined')
    {
      res.send({"status" : false,"message" : "userid is undefined"});
      return;
    }
    else if(typeof req.body.post_id=='undefined')
    {
      res.send({"status" : false,"message" : "post_id is undefined"});
      return;
    }
    var userid = req.body.userid;
    var post_id = req.body.post_id;
    if(userid=="")
    {
      res.send({"status" : false,"message" : "userid is not given"});
      return;
    }
    else if(post_id=="")
    {
      res.send({"status" : false,"message" : "post_id is not given"});
      return;
    }
    userCollection.findOne({_id: userid}, function(err, shareuser) {
          if(err)
          {
            console.log("Not found");
            return;
          }
          if (Object(shareuser).length<=0)
          {
            res.send({"status":false ,"message":"not user exits with this id"});
            return;
          }
          else
          {
              var total_share=0;
    userPosts.findOne({_id: post_id},function(err, result) {
        if(err)
        {
          res.send({"status":false, "message":err});
        }
        if (result)
        {  
            if(result.total_share=="")
                total_share=0;
            else
                total_share=result.total_share;
            total_share++;
            var comment = result.post;
            userPosts.findByIdAndUpdate(post_id, { $set: { share: total_share}}, function (err, tank) {
              if (err) 
                {res.send({"status":false, "message" : err});}
              else
                {
                  userCollection.findOne({_id:userid}, function(err,ress){
                    var milliseconds = (new Date).getTime();
                     if(tank.original_postid=="" || tank.original_postid==null)
                     {var sharepost = new userPosts(
                                             { 
                                               user_id:userid,
                                               post: comment,
                                               time:milliseconds,
                                               user_first_name: shareuser.first_name,
                                               user_last_name:shareuser.last_name,
                                               user_profile_picture_url:shareuser.profile_picture_url,
                                               thumbnail:result.thumbnail,
                                               user_message:result.message,
                                               original_post_time:result.time,
                                               message:message,
                                               total_likes:"",
                                               total_share:"",
                                               islike:false,
                                               original_postid:result._id,
                                               original_pic_url: result.user_profile_picture_url,
                                               original_user_first_name: result.user_first_name,
                                               original_user_last_name:result.user_last_name,
                                               original_user_id:result.user_id,
                                               total_comment:""
                                             });
                     }
                     else
                     {
                        var sharepost = new userPosts(
                                             { 
                                               user_id:userid,
                                               post: comment,
                                               time:milliseconds,
                                               user_first_name: shareuser.first_name,
                                               user_last_name:shareuser.last_name,
                                               user_profile_picture_url:shareuser.profile_picture_url,
                                               thumbnail:tank.thumbnail,
                                               user_message:tank.message,
                                               original_post_time:tank.time,
                                               message:message,
                                               total_likes:"",
                                               total_share:"",
                                               islike:false,
                                               original_postid:tank.original_postid,
                                               original_pic_url: result.user_profile_picture_url,
                                               original_user_first_name: tank.original_user_first_name,
                                               original_user_last_name:tank.original_user_last_name,
                                               original_user_id:tank.original_user_id,
                                               total_comment:""
                                             });
                     }
                     idForNotification = result.user_id;
                     userPosts.findByIdAndUpdate(post_id,{$push:
                          {
                            user_shares:
                              {
                                  share_post_id: tank._id,           //  post id of post that new shared
                                         share_user_id: userid,
                                         share_user_first_name: shareuser.first_name,
                                         share_user_last_name: shareuser.last_name,
                                         share_profile_picture_url: shareuser.profile_picture_url,
                                         share_time:milliseconds
                              }
          },
                   $set: { "total_share": total_share}},
                                  function (err, tank1) {
                                  if(tank1)
                                  {
                                      sharepost.save();
                                      userCollection.findByIdAndUpdate(idForNotification,
                        {$push:
                          {
                            notification:{
                                  userid: userid,
                                  post_id: post_id,
                                  user_first_name: shareuser.first_name,
                                  user_last_name: shareuser.last_name,
                                  user_profile_picture_url: shareuser.profile_picture_url,
                                  notification: "share",
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
              userCollection.findByIdAndUpdate(idForNotification,{$set: { "unseen": unseen}}, function(err,done){
              if(done) 
                res.send({"status" : true, "message":"sucessfully share"});
              else if (err)
                res.send({"status" : true, "message":err});
              });
            }
          });
                                  }
                                  else
                                  {
                                      res.send({"status":false, "message":"cannot share"}); 
                                  }
                               });
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