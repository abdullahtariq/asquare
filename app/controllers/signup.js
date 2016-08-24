var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users');

var multer  =   require('multer');

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('picture');

module.exports = function (app) {
  app.use('/api', router);
};

router.get('/signup', function (req, res, next) {
    res.render('signup');
});

/**
 * @api {Post} api/register Request to register User
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
 * @apiSuccess {ID} userid  Response ID of created user.
 */

router.post("/register", function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
/*    var user= req.body.first_name;
    var last= req.body.last_name;
    var password= req.body.password;
    var file= req.files;
    var name;
    var path;
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
    else if(file=="")
    {
        res.send({"status" : false , "message" : "Upload file pic."});
        return;
    }
    var name = file[0].originalname;
    var path = file[0].path;
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
        Password: password,
        Pic_name: String,
         Pic_path: String
    });

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
        user1.save(function (err, result) {
        if (err) {
        console.log(err);
        } else {
        res.send({"status" : true, "message" : "Successfully created" , "userid" : result._id});
        }
      });
    }
    }
  });*/
});


