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

/**
 * @api {Post} app/signup Request to create User
 * @apiName Create
 * @apiGroup User
 *
 * @apiParam {String} first_name User First Name.
 * @apiParam {String} last_name User Last Name.
 * @apiParam {String} password User Password.
 *
 *
 * @apiSuccess {Boolean} status True/false.
 * @apiSuccess {String} message  Response message.
 * @apiSuccess {ID} ID  Response ID of created user.
 */

router.post("/register",function(req,res){
    var user= req.body.first_name;
    var last= req.body.last_name;
    var password= req.body.password;
    var repassword= req.body.repassword;



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
        res.send({"status" : true, "message" : "Successfully created" , "userid" : result._id});
      }
    });


/// to find
    /*userCollection.find(function (err, articles) {
    if (err) return next(err);
    console.log(articles);
  });*/
});
