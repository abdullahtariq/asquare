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



/**
 * @api {Post} api/suggestions Request to Default follows 
 * @apiName Default Follow User
 * @apiGroup Follow
 *
 * @apiParam {ID} userid login user.
 *
 * @apiSuccess {Boolean} status  Response status.
 * @apiSuccess {String} message  Response message.
 * @apiSuccess {String} result(_id,Name)  Response result(default user id,first Name).
 */

router.post("/suggestions",function(req,res){
    if(typeof req.body.userid=='undefined')
    {
      res.send({"status" : false , "message" : "userid is not given."});
        return;
    }
    userid = req.body.userid;
      userCollection.find({_id: {'$ne':userid }},{"Name": true, "_id": true},{"limit": 5}, function(err, result) {
          if(err)
          {
            res.send({"status" : false , "message" : "No suggestions", "result" : err});
          }
          else
          {
            res.send({"status" : true, "message" : "succussfully", "result" : result});
          }
      });
  });