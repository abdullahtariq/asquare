  var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
  userPosts = mongoose.model('posts');


module.exports = function (app) {
  app.use('/api', router);
};



/**
 * @api {Post} api/seen Request to see post 
 * @apiName See Posts
 * @apiGroup User_POST
 *
 * @apiParam {ID} post_id Post Id.
 *
 *
 * @apiSuccess {Boolean} stauts  Response stauts.
 * @apiSuccess {String} message  Response succussfully comment a post.
 */

 

router.post("/seen", function(req,res){
    if(typeof req.body.post_id=='undefined')
    {
      res.send({"status" : false,"message" : "post_id is undefined"});
      return;
    }

    var post_id = req.body.post_id;

    if(post_id=="")
    {
      res.send({"status" : false,"message" : "post_id is not given"});
      return;
    }
    
    userPosts.findOne({_id: post_id},function(err, post) {
      if(err)
      {
        res.send({"status":false, "message":err});
      }
      if (post)
      {
        var seen;
        console.log(post.total_seen);
        if(post.total_seen ==undefined)
          seen=0;
        else
          seen = post.total_seen;
        if(seen == "")
          {
            seen=0;
          }
        seen++;
        console.log("seen " + seen);
        userPosts.findByIdAndUpdate(post_id, { $set: { "total_seen": seen }}, function(err,yes){
                        if(err)
                        {
                            res.send({"status":false, "message":err});                   
                            return;         
                        }
                        else
                        {
                          res.send({"status":true, "message":"Seen"});
                        }
                       });
      }
  });
  }); 