  var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
  userPosts = mongoose.model('posts');


module.exports = function (app) {
  app.use('/api', router);
};


router.post("/test",function(req,res){
    var userid= req.body.userid;
    var obj = JSON.parse(userid);
    res.send({userid : obj.message[0].comment_user_id});
});