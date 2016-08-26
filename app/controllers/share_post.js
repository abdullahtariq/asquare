  var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
  userPosts = mongoose.model('posts'),
  userfollow = mongoose.model('follows')
  postShare = mongoose.model('share');

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
 * @apiSuccess {String} message  Response succussfully follow.
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
    userCollection.findOne({_id: userid}, function(err, result) {
          if(err)
          {
            console.log("Not found");
            return;
          }
          if (Object(result).length<=0)
          {
            res.send({"status":false ,"message":"not user exits with this id"});
            return;
          }
      });
    var total_share=0;
    postShare.findOne({post_id: post_id,user_id:userid},function(err, result) {
    if(err)
    {
      res.send({"status":false, "message":err});
    }
    if (result)
    {  
        res.send({"status":false, "message":"already share this post"});
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
            if(typeof result.share=='undefined')
                total_share=0;
            else
                total_share=result.share;
            total_share++;
            var comment = result.post;
            userPosts.findByIdAndUpdate(post_id, { $set: { share: total_share}}, function (err, tank) {
              if (err) 
                {res.send({"status":false, "message" : err});}
              else
                {

                    var milliseconds = (new Date).getTime();
                     var user1 = new postShare(
                      {post_id: post_id,
                        user_id: userid,
                        time: milliseconds
                    });
                     var sharepost = new userPosts(
                        { user_id:userid,
                          post: comment,
                          time:milliseconds
                        });
                     user1.save(function (err, result) {
                        if (err) {
                          console.log(err);
                        } else {
                            sharepost.save();
                             res.send({"status" : true, "message":"sucessfully share"});
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