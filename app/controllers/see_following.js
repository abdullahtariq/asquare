  var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users');
  
var user_id=0;
var userid=0;
module.exports = function (app) {
  app.use('/api', router);
};


router.get('/login', function (req, res, next) {
    res.render('login');
});



/**
 * @api {Post} api/see_follower Request to See Follower 
 * @apiName See follower
 * @apiGroup Follow
 *
 * @apiParam {ID} userid login user.
 *
 *
  * @apiSuccess {Boolean} status  Response status.
  * @apiSuccess {String} message  Response message.
  * @apiSuccess {String} result(follower)  Response result(follower).
 */


router.post("/see_follower",function(req,res){
    if(typeof req.body.userid=='undefined')
    {
      res.send({"status" : false , "message" : "userid is not given."});
        return;
    }
    userid = req.body.userid;
    if(userid=="")
    {
      res.send({"status" : false , "message" : "userid is empty."});
        return; 
    }
      userCollection.findOne({_id: userid}, function(err, result) 
      {
          if(err)
          {
            res.send({"status" : false , "message" : "Error", "result" : "not found"});
          }
          else if(result)
          {
            if(result.total_follower<=0)
            {
              res.send({"status" : false , "message" : "No following"}); 
            }
            else
            {
              res.send({"status" : true , "message" : "succussfully found", "result" : result.follower});
            }
          }
          else
          {
            res.send({"status" : false , "message" : "No followers", "result" : "Not found"});
          }
      }); 
});