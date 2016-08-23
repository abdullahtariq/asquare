var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users');

module.exports = function (app) {
  app.use('/api', router);
};

router.get('/update_profile', function (req, res, next) {
    res.render('update_profile');
});
/**
 * @api {Post} api/update_profile Request to update profile 
 * @apiName Update Profile 
 * @apiGroup User
 *
 * @apiParam {ID} userid Login user id.
 * @apiParam {String} first_name User First Name.
 * @apiParam {String} last_name User Last Name.
 * @apiParam {String} password User Password.
 *
 *
 * @apiSuccess {Boolean} status  Response status of result.
  * @apiSuccess {String} message  Response message.
 */

router.post("/update_profile",function(req,res){
    var id= req.body.userid;
    var user= req.body.first_name;
    var last= req.body.last_name;
    var password= req.body.password;
    if(id=="")
    {
    	res.send({"status" : false , "message" : "Id is not given."});
        return;
    }
    else if(user=="")
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

      var user1 = new userCollection(
      {Name: user,
        Lname: last,
        Password: password});

    if (password.length < 8) {
        res.send({"status" : false , "message" : "password should contain 8 characters"});
        return;
    }
    else if (password.search(/[A-Z]/) < 0) {
        res.send({"status" : false , "message" : "password should contain upper case letter"});
        return;
    }
    else if (password.search(/[a-z]/) < 0) {
        res.send({"status" : false , "message" : "password should contain atleast one lower case letter"});
        return;
    }
    else if (password.search(/[0-9]/) < 0) {
        res.send({"status" : false , "message" : "password should contain atleast a number"});
        return;
    }
    else
    {
        userCollection.findByIdAndUpdate(id, { $set: { Name: user, Lname:last, Password:password }}, function (err, tank) {
		  if (err) 
		  	{res.send({"status":false, "message" : "not successfully updated"});}
		  else
		  res.send({"status":true, "message" : "successfully updated"});
		});
    }
  });