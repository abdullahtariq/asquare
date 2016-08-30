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
    userPosts.findOne({_id: post_id},function(err, result) {
        if(err)
        {
          res.send({"status":false, "message":err});
        }
        if (result)
        {  
            if(typeof result.share=='undefined' || typeof result.share==null)
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
                  userCollection.findOne({_id:userid}, function(err,ress){
                    var milliseconds = (new Date).getTime();
                     var sharepost = new userPosts(
                        { user_id:userid,
                          post: comment,
                          name: ress.Name,
                          lname:ress.Lname,
                          time:milliseconds,
                          likes:null,
                          share_postid:post_id,
                          share_name: result.name,
                          share_lname:result.lname,
                          share_userid:result.user_id,
                          time:milliseconds,
                          share:null
                        });
                     sharepost.save(function (err, result) {
                        if (err) {
                          console.log(err);
                        } else {
                             res.send({"status" : true, "message":"sucessfully share"});
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
});