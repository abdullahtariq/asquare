  var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userPosts = mongoose.model('posts'),
  userCollection = mongoose.model('users'),
  userhashtag = mongoose.model('hashtag');
  
var user_id=0;
var userid=0;
module.exports = function (app) {
  app.use('/api', router);
};


var nodemailer = require('nodemailer');
console.log("hello");





/*







*/
router.post("/test",function(req,res){
  var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'zulqarnainnazir1@gmail.com', // Your email id
            pass: 'int i=1;' // Your password
        }
    });
  var text = 'Hello world from';
  transporter.verify(function(error, success) {
   if (error) {
        console.log("error");
   } else {
        console.log('Server is ready to take our messages');
   }
});

  var mailOptions = {
    from: 'kamibhai82@gmail.com>', // sender address
    to: 'zulqarnainnazir1@gmail.com', // list of receivers
    subject: 'Email Example', // Subject line
    text: text //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
};
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    };
});
});