var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users');

module.exports = function (app) {
  app.use('/api', router);
};

router.get('/signup', function (req, res, next) {
    res.render('signup');
});
router.post("/register",function(req,res){
    var user= req.body.first_name;
    var last= req.body.last_name;
    var password= req.body.password;
    var repassword= req.body.repassword;
    
    if(password!=repassword)
      res.send("password not matched.");

    var user1 = new userCollection(
      {Name: user, 
        Lname: last,
        Password: password});
    console.log(userCollection);
    //-----Insert Into Users
    user1.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send({"status" : true, "message" : "Successfully created" , "Userid" : result._id});
      }
    });
});
