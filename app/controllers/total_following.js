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
 * @api {Post} api/total_following Request to See Number of followering
 * @apiName See Number following
 * @apiGroup Follow
 *
 * @apiParam {ID} userid login user.
 *
 *
 * @apiSuccess {Boolean} status  Response status.
 * @apiSuccess {String} message  Response message.
 * @apiSuccess {String} result  Response total_following.
 */



router.post("/total_following",function(req,res){
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
            if(result.total_following =="")
              {
                res.send({"status" : false , "message" : "user has no following", "result":"0"});
              }
            else
            {
                res.send({"status" : true , "message" : "user has following", "result":result.total_following});
            }
          }
          else
          {
            res.send({"status" : false , "message" : "No following"});
          }
      });
});