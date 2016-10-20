  var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
  userPosts = mongoose.model('posts');


module.exports = function (app) {
  app.use('/api', router);
};


// var multer  = require('multer');
// var upload = multer({ dest: 'public/uploads/' });

// var nameFile ;
// var i = (Math.random() * 1000000) >>> 0;

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads/')
//   },
//   filename: function (req, file, cb) {
//    nameFile = (new Date).getTime()+"_"+file.originalname;
//     cb(null,nameFile)
//   }
// });
 
// var upload = multer({ storage: storage });




/**
 * @api {Post} api/post_comment Request to comment a post 
 * @apiName Comment a Post
 * @apiGroup User_POST
 *
 * @apiParam {ID} userid login User Id.
 * @apiParam {ID} post_id Post Id.
 * @apiParam {File} comment User post vedio comment.
 *
 *
 * @apiSuccess {Boolean} stauts  Response stauts.
 * @apiSuccess {String} message  Response succussfully comment a post.
 */





/**
 * @api {Socket} comment Request to comment a post 
 * @apiName Comment a Post
 * @apiGroup User_POST
 *
 * @apiParam {ID} userid login User Id.
 * @apiParam {ID} post_id Post Id.
 *
 *
 * @apiSuccess {Boolean} stauts  Response stauts.
 * @apiSuccess {String} message  Response succussfully comment a post.
 */

module.exports.comment = function(socket,io,connection){
  socket.on('comment', function (data) {
    
    var obj = JSON.parse(data);
    var userid= obj.userid;
    var post_id= obj.post_id;

    userPosts.findOne({_id:post_id},function(err, result) {
        if(err)
        {
          //socket.emit('notification', {"status" : false, "message" : "userid not exits"});
        }
        if (result)
        {
          comment_userid = result.user_id;
          userCollection.findOne({_id:comment_userid}, function(err,found)
            {
              if(err)
                console.log(err);
              else if(found)
               {
                socket.emit('comment', {"status" : true, "message" : "succussfully commented"});
                
                var socketid;
                for (var j = 0; j < connection.length; j++) {
                         if(connection[j].userid==comment_userid)
                         {
                           socketid=connection[j].socketId;
                           break;
                         }
                       }
                if(j!=connection.length || i!=0)
                   {
                     socket.broadcast.to(socketid).emit('notification', {"status" : true, "message" : found.unseen});
                   }
                   else
                   {
                    console.log("socket not found");
                   }
              }
              else
              {
                console.log("not found");
              }
            });
        }
        else
        {
          
        }
      });   
    
  });
}


// router.post("/post_comment",upload.single('comment'), function(req,res){
  router.post("/post_comment", function(req,res){
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
    // else if(typeof req.file=='undefined')
    // {
    //   res.send({"status" : false,"message" : "comment is undefined"});
    //   return;
    // }
    var userid = req.body.userid;
    var post_id = req.body.post_id;
    // var file= req.file;
    var nameFile= req.body.comment;
    var name;
    var path;

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
    // else if(req.file=="")
    // {
    //     res.send({"status" : false , "message" : " comment not given."});
    //     return;
    // }

    var first_name,last_name;
    // var path = file.originalname;
    // nameFile = "uploads/"+nameFile;
    userCollection.findOne({_id: userid}, function(err, commentuser) {
          if(err)
          {
           res.send({"status":false ,"message":"id is not valid"});
            return;
          }
          if (Object(commentuser).length<=0 || commentuser.email==null )
          {
            res.send({"status":false ,"message":"not user exits with this id"});
            return;
          } 
          else
          {
            userPosts.findOne({_id: post_id},function(err, result) {
              if(err)
              {
                res.send({"status":false, "message":err});
              }
              if (result)
              {
                var arr=[];
              for (var i = 0; i < Object(result.user_comment).length; i++) {
                  if (arr.indexOf(result.user_comment[i].comment_user_id) > -1) {
                      
                  } else {
                    arr.push(result.user_comment[i].comment_user_id);
                  }
                }  
                var total_comment = result.total_comment;
                if(total_comment=="")
                  total_comment=0;
                total_comment++;
                          var milliseconds = (new Date).getTime();
                               result.user_comment.push(
                                {
                                  comment_user_id: userid,
                                  comment_first_name: commentuser.first_name,
                                  comment_last_name: commentuser.last_name,
                                  comment_profile_pic_url: commentuser.profile_pic_url,
                                  comment: nameFile,
                                  comment_time:milliseconds,
                                  enable : "true"
                                });
                                userPosts.findByIdAndUpdate({_id:post_id},{ $set: { "total_comment": total_comment}},
                                  function (err, tank) {
                                  if(tank)
                                  {
                                    var milliseconds = (new Date).getTime();
                                       result.save();
                                       for (var i = 0; i < arr.length; i++) {
                                         userCollection.findOne({_id:arr[i]},function(err,found1){
                                          if(found1)
                                            {
                                               var unseen = 0;
                                              if(typeof found1.unseen==undefined || typeof found1.unseen=="")
                                                unseen=0;
                                              else
                                                unseen= found1.unseen;
                                              unseen++;
                                              console.log(arr[i]);
                                              userCollection.findByIdAndUpdate(found1._id,{$push:
                                                      {
                                                        notification:{
                                                              userid: userid,
                                                              post_id: post_id,
                                                              user_first_name: commentuser.user_first_name,
                                                              user_last_name: commentuser.user_last_name,
                                                              notification: "comment",
                                                              notification_time:milliseconds,
                                                              notification_seen:false
                                                          }
                                      },$set: { "unseen": unseen}}, function(err,done){
                                      });
                                            }
                                         });
                                       }
                                      res.send({"status":true, "message":"sucessfully commented"});                 
                                  }
                                  else
                                  {
                                      res.send({"status":false, "message":"cannot comment"}); 
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