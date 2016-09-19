  var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
  userPosts = mongoose.model('posts');


module.exports = function (app) {
  app.use('/api', router);
};


/**
 * @api {Post} api/post_comment Request to comment a post 
 * @apiName Comment a Post
 * @apiGroup User_POST
 *
 * @apiParam {ID} userid login User Id.
 * @apiParam {ID} post_id Post Id.
 * @apiParam {String} comment Post comment.
 *
 *
 * @apiSuccess {Boolean} stauts  Response stauts.
 * @apiSuccess {String} message  Response succussfully comment a post.
 */


router.post("/post_comment",function(req,res){
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
    else if(typeof req.body.comment=='undefined')
    {
      res.send({"status" : false,"message" : "comment is undefined"});
      return;
    }
    var userid = req.body.userid;
    var post_id = req.body.post_id;
    var comment = req.body.comment;
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
    else if(comment=="")
    {
      res.send({"status" : false,"message" : "comment is not given"});
      return;
    }
    var first_name,last_name;
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
                                  comment: comment,
                                  comment_time:milliseconds
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
                                      res.send({"status":true, "message":"sucessfully commented", "arr": arr});                 
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