var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
  userPosts= mongoose.model('posts'),
  userfollow = mongoose.model('follows');

module.exports = function (app) {
  app.use('/api', router);
};

/*
var i=0;
var arr=[];
module.exports.post = function(socket){

    socket.on('post', function (data) {
    
    var obj = JSON.parse(data);
    
    var comment= obj.post;
    var userid= obj.userid;
    
    if(comment == "")
    {
      socket.emit('post', {"status" : false, "message" : "empty post"});
    }
    else if(userid=="")
    {
      socket.emit('post', {"status" : false, "message" : "userid empty"});
    }
    else
    { 
      userCollection.findOne({_id:userid},function(err, result) {
        if(err)
        {
          socket.emit('post', {"status" : false, "message" : "userid not exits"});
        }
        if (result)
        {
          var milliseconds = (new Date).getTime();
          var user1 = new userPosts(
            { user_id:userid,
              post: comment,
              time:milliseconds,
              user_first_name: result.first_name,
              user_last_name:result.last_name,
              user_profile_picture_url:result.profile_picture_url,
              total_likes:"",
              total_share:"",
              original_postid:null,
              original_user_first_name: null,
              original_user_last_name:null,
              original_user_id:null,
              total_comment:""
            });
          user1.save(function (err, post) {
            if (err) {
              socket.emit('post', {
                      "status": false,
                      message: err
                    });
              console.log("nai aya");
            } else {

                userfollow.find({following_id: userid },{"follower_id": true }, function(err, follow) 
                  {
                      if(err)
                      {
                        res.send({"status" : false , "result" : err});
                      }
                      else if(follow)
                      {
                         for (; i < Object.keys(follow).length; i++) {
                           arr[i]=follow[i].follower_id;
                         }
                      }
                  userCollection.findByIdAndUpdate({_id: { $in : arr} },
                                  {$push:
                                    {
                                      notification:{
                                            userid: userid,
                                            post_id: post._id,
                                            user_first_name: result.first_name,
                                            user_last_name: result.last_name,
                                            notification: "post",
                                            notification_time:milliseconds,
                                            notification_seen:false
                                        }
                    }}, function(err, notify){
                      if(notify)
                      {
                          console.log("aya");
              socket.emit('new message', {
                      "status": true,
                      message: "sucessfully post"
                    });
                      }
                      else
                      {
                          console.log("aya");
                      socket.emit('new message', {
                              "status": false,
                              message: "err"
                            }); 
                      }
                    });  
            });
            }
          });
        }
        else
        {
          console.log("nai ");
          socket.emit('post', {"status":false,
          "message":"cannot post...."});
        }
      });   
    }

});
  }
*/


/**
 * @api {Post} api/post Request to Add Post 
 * @apiName Post
 * @apiGroup User_POST
 *
 * @apiParam {String} post User Post.
 * @apiParam {ID} userid User Id .
 *
 *
 * @apiSuccess {Boolean} status True/false.
 * @apiSuccess {String} message  Response message.
 * @apiSuccess {ID} userid Response ID of login user.
 */



//  USER POSTS

router.post("/post",function(req,res){
    if(typeof req.body.userid=='undefined')
    {
      res.send({"status" : false , "message" : "userid is not given."});
        return;
    }
    else if(typeof req.body.post=='undefined')
    {
      res.send({"status" : false , "message" : "post is not given."});
        return;
    }
    var comment= req.body.post;
    userid = req.body.userid;
    if(comment == "")
    {
        res.send({"status" : false, "message" : "empty post"});
    }
    else if(userid=="")
    {
        res.send({"status" : false, "message" : "userid empty"});
    }
    else
    { 
      userCollection.findOne({_id:userid},function(err, result) {
        if(err)
        {
            res.send({"status" : false, "message" : "userid not exits"});
            return;     
        }
        if (result)
        {
          var milliseconds = (new Date).getTime();
          var user1 = new userPosts(
            { user_id:userid,
              post: comment,
              time:milliseconds,
              user_first_name: result.first_name,
              user_last_name:result.last_name,
              user_profile_picture_url:result.profile_picture_url,
              total_likes:"",
              total_share:"",
              original_postid:null,
              original_user_first_name: null,
              original_user_last_name:null,
              original_user_id:null,
              total_comment:""
            });
          user1.save(function (err, result) {
            if (err) {
              console.log(err);
            } else {
              res.send({"status" : true, "message" : "Successfully Posted" , "userid" : userid});
            }
          });
        }
        else
        {
          res.send({"status":false,
          "message":"cannot post...."});
        }
      });   
    }    
});