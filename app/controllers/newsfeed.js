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
 * @api {Post} api/newsfeed Request to News Feed
 * @apiName News feed 
 * @apiGroup User_POST
 *
 * @apiParam {ID} userid login User ID.
 *
 *
  * @apiSuccess {Boolean} status  Response status.
  * @apiSuccess {String} message  Response message.
  * @apiSuccess {String} result(user_id,post,time)  Response result(user id,post ,time).
 */



router.post("/newsfeed",function(req,res){
    userid = req.body.userid;
    if(typeof req.body.userid == 'undefined')
    {
      res.send({"status":false, "message":"user id is not given", "result":"user id is not given"}); 
      return;
    }
    else if(userid=="")
    {
      res.send({"status":false,"result":"user id is not given"}); 
      return;   
    }
    var data=[];
    var arr=[];
    //arr.push(userid);
    userfollow.find({follower_id: userid },{"following_id": true }, function(err, result) 
      {
          if(err)
          {
            res.send({"status" : false , "result" : err});
          }
          else if(result)
          {
             for (var i = 0; i < Object.keys(result).length; i++) {
               arr[i]=result[i].following_id;
             }
          }
          arr[i]=userid;
          //res.send(arr);
     for (var v = 0; v <= i; v++) {
      userPosts.find({user_id:arr[v]}, function(err, result) {
          if(err)
          {
            res.send({"status":false,"message":"Error",  "result":err});
          }
          if (result)
          {
            if(result.length>0)
            for (var j = 0; j < result.length; j++) {
              data.push(result[j]);
            }
          }
        });  
    } 
    res.send(data);
});
  });