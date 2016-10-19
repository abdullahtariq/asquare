var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
report = mongoose.model('report');

module.exports = function (app) {
  app.use('/api', router);
};



/**
 * @api {Post} api/report Request to report a user
 * @apiName report post 
 * @apiGroup Report
 *
 * @apiParam {ID} post_id User Post id.
 * @apiParam {ID} user_id post id.
 * @apiParam {String} message User report message.
 *
 *
 * @apiSuccess {Boolean} status True/false.
 * @apiSuccess {String} message  Response message.
 */


router.post("/report", function(req,res){
    if(typeof req.body.post_id=='undefined')
    {
        res.send({"status" : false , "message" : "First Name field is not given."});
    }
    else if(typeof req.body.user_id=='undefined')
    {
        res.send({"status" : false , "message" : "Last name is not given."});
    }
    else if(typeof req.body.message=='undefined')
    {
        res.send({"status" : false , "message" : "message is not given."});
    }

    var user_id= req.body.user_id;
    var post_id= req.body.post_id;
    var message= req.body.message;

    if(user_id=="")
    {
        res.send({"status" : false , "message" : "User id field is empty."});
    }
    else if( post_id == "")
    {
        res.send({"status" : false , "message" : "post_id field is empty."});
        return;
    }
    else if( message == "")
    {
        res.send({"status" : false , "message" : "message field is empty."});
        return;
    }
      var milliseconds = (new Date).getTime();
      var user1 = new report(
      {
          postid: post_id,
          message: message,
          userid: user_id,
          time: milliseconds,
    });

    user1.save(function (err, result) {
    if (err) {
    console.log(err);
    } else {
         res.send({"status" : true, "message" : "Successfully report"});
    }
  });
});


