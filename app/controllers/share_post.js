  var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
  userPosts = mongoose.model('posts');


module.exports = function (app) {
  app.use('/api', router);
};


/**
 * @api {Post} api/share_post Request to Share post 
 * @apiName Share a friend Post
 * @apiGroup User_POST
 *
 * @apiParam {ID} userid login User Id.
 * @apiParam {ID} post_id Post Id.
 *
 *
 * @apiSuccess {Boolean} stauts  Response stauts.
 * @apiSuccess {String} message  Response succussfully Share a post.
 */


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
                     var sharepost = new userPosts(
                        { 
                          user_id:userid,
                          post: comment,
                          time:milliseconds,
                          user_first_name: shareuser.first_name,
                          user_last_name:shareuser.last_name,
                          user_profile_picture_url:shareuser.profile_picture_url,
                          total_likes:"",
                          total_share:"",
                          original_postid:result._id,
                          original_user_first_name: result.user_first_name,
                          original_user_last_name:result.user_last_name,
                          original_user_id:result.user_id,
                          total_comment:""
                        });

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
                                  function (err, tank) {
                                  if(tank)
                                  {
                                      sharepost.save();
                                      res.send({"status" : true, "message":"sucessfully share"});
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