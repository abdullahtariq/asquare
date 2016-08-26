  var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
  userPosts = mongoose.model('posts'),
  userfollow = mongoose.model('follows');

var user_id=0;
var userid=0;
module.exports = function (app) {
  app.use('/api', router);
};


router.get('/login', function (req, res, next) {
    res.render('login');
});


/**
 * @api {Post} api/total_followers Request to See Number of followers
 * @apiName See Number follower
 * @apiGroup Follow
 *
 * @apiParam {ID} userid login user.
 *
 *
 * @apiSuccess {Boolean} status  Response status.
 * @apiSuccess {String} message  Response message.
 */



router.post("/total_followers",function(req,res){
    if(typeof req.body.userid=='undefined')
    {
      res.send({"status" : false , "message" : "userid is not given."});
        return;
    }
    userid = req.body.userid;

      userfollow.count({follower_id: userid }, function(err, result) 
      {
          if(err)
          {
            res.send({"status" : false , "message" : err});
          }
          else if(result)
          {
            res.send({"status" : true , "message" : result});
          }
          else
          {
            res.send({"status" : false , "message" : "No followers"});
          }
      }); 
});