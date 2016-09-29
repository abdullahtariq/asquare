var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
  userPosts= mongoose.model('posts'),
  userfollow = mongoose.model('follows');

module.exports = function (app) {
  app.use('/api', router);
};


var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });

var nameFile ;
var i = (Math.random() * 1000000) >>> 0;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    nameFile = (new Date).getTime()+"_"+file.originalname;
    cb(null,nameFile)
  }
});
 
var upload = multer({ storage: storage });

/**
 * @api {Post} api/post Request to Add Post 
 * @apiName Post
 * @apiGroup User_POST
 *
 * @apiParam {File} post User post vedio.
 * @apiParam {ID} userid User Id .
 *
 *
 * @apiSuccess {Boolean} status True/false.
 * @apiSuccess {String} message  Response message.
 * @apiSuccess {ID} userid Response ID of login user.
 */




 /**
 * @api {Socket} post Request to Add Post 
 * @apiName Post
 * @apiGroup User_POST
 *
 * @apiParam {ID} userid User Id .
 *
 *
 * @apiSuccess {Boolean} status True/false.
 * @apiSuccess {String} message  Response message.
 */


module.exports.post = function(socket,io,connection){

    socket.on('post', function (data) {
    
    var obj = JSON.parse(data);
    var userid= obj.userid;

    userCollection.findOne({_id:userid},function(err, result) {
        if(err)
        {
          return;
          //socket.emit('notification', {"status" : false, "message" : "userid not exits"});
        }
        if (result)
        {
          for (var i = 0; i < Object(result.follower).length; i++) {
            var socketid;
            console.log(result.follower[i].following_id);
            for (var j = 0; j < connection.length; j++) {
                     if(connection[j].userid==result.follower[i].following_id)
                     {
                       socketid=connection[j].socketId;
                       break;
                     }
                   }
            if(j!=connection.length || i!=0)
               {
                userCollection.findOne({_id:result.follower[i].following_id},function(err,found)
                {
                  if(found)
                    {
                      socket.emit('post', {"status" : true, "message" : "found.unseen"});
                      socket.broadcast.to(socketid).emit('notification', {"status" : true, "message" : "post"});
                    }
                    else if(err)
                    {
                        console.log(err);
                    }
                });
               } 
          }
            
        }
        else
        {
          socket.emit('notification', {"status":false,
          "message":"no result found...."});
        }
      });   
    
  });
  }





//  USER POSTS

router.post("/post",upload.single('post'),function(req,res){
//router.post("/post",function(req,res){
    if(typeof req.body.userid=='undefined')
    {
      res.send({"status" : false , "message" : "userid is undefined."});
        return;
    }
    else if(typeof req.file=='undefined')
    //else if(typeof req.body.post=='undefined')
    {
      res.send({"status" : false , "message" : "post is undefined."});
        return;
    }
    var file= req.file;
    var name;
    var path;
    userid = req.body.userid;
    post = req.body.post;
    nameFile = "uploads/"+nameFile;
    if(userid=="")
    {
        res.send({"status" : false, "message" : "userid empty"});
    }
    else if(req.file=="")
    {
        res.send({"status" : false , "message" : " post not given."});
        return;
    }
    else
    { 
      var path = file.originalname;
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
              post: nameFile,
              //post: post,
              time:milliseconds,
              user_first_name: result.first_name,
              user_last_name:result.last_name,
              user_profile_picture_url:result.profile_picture_url,
              total_likes:"",
              total_share:"",
              islike:false,
              total_comment:"",
              original_postid:null,
              original_user_first_name: null,
              original_user_last_name:null,
              original_user_id:null,
              total_file:""
            });
          user1.save(function (err, posted) {
            if (err) {
              console.log(err);
            } else {
              for (var i = 0; i < Object(result.follower).length; i++) {
                console.log(Object(result.follower).length);
                 userCollection.update({_id:result.follower[i].following_id},{$push:
                          {
                            notification:{
                                  userid: userid,
                                  post_id: posted._id,
                                  user_first_name: result.first_name,
                                  user_last_name: result.last_name,
                                  notification: "post",
                                  notification_time:milliseconds,
                                  notification_seen:false
                              }
          }}, function(err, notify){
            if(notify)
            {
              console.log(notify);
            }
            else
            {
            }
            console.log(i);
          });
              }
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