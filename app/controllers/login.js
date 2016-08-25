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
 * @api {Post} api/login Request to login User
 * @apiName Login
 * @apiGroup User
 *
 * @apiParam {String} first_name User First Name.
 * @apiParam {String} password User Password.
 *
 *
 * @apiSuccess {Boolean} status True/false.
 * @apiSuccess {String} message  Response message.
 * @apiSuccess {ID} userid  Response ID of login user.
 */


router.post("/login",function(req,res){
    var user= req.body.first_name;
    var password= req.body.password;
    if(typeof req.body.first_name=='undefined')
    {
      res.send({"status" : false , "message" : "Name is not given."});
        return;
    }
    else if(typeof req.body.password=='undefined')
    {
      res.send({"status" : false , "message" : "password is not given."});
        return;
    }

    if(user=="")
    {
        res.send({"status" : false , "message" : "Name field is empty."});
        return;
    }
    else if(password == "")
    {
        res.send({"status" : false , "message" : "Password field is empty."});
        return;
    }


    userCollection.findOne({Name: user,Password:password},function(err, result) {
    if(err)
    {
      console.log("Not found");
    }
    if (result)
    {
      
      //user_id=result._id;
      //res.redirect('profile/id='+result._id);
      
      //  send JSon
      res.send({"status" : true, "message" : "Successfully Login" , "userid" : result._id});
      
    }
    else
    {
      res.send({"status":false,
      "message":"invalid user name or password"});
    }
  });
});
