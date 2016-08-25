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
 * @api {Post} api/see_following Request to See Followings 
 * @apiName See following
 * @apiGroup Follow
 *
 * @apiParam {ID} userid login user.
 *
 *
  * @apiSuccess {Boolean} status  Response status.
  * @apiSuccess {String} message  Response message.
  * @apiSuccess {String} result(following_id)  Response result(following_id).
 */


router.post("/see_following",function(req,res){
    if(typeof req.body.userid=='undefined')
    {
      res.send({"status" : false , "message" : "userid is not given."});
        return;
    }
    userid = req.body.userid;
      userfollow.find({following_id: userid },{"follower_id": true }, function(err, result) 
      {
          if(err)
          {
            res.send({"status" : false , "result" : err});
          }
          else if(result)
          {
            res.send({"status" : true , "message" : "succussfully found following", "result" : result});
          }
          else
          {
            res.send({"status" : true , "message" : "No Following", "result" : "Not found"}); 
          }
      }); 
});