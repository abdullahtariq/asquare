var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users');

module.exports = function (app) {
  app.use('/api', router);
};

router.get('/login', function (req, res, next) {
    res.render('login');
});
router.post("/login",function(req,res){
    var user= req.body.first_name;
    var password= req.body.password;
    userCollection.findOne({Name: user,Password:password},function(err, result) {
    if(err)
    {
      console.log("Not found");
    }
    if (result)
    {
      user_id=result._id;
      
      
      //   send file to html page for posts
      
      
      //console.log(result);
      //res.redirect('main.html?id='+result._id);
      

      
      //  send JSon
      
      
      res.send({"status" : true, "message" : "Successfully Login" , "userid" : user_id});
      
      
      
      //  send file to follow un_follow page
      //res.redirect('follows.html?id='+result._id);
      
    }
    else
    {
      res.send({"status":false,
      "message":"invalid user name and password"});
    }
  });
});
