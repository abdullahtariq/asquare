  var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
  userfollow = mongoose.model('follows');

var user_id=0;
var userid=0;
module.exports = function (app) {
  app.use('/api', router);
};


/**
 * @api {Socket} follow Request to Follow a friend 
 * @apiName Follow a friend
 * @apiGroup Follow
 *
 * @apiParam {ID} userid login User Id.
 * @apiParam {ID} friend_id friend User Id.
 *
 *
 * @apiSuccess {Boolean} stauts  Response stauts.
 * @apiSuccess {String} message  Response succussfully follow.
 */



/**
 * @api {Post} follow Request to Follow a friend 
 * @apiName Follow a friend
 * @apiGroup SOCKET
 *
 * @apiParam {ID} userid login User Id.
 * @apiParam {ID} friend_id friend User Id.
 *
 *
 * @apiSuccess {Boolean} stauts  Response stauts.
 * @apiSuccess {String} message  Response succussfully follow.
 */




// module.exports.follow = function(socket,io,connection){

//     socket.on('follow', function (data) {
    
//     var obj = JSON.parse(data);
//     var userid = obj.userid;
//     var option = obj.friend_id;



//     var is_follow = false;
//     if(userid=="")
//     {
//       socket.emit('follow', {"status" : false,"message" : "userid is empty"});
//       return;
//     }
//     else if(option=="")
//     {
//       socket.emit('follow', {"status" : false,"message" : "friend is not given"});
//       return;
//     }
//     if(userid==option)
//     {
//       socket.emit('follow', {"status" : false,"message" : "you cannot follow yourself.."});
//       return; 
//     }

//     userCollection.findOne({_id:option}, function(err,friend)
//       {
//         if(err)
//           {
//             socket.emit('follow', {"status" : false,"message" : "friend_id not exits"});
//           return;
//           }
//         if(!friend)
//         {
//           socket.emit('follow', {"status" : false,"message" : "friend_id not exits"});
//           return;
//         }
//         else
//         {
//           userCollection.findOne({_id:userid}, function(err,result)
//           {
//             if(err)
//               {
//                 socket.emit('follow', {"status" : false,"message" : "userid not exits", "friend_id":option});
//               return;
//               }
//             if(!result)
//             {
//               socket.emit('follow', {"status" : false,"message" : "userid not exits", "friend_id":option});
//               return;
//             }
//             else
//             {

//               userfollow.findOne({follower_id:option, following_id:userid}, function(err, found){
//                 if(found)
//                 {
//                   is_follow = true;
//                   socket.emit('follow',{"status" : false,"message" : "you already follow this friend", "friend_id":option});
//                   return;
//                 }
//                 else
//                 {
//                   var milliseconds = (new Date).getTime();
//                   var total_follower=friend.total_follower;
//                   var total_following=result.total_following;
//                   if (total_following=="")
//                     total_following=0;
//                   if(total_follower=="")
//                     total_follower=0;
//                   total_follower++;
//                   total_following++;
//                   friend.follower.push({following_id: result._id, following_first_name: result.first_name, following_last_name: result.last_name, profile_picture_url: result.profile_picture_url});
//                   result.following.push({follower_id: friend._id, follower_first_name: friend.first_name, follower_last_name: friend.last_name, profile_picture_url: friend.profile_picture_url});
                  
//                   friend.notification.push({
//                                   userid: userid,
//                                   post_id: null,
//                                   user_first_name: result.first_name,
//                                   user_last_name: result.last_name,
//                                   user_profile_picture_url: result.profile_picture_url,
//                                   notification: "following",
//                                   notification_time:milliseconds,
//                                   notification_seen:false
//                               });
                  
//                   result.save(function (err, tank) {
//                     if(tank)
//                     {
//                        user1= new userfollow({
//                         follower_id:option,
//                         following_id: userid
//                        });
                        

//                        var unseen = 0;
//               if(typeof friend.unseen==undefined || typeof friend.unseen=="")
//                 unseen=0;
//               else
//                 unseen= friend.unseen;
//               unseen++;

//                        userCollection.findByIdAndUpdate(option, { $set: { "total_follower": total_follower , "unseen" :unseen}}, function(err,yes){
//                         if(err)
//                         {
//                           socket.emit('follow', {"status" : false,"message" : "Error", "friend_id":option});
//                             return;         
//                         }
//                        });
//                        userCollection.findByIdAndUpdate(userid, { $set: { "total_following": total_following}}, function(err,yes){
//                         if(err)
//                         {
//                           socket.emit('follow', {"status" : false,"message" : "Error", "friend_id":option});
//                             return;         
//                         }
//                        });                        
//                        user1.save();
//                        friend.save();
//                        socket.emit('follow', {"status":true, "message":"sucessfully follow", "friend_id":option});

//                        userCollection.findOne({_id:option},function(err, result) {
//                  if(err)
//                  {
//                   console.log("err");
//                   socket.broadcast.to(socketid).emit('notification', {"status" : false, "message" : "userid not exits for notification"});
//                  }
//                  if (result)
//                  {
//                  console.log("found");
//                  var socketid;
//                   for (var i = 0; i < connection.length; i++) {
//                      if(connection[i].userid==option)
//                      {
//                        socketid=connection[i].socketId;
//                        break;
//                      }
//                    }
//                socket.broadcast.to(socketid).emit('notification', {"status" : true, "message" : result.unseen});                        
//                console.log(socketid);
//                  }
//                  else
//                  {
//                   console.log("not found");
//                    socket.broadcast.to(socketid).emit('notification', {"status":false,
//                    "message":"no result found...."}); 
//                  }
//                }); 
//                     }
//                   }); 
//                 }
//               });
//             }
//           });
//         }
//       });    
//   });
//   }




module.exports.follow = function(socket,io,connection){

    socket.on('follow', function (data) {
    
    var obj = JSON.parse(data);
    var userid = obj.userid;
    var option = obj.friend_id;



    var is_follow = false;
    if(userid=="")
    {
      socket.emit('follow', {"status" : false,"message" : "userid is empty"});
      return;
    }
    else if(option=="")
    {
      socket.emit('follow', {"status" : false,"message" : "friend is not given"});
      return;
    }
    if(userid==option)
    {
      socket.emit('follow', {"status" : false,"message" : "you cannot follow yourself.."});
      return; 
    }

    userCollection.findOne({_id:option}, function(err,friend)
      {
        if(err)
          {
            socket.emit('follow', {"status" : false,"message" : "friend_id not exits"});
          return;
          }
        if(!friend)
        {
          socket.emit('follow', {"status" : false,"message" : "friend_id not exits"});
          return;
        }
        else
        {
          userCollection.findOne({_id:userid}, function(err,result)
          {
            if(err)
              {
                socket.emit('follow', {"status" : false,"message" : "userid not exits", "friend_id":option});
              return;
              }
            if(!result)
            {
              socket.emit('follow', {"status" : false,"message" : "userid not exits", "friend_id":option});
              return;
            }
            else
            {

               socket.broadcast.to(socketid).emit('notification', {"status" : true, "message" : result.unseen});                        
            }
                  }); 
        }
              });
          });
        }

router.post("/follow_friend",function(req,res){
    if(typeof req.body.userid=='undefined')
    {
      res.send({"status" : false,"message" : "userid id not given"});
      return;
    }
    else if(typeof req.body.friend_id=='undefined')
    {
      res.send({"status" : false,"message" : "friend_id is not given"});
      return;
    }
    var userid = req.body.userid;
    var option = req.body.friend_id;
    if(userid=="")
    {
      res.send({"status" : false,"message" : "userid is empty"});
      return;
    }
    else if(option=="")
    {
      res.send({"status" : false,"message" : "friend_id is empty"});
      return;
    }
    if(userid==option)
    {
        res.send({"status" : false,"message" : "you cannot follow yourself.."});
      return; 
    }

    userCollection.findOne({_id:option}, function(err,friend)
      {
        if(err)
          {
            res.send({"status" : false,"message" : "friend_id not exits"});
          return;
          }
        if(!friend)
        {
          res.send({"status" : false,"message" : "friend_id not exits"});
          return;
        }
        else
        {
          userCollection.findOne({_id:userid}, function(err,result)
          {
            if(err)
              {
                res.send({"status" : false,"message" : "userid not exits"});
              return;
              }
            if(!result)
            {
              res.send({"status" : false,"message" : "userid not exits"});
              return;
            }
            else
            {

              userfollow.findOne({follower_id:option, following_id:userid}, function(err, found){
                if(found)
                {
                    res.send({"status" : false,"message" : "you already follow this friend"});
                  return;
                }
                else
                {
                  var milliseconds = (new Date).getTime();
                  var total_follower=friend.total_follower;
                  var total_following=result.total_following;
                  if (total_following=="")
                    total_following=0;
                  if(total_follower=="")
                    total_follower=0;
                  total_follower++;
                  total_following++;
                  friend.follower.push({following_id: result._id, following_first_name: result.first_name, following_last_name: result.last_name, profile_picture_url: result.profile_picture_url});
                  result.following.push({follower_id: friend._id, follower_first_name: friend.first_name, follower_last_name: friend.last_name, profile_picture_url: friend.profile_picture_url});
                  
                  friend.notification.push({
                                  userid: userid,
                                  post_id: null,
                                  user_first_name: result.first_name,
                                  user_last_name: result.last_name,
                                  user_profile_picture_url: result.profile_picture_url,
                                  notification: "following",
                                  notification_time:milliseconds,
                                  notification_seen:false
                              });
                  
                  result.save(function (err, tank) {
                    if(tank)
                    {
                       user1= new userfollow({
                        follower_id:option,
                        following_id: userid
                       });
                        

                       var unseen = 0;
              if(typeof friend.unseen==undefined || typeof friend.unseen=="")
                unseen=0;
              else
                unseen= friend.unseen;
              unseen++;

                       userCollection.findByIdAndUpdate(option, { $set: { "total_follower": total_follower , "unseen" :unseen}}, function(err,yes){
                        if(err)
                        {
                            res.send({"status" : false,"message" : err});
                            return;         
                        }
                       });
                       userCollection.findByIdAndUpdate(userid, { $set: { "total_following": total_following}}, function(err,yes){
                        if(err)
                        {
                            res.send({"status" : false,"message" : err});
                            return;         
                        }
                       });                        
                       user1.save();
                       friend.save();

                       res.send({"status":true, "message":"sucessfully follow"});                 
                    }
                  }); 
                }
              });
            }
          });
        }
      });
});