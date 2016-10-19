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
 * @api {Post} api/search Request to seacrh friends 
 * @apiName Search friend 
 * @apiGroup User
 *
 * @apiParam {String} search User Name of friend.
 * @apiParam {ID} userid Login user id.
 *
 *
 * @apiSuccess {Boolean} status  Response status of result.
  * @apiSuccess {String} message  Response message.
  * @apiSuccess {String} result(_id,Name,Lname)  Response result(_id,first Name,Last name).
 */

var user1;

router.get("/showme",function(req,res){
  userPosts.find({},function(err,found)
  {
    if(err)
      res.send({found:err});  
      else
    res.send({found:found});
  });
});
