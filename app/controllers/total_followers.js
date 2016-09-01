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
 * @api {Post} api/total_followers Request to See Number of followers
 * @apiName See Number follower
 * @apiGroup Follow
 *
 * @apiParam {ID} userid login user.
 *
 *
 * @apiSuccess {Boolean} status  Response status.
 * @apiSuccess {String} message  Response message.
 * @apiSuccess {String} result  Response total_follower.
 */



router.post("/total_followers",function(req,res){
    if(typeof req.body.userid=='undefined')
    {
      res.send({"status" : false , "message" : "userid is not given."});
        return;
    }
    userid = req.body.userid;

      userCollection.findOne({_id: userid }, function(err, result) 
      {
          if(err)
          {
            res.send({"status" : false , "message" : err});
          }
          else if(result)
          {
            if(result.total_follower =="")
              {
                res.send({"status" : false , "message" : "user has no followers", "result":"0"});
              }
            else
            {
                res.send({"status" : true , "message" : "user has followers", "result":result.total_follower});
            }
          }
          else
          {
            res.send({"status" : false , "message" : "No followers"});
          }
      }); 
});