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

router.get('/view_profile/:id', function (req, res, next) {
    userid = req.params.id;
    res.render('view_profile',{id:req.params.id});
});

router.get('/post/:id', function (req, res, next) {
    res.render('post',{id:req.params.id});
});

router.get('/all/:id', function (req, res, next) {
    userid= req.params.id;
});


/**
 * @api {Post} api/login Request to login User
 * @apiName Login
 * @apiGroup User
 *
 * @apiParam {String} first_name User First Name.
 * @apiParam {String} password User Password.
 *
 *
 * @apiSuccess {Boolean} status True/false.
 * @apiSuccess {String} message  Response message.
 * @apiSuccess {ID} userid  Response ID of login user.
 */


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




/**
 * @api {Post} api/post Request to Add Post 
 * @apiName Post
 * @apiGroup User_POST
 *
 * @apiParam {String} post User Post.
 * @apiParam {ID} userid User Id .
 *
 *
 * @apiSuccess {Boolean} status True/false.
 * @apiSuccess {String} message  Response message.
 * @apiSuccess {ID} userid Response ID of login user.
 */



//  USER POSTS

router.post("/post",function(req,res){
    var comment= req.body.post;
    userid = req.body.userid;
    console.log(userid);
    if(comment == "")
    {
        res.send({"status" : false, "message" : "empty post"});
    }
    else
    {    var milliseconds = (new Date).getTime();
      var user1 = new userPosts(
        { user_id:userid,
          post: comment,
          time:milliseconds
        });
      user1.save(function (err, result) {
        if (err) {
          console.log(err);
        } else {
          res.send({"status" : true, "message" : "Successfully Posted" , "userid" : userid});
        }
      });
    }    
});


/**
 * @api {Post} api/default_follows Request to Default follows 
 * @apiName Default Follow User
 * @apiGroup Follow
 *
 * @apiParam {ID} userid login user.
 *
 *
 * @apiSuccess {String} result(_id,Name)  Response result(default user id,first Name).
 */

router.post("/default_follows",function(req,res){
    userid = req.body.userid;
      userCollection.find({_id: {'$ne':userid }},{"Name": true, "_id": true},{"limit": 5}, function(err, result) {
          if(err)
          {
            res.send(err);
          }
          else
          {
            res.send({"status" : true, "result" : result});
          }
      });
  });



/**
 * @api {Post} api/see_follower Request to See followers
 * @apiName See follower
 * @apiGroup Follow
 *
 * @apiParam {ID} userid login user.
 *
 *
 * @apiSuccess {Boolean} status  Response status.
 * @apiSuccess {String} result(follower_id)  Response result(follower_id).
 */



router.post("/see_follower",function(req,res){
    userid = req.body.userid;
      userfollow.find({following_id: userid }, {"follower_id": true }, function(err, result) 
      {
          if(err)
          {
            res.send({"status" : false , "result" : err});
          }
          else if(result)
          {
            res.send({"status" : true , "result" : result});
          }
          else
          {
            res.send({"status" : false , "result" : "Not found"});
          }
      }); 
});



/**
 * @api {Post} api/see_following Request to See Followings 
 * @apiName See following
 * @apiGroup Follow
 *
 * @apiParam {ID} userid login user.
 *
 *
  * @apiSuccess {Boolean} status  Response status.
  * @apiSuccess {String} message(following_id)  Response result(following_id).
 */


router.post("/see_following",function(req,res){
    userid = req.body.userid;
      userfollow.find({follower_id: userid },{"following_id": true }, function(err, result) 
      {
          if(err)
          {
            res.send({"status" : false , "message" : err});
          }
          else if(result)
          {
            res.send({"status" : true , "message" : result});
          }
          else
          {
            res.send({"status" : true , "message" : "Not found"}); 
          }
      }); 
});




/**
 * @api {Post} api/newsfeed Request to News Feed
 * @apiName News feed 
 * @apiGroup User_POST
 *
 * @apiParam {ID} userid login User ID.
 *
 *
  * @apiSuccess {Boolean} status  Response status.
  * @apiSuccess {String} result(user_id,post,time)  Response result(user id,post ,time).
 */



router.post("/newsfeed",function(req,res){
    userid = req.body.userid;
    if(typeof req.body.userid == 'undefined')
    {
      res.send({"status":false,"result":"user id is not given"}); 
      return;
    }
    else if(userid=="")
    {
      res.send({"status":false,"result":"user id is not given"}); 
      return;   
    }
    userPosts.find({user_id:userid},{"user_id": true, "post": true, "time":true},function(err, result) {
    if(err)
    {
      res.send({"status":false,"result":err});
    }
    if (Object.keys(result).length != 0)
    {
      //  Array of follows
   /*   var answer = result;
      var arr;
      userfollow.find({follower_id: userid},{"follow_id" : true}, function(err, result) {
          if(err)
          {
            res.send(err);
          }
          else
          {
            arr= result.map(function(item) {
                return item.id;
            });
            res.send(arr);
          }
      });
      return;
     */ //res.render('news',{result:result});
     res.send({"status":true,"result":result});
    }
    else
    {
      res.send({"status":false,"result":"no post so far"});
    }
  });
 
});


/**
 * @api {Post} api/view_profile Request to View Profile 
 * @apiName view profile
 * @apiGroup User
 *
 * @apiParam {ID} userid User id.
 *
 *
 * @apiSuccess {Boolean} status  Response status.
  * @apiSuccess {String} result(_id,Name,Lname)  Response result(_id,first Name,Last name).
 */



//  Friends Profile

router.post("/view_profile", function(req,res){
    var search = req.body.userid;
    if(search=="")
    {
      res.send({"status":false,
        "result":"search bar is empty"});
    }
    else
    {
      userCollection.findOne({_id: search},{"_id":true,"Name": true, "Lname":true},function(err, result) {
      if(err)
      {
        console.log("Not found");
      }
      if (result)
      {
        res.send({"status":true , "result" : result});
      }
      else
      {
        res.send({"status":false,
        "result":"invalid user name"});
      }
      });
    }
});


/**
 * @api {Post} api/follow_friend Request to Follow a friend 
 * @apiName Follow a friend
 * @apiGroup Follow
 *
 * @apiParam {ID} userid login User Id.
 * @apiParam {ID} friend_id friend User Id.
 *
 *
 * @apiSuccess {Boolean} stauts  Response stauts.
 * @apiSuccess {String} message  Response succussfully follow.
 * @apiSuccess {String} follower_id  Response follower_id.
 * @apiSuccess {String} following_id Response following_id.
 */


router.post("/follow_friend",function(req,res){
    var userid = req.body.userid;
    var option = req.body.friend_id;
    var user1 = new userfollow(
      {
       follower_id: option, 
        following_id: userid
        });
    //-----Insert Into Users
    user1.save(function (err, result) {
      if (err) {
        res.send({"status" : false, "result" : err });
      } else {
        res.send({"status" : true, "result" : "successfully follow" , "follower_id" : option, "following_id" : userid});
      }
    });
});


/**
 * @api {Post} api/search Request to seacrh friends 
 * @apiName Search friend 
 * @apiGroup User
 *
 * @apiParam {String} search User Name of friend.
 * @apiParam {ID} userid Login user id.
 *
 *
 * @apiSuccess {Boolean} status  Response status of result.
  * @apiSuccess {String} result(_id,Name,Lname)  Response result(_id,first Name,Last name).
 */



//  SEARCH FOLLOW

router.post("/search",function(req,res){
    var data = req.body.search;
    var userid = req.body.userid;
    userCollection.find({Name: new RegExp(data, "i"), _id: {'$ne':userid }},{"_id":true,"Name":true,"Lname":true} ,function(err, doc) {
      if(doc)
        res.send({"status":true , "result'":doc});
      else
        res.send({"status":false , "result":doc});
});
});