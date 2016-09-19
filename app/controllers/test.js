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


router.post("/test",function(req,res){
    var userid= req.body.userid;
    
  if(userid=="")
    {
      
    }
    else
    { 
      userCollection.findOne({_id:userid},function(err, result) {
        if(err)
        {
          res.send({"status" : false, "message" : "userid not exits"});
        }
        if (result)
        {
          userCollection.count({"result.notification.notification_seen" : false}, function(err, con)
            {
              if(err)
              {
                console.log(err);  
              }
              console.log(con);
              res.send({"status" : false, "message" : "userid exits"});
            });
        }
        else
        {
          
        }
      });   
    }
});