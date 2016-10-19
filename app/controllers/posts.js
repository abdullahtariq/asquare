var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
  userPosts= mongoose.model('posts'),
  userhashtags= mongoose.model('hashtag'),
  userfollow = mongoose.model('follows');

module.exports = function (app) {
  app.use('/api', router);
};

var nameFile ;
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });

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
var fs = require('fs');
    var AWS = require('aws-sdk');
  // Declaring id's which we have created during amazon account creation
    var accessKeyId =  'AKIAIOH43MOTPZH7W6KA';
    var secretAccessKey = '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';
    
  // updating the config file
    AWS.config.update({
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    region : 'ap-south-1'
    });

    var s3 = new AWS.S3();

/**
 * @api {Post} api/post Request to Add Post 
 * @apiName Post
 * @apiGroup User_POST
 *
 * @apiParam {File} post User post vedio.
 * @apiParam {ID} userid User Id .
 * @apiParam {JSON} hashtags User Hashtags.
 * @apiParam {String} message User message .
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
            // console.log(result.follower[i].following_id);
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
                        // console.log(err);
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
// router.post("/post",function(req,res){
    var text_message = "";
    if(typeof req.body.userid=='undefined')
    {
      res.send({"status" : false , "message" : "userid is undefined."});
        return;
    }
    else if(typeof req.file=='undefined')
    // else if(typeof req.body.post=='undefined')
    {
      res.send({"status" : false , "message" : "post is undefined."});
        return;
    }
    if(typeof req.body.message=='undefined')
    {
      text_message="";
    }
    else
    {
      text_message = req.body.message;
    }
    var file= req.file;
    var name;
    var path;
    userid = req.body.userid;
    post = req.body.post;
    nameFile = "facingvideos/"+nameFile;
    
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
        userCollection.findOne({_id:userid},function(err, result) {
        if(err)
        {
            res.send({"status" : false, "message" : "userid not exits"});
            return;     
        }
        if (result)
        {
          var arr = new Array();
          arr = req.body.hashtags;
          var milliseconds = (new Date).getTime();
          var user1 = new userPosts(
            { user_id:userid,
              post: nameFile,
              // post: post,
              message:text_message,
              time:milliseconds,
              user_first_name: result.first_name,
              user_last_name:result.last_name,
              user_profile_picture_url:result.profile_picture_url,
              total_likes:"",
              total_share:"",
              islike:false,
              total_seen:"",
              total_comment:"",
              original_postid:null,
              original_user_first_name: null,
              original_user_last_name:null,
              original_user_id:null,
              total_file:""
            });
          user1.save(function (err, posted) {
            if (err) {
              // console.log(err);
            } else {
              for (var i = 0; i < Object(result.follower).length; i++) {
                // console.log(Object(result.follower).length);
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
              // console.log(notify);
            }
            else
            {
            }
            // console.log(i);
          });
              }
    


              var file = req.files;
    var filePath = file.files.path;
    var fileExtension = path.extname(filePath);
    
  
           // creating random number for unique file name
      var randomNo = (Math.random() * 1000000) >>> 0;
      var stream = fs.createReadStream(filePath);
      // creating object to insert in bucket
            var filename ='file_'+randomNo+ fileExtension;
      var params = {
                Bucket: 'facingvideos',
                Key: nameFile,
        ACL: 'public-read',
                Body: stream
            };

    // putting object in bucket
        s3.putObject(params, function (perr, pres) {             
    


              var hashtags = "";
              if(typeof req.body.hashtags == 'undefined')
              {
                res.send({"status" : true, "message" : "Successfully Posted" , "userid" : userid});
              }
              else
              {
                hashtags = JSON.parse(req.body.hashtags);
                Alltags = hashtags;
                for (var i = 0; i < Object(Alltags).length; i++) {
                    posted.tags.push(
                                {
                                  tag: Alltags[i],
                                });
                    posted.save();
                }
                 var tagsArray=new Array();
                 var Alltags=new Array();
                userhashtags.find(function(err, yes){
                    if(yes==[] || Object(yes).length==0)
                    {
                     for (var i = 0; i < Object(hashtags).length; i++) {
                            var newTag = new userhashtags({
                                tag : hashtags[i],
                                posts:{post_id: posted._id},
                              });   
                              newTag.save();
                    }
                    }
                    else
                    {
                      for (var i = 0; i < Object(hashtags).length; i++) {
                      userhashtags.update({tag: hashtags[i]},
                            {$push:
                              {
                                posts:
                                  {
                                      post_id: posted._id,
                                  }
                        }},function(err, taginsert){
                          if(err)
                          {
                            console.log("yeh masla tha");
                          }
                          else if(taginsert)
                          {
                             
                          }
                          else
                          {
                            var newTag = new userhashtags({
                                tag : hashtags[i],
                                posts:{post_id: posted._id},
                              });   
                              newTag.save();
                          }
                        });
                    }
                    }
                });
              }
        });    
            // console.log("Nai hoa...");
            }
          });
        res.send({"status" : true, "message" : "Successfully Posted" , "userid" : userid});

        }
        else
        {
          res.send({"status":false,
          "message":"cannot post...."});
        }
      });   
    }    
});