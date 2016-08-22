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


router.get('/follows/:id', function (req, res, next) {
    res.render('follows',{id:req.params.id});
});


router.get('/search/:id', function (req, res, next) {
    res.render('search',{id:req.params.id});
});

router.get('/profile/:id', function (req, res, next) {
    userid = req.params.id;
    res.render('profile',{id:req.params.id});
});


router.get('/main/:id', function (req, res, next) {
    res.render('main',{id:req.params.id});
});

router.get('/all/:id', function (req, res, next) {
    userid= req.params.id;
});


router.post("/login",function(req,res){
    var user= req.body.first_name;
    var password= req.body.password;
    
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







//  USER POSTS

router.post("/main/:id",function(req,res){
    var comment= req.body.comment;
    var milliseconds = (new Date).getTime();
    var user1 = new userPosts(
      { user_id:user_id,
        post: comment,
        time:milliseconds
      });
    user1.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send({"status" : true, "message" : "Successfully Posted" , "Userid" : result._id});
      }
    });    
});





//  USER FOLLOW/FOLLOWERS

router.post("/follows/:id",function(req,res){
    var fol= req.body.foll;
    var count;
    var str = req.params.id;
    var answer = str.split("=");
    userid = answer[1];
    if(fol==1)
    {
      userfollow.findOne({follower_id: userid},function(err, result) {
    if(err)
    {
      console.log('not')
      
    }
    if (result)
    {
      res.redirect('../search/id='+userid);
    }
    else
    {
      userCollection.find({_id: {'$ne':userid }},{"Name": true, "_id": true},{"limit": 3}, function(err, result) {
          if(err)
          {
            res.send(err);
          }
          else
          {
            res.render('all',{result:result});
            //res.render('../all/id='+userid);
            //res.send(result);
          }
      });
    }
  });
    }
    else
    {
      userfollow.find({follower_id: userid }, function(err, result) 
      {
          if(err)
          {
            res.send(err);
          }
          else
          {
            res.send(result);
          }
      }); 
    }

});




//  News FEED
//  SO far just own news feeed

router.post("/profile/:id",function(req,res){
    var option = req.body.profile;
    console.log(option);
    var str = req.params.id;
    var answer = str.split("=");
    userid = answer[1];
    if(option==1)
    {
      //send file to html page for posts
    userPosts.find({user_id: userid},function(err, result) {
    if(err)
    {
      console.log("Not found");
    }
    if (result)
    {
      res.render('news',{result:result});
    }
    else
    {
      res.send({"status":false,
      "message":"no post so far"});
    }
  });
      
    }
    else if( option==2)
    {
      //console.log(userid);
      //send file to html page for posts
     res.redirect('../main/id='+userid);
    }
    else
    {
      //  send file to follow un_follow page
      res.redirect('../follows/id='+userid);
    }
});





//  Follows add

router.post("/all",function(req,res){
    var option = req.body.follow;
    console.log(option);
    var user1 = new userfollow(
      {
       follower_id: userid, 
        follow_id: option
        });
    //-----Insert Into Users
    user1.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send({"status" : true, "message" : "successfully follow" , "userid" : result._id});
      }
    });
});




//  SEARCH FOLLOW

router.post("/search/:id",function(req,res){
    var data = req.body.data;
    userCollection.find({Name: new RegExp(data, "i")},{"_id":true,"Name":true,"Lname":true} ,function(err, doc) {
      res.send(doc);
});
});