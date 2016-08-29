  var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
  userPosts = mongoose.model('posts'),
  userfollow = mongoose.model('follows'),
  postShare = mongoose.model('share');

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
    userCollection.findOne({_id: userid}, function(err, result) {
          if(err)
          {
           res.send({"status":false ,"message":"id is not valid"});
            return;
          }
          if (Object(result).length<=0 || result.Name==null )
          {
            res.send({"status":false ,"message":"not user exits with this id"});
            return;
          } 
          first_name=result.Name;
          last_name=result.Lname;
      });
    userPosts.findOne({_id: post_id},function(err, result) {
        if(err)
        {
          res.send({"status":false, "message":err});
        }
        if (result)
        {  
                    var milliseconds = (new Date).getTime();
                         result.comment.push({user_id: userid, comment: comment, first_name: first_name, last_name: last_name, time:milliseconds});
                         result.save(function (err, tank) {
                            if(tank)
                            {
                                res.send({"status":true, "message":"sucessfully commented"});                 
                            }
                         });
        }
        else
        {
            res.send({"status":false, "message":"no post exits with this id"});   
        }   
        });
});