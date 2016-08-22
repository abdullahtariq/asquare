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
    
    if(user=="")
    {
        res.send({"status" : false , "message" : "First Name field is empty."});
        return;
    }
    else if( last == "")
    {
        res.send({"status" : false , "message" : "Last Name field is empty."});
        return;
    }
    else if(password == "")
    {
        res.send({"status" : false , "message" : "Password field is empty."});
        return;
    }

    userCollection.findOne({Name: user,Lname:last},function(err, result) {
    if(err)
    {
      console.log("Not found");
    }
    if (result)
    {
      res.send({"status" : false , "message" : "User Already exits"});
        return;      
    }
    else
    {
      var user1 = new userCollection(
      {Name: user, 
        Lname: last,
        Password: password});
        if (password.length < 8) {
        res.send({"status" : false , "message" : "password should contain 8 characters"});
        return;
    }
    if (password.search(/[A-Z]/i) < 0) {
        res.send({"status" : false , "message" : "password should contain upper case letter"});
        return;
    }
    if (password.search(/[a-z]/) < 0) {
        res.send({"status" : false , "message" : "password should contain atleast one lower case letter"});
        return;
    }
    if (password.search(/[0-9]/) < 0) {
        res.send({"status" : false , "message" : "password should contain atleast a number"});
        return;
    }
    

    user1.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send({"status" : true, "message" : "Successfully created" , "Userid" : result._id});
        return;
      }
    });
    
    }
  });
});
