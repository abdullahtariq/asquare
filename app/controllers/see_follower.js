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
 * @api {Post} api/see_follower Request to See followers
 * @apiName See follower
 * @apiGroup Follow
 *
 * @apiParam {ID} userid login user.
 *
 *
 * @apiSuccess {Boolean} status  Response status.
 * @apiSuccess {String} message  Response message.
 * @apiSuccess {String} result(follower_id)  Response result(follower_id).
 */



router.post("/see_follower",function(req,res){
    if(typeof req.body.userid=='undefined')
    {
      res.send({"status" : false , "message" : "userid is not given."});
        return;
    }
    userid = req.body.userid;

      userfollow.find({follower_id: userid }, {"following_id": true }, function(err, result) 
      {
          if(err)
          {
            res.send({"status" : false , "message" : "Error", "result" : err});
          }
          else if(result.length>0)
          {
            res.send({"status" : true , "message" : "succussfully found", "result" : result});
          }
          else
          {
            res.send({"status" : false , "message" : "No followers", "result" : "Not found"});
          }
      }); 
});