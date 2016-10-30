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
 * @api {Post} api/register Request to register User
 * @apiName Create
 * @apiGroup User
 *
 * @apiParam {String} first_name User First Name.
 * @apiParam {String} last_name User Last Name.
 * @apiParam {String} email User Email.
 * @apiParam {String} password User Password.
 *
 *
 * @apiSuccess {Boolean} status True/false.
 * @apiSuccess {String} message  Response message.
 * @apiSuccess {ID} userid  Response ID of created user.
 */


router.post("/register", function(req,res){
    if(typeof req.body.first_name=='undefined')
    {
        res.send({"status" : false , "message" : "First Name field is not given."});
        return;
    }
    else if(typeof req.body.last_name=='undefined')
    {
        res.send({"status" : false , "message" : "Last name is not given."});
        return;
    }
    else if(typeof req.body.password=='undefined')
    {
        res.send({"status" : false , "message" : "password is not given."});
        return;
    }
    else if(typeof req.body.email=='undefined')
    {
        res.send({"status" : false , "message" : "email is not given."});
        return;
    }



    var user= req.body.first_name;
    var last= req.body.last_name;
    var email= req.body.email;
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
    else if( email == "")
    {
        res.send({"status" : false , "message" : "Email field is empty."});
        return;
    }
    else if(password == "")
    {
        res.send({"status" : false , "message" : "Password field is empty."});
        return;
    }
    userCollection.findOne({email:email},function(err, result) {
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
        var milliseconds = (new Date).getTime();
      var user1 = new userCollection(
      {
        first_name: user,
        last_name: last,
        user_name:"",
        password: password,
        email: email,
        profile_picture_url:"uploads/img-v3.jpg",
        cover_picture_url:"uploads/img-v3.jpg",
        date_of_birth: "",
        description:"",
        facebook:"",
        isfollow:false,
        email_verified: false,
        signup_time:milliseconds,
        total_follower: "",
        total_following:"",
        total_posts:"",
        unseen : "",
    });

    // if (password.length < 8) {
    //     res.send({"status" : false , "message" : "password should contain 8 characters"});
    //     return;
    // }
    // else if (password.search(/[A-Z]/) < 0) {
    //     res.send({"status" : false , "message" : "password should contain upper case letter"});
    //     return;
    // }
    // else if (password.search(/[a-z]/) < 0) {
    //     res.send({"status" : false , "message" : "password should contain atleast one lower case letter"});
    //     return;
    // }
    // else if (password.search(/[0-9]/) < 0) {
    //     res.send({"status" : false , "message" : "password should contain atleast a number"});
    //     return;
    // }
    // else
    // {
        // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // var isValidEmail = re.test(email);
        // if(isValidEmail)
        // {
        //    var helper = require('sendgrid').mail
  
// from_email = new helper.Email("zulqarnainnazir1@gmail.com")
// to_email = new helper.Email("zulqarnainnazir4@gmail.com")
// subject = "Sending with SendGrid is Fun"
// content = new helper.Content("text/plain", "and easy to do anywhere, even with Node.js")
// mail = new helper.Mail(from_email, subject, to_email, content)

// var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
// var request = sg.emptyRequest({
//   method: 'POST',
//   path: '/v3/mail/send',
//   body: mail.toJSON()
// });

// sg.API(request, function(error, response) {
//   console.log(response.statusCode)
//   console.log(response.body)
//   console.log(response.headers)
// })
                    user1.save(function (err, result) {
                    if (err) {
                    console.log(err);
                    } else {

                   console.log("hpe you good");
                         res.send({"status" : true, "message" : "Successfully created" , "userid" : result._id});
                    }
                  });
    //     }
    //     else
    //     {
    //         res.send({"status" : false , "message" : "email is not valid"});
    //         return;
    //     }
    // // }
    }
  });
});


