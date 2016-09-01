var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users');

module.exports = function (app) {
  app.use('/api', router);
};


var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });


router.get('/update_profile', function (req, res, next) {
    res.render('update_profile');
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
 
var upload = multer({ storage: storage });



/**
 * @api {Post} api/update_profile Request to update profile 
 * @apiName Update Profile 
 * @apiGroup User
 *
 * @apiParam {ID} userid Login user id.
 * @apiParam {String} first_name User First Name.
 * @apiParam {String} last_name User Last Name.
 * @apiParam {String} user_name User user_name.
 * @apiParam {String} password User Password.
 * @apiParam {String} date_of_birth User date_of_birth.
 * @apiParam {String} description User description.
 *
 *
 * @apiSuccess {Boolean} status  Response status of result.
 * @apiSuccess {String} message  Response message.
 */

router.post("/update_profile", upload.single('picture'), function(req,res){
    if(typeof req.body.first_name=='undefined')
    {
      res.send({"status" : false , "message" : "first_name is not given."});
        return;
    }
    else if(typeof req.body.password=='undefined')
    {
      res.send({"status" : false , "message" : "password is not given."});
        return;
    }
    else if(typeof req.body.userid=='undefined')
    {
      res.send({"status" : false , "message" : "userid is not given."});
        return;
    }
    else if(typeof req.body.last_name=='undefined')
    {
      res.send({"status" : false , "message" : "last_name is not given."});
        return;
    }
    else if(typeof req.body.date_of_birth=='undefined')
    {
      res.send({"status" : false , "message" : "date_of_birth is not given."});
        return;
    }
    else if(typeof req.body.description=='undefined')
    {
      res.send({"status" : false , "message" : "description is not given."});
        return;
    }
    else if(typeof req.body.user_name=='undefined')
    {
      res.send({"status" : false , "message" : "user_name is not given."});
        return;
    }

    var id= req.body.userid;
    var first_name= req.body.first_name;
    var last_name= req.body.last_name;
    var password= req.body.password;
    var user_name= req.body.user_name;
    var date_of_birth= req.body.date_of_birth;
    var description= req.body.description;



    if(id=="")
    {
    	res.send({"status" : false , "message" : "Id is empty."});
        return;
    }
    else if(first_name=="")
    {
        res.send({"status" : false , "message" : "First Name field is empty."});
        return;
    }
    else if( last_name == "")
    {
        res.send({"status" : false , "message" : "Last Name field is empty."});
        return;
    }
    else if(password == "")
    {
        res.send({"status" : false , "message" : "Password field is empty."});
        return;
    }
    
    
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
        userCollection.findOne({_id: id},function(err, result) {
            if(err)
            {
                res.send({"status":false, "message":"invalid user "}); 
            }
            if (result)
            {
                userCollection.findByIdAndUpdate(id, { $set: { first_name: first_name, last_name:last_name, password:password, user_name: user_name , date_of_birth:date_of_birth, description:description}}, function (err, tank) {
                      if (err) 
                        {res.send({"status":false, "message" : "not successfully updated"});}
                      else
                      res.send({"status":true, "message" : "successfully updated"});
                    });  
            }
            else
            {
              res.send({"status":false, "message":"invalid user "});
            }
          });
    }
  });