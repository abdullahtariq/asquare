var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
  userPosts= mongoose.model('posts'),
  userfollow = mongoose.model('follows');

module.exports = function (app) {
  app.use('/api', router);
};


var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });

var nameFile ;
var i = (Math.random() * 1000000) >>> 0;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    nameFile = i+"_"+file.originalname;
    cb(null,nameFile)
  }
});
 
var upload = multer({ storage: storage });

/**
 * @api {Post} api/post Request to Add Post 
 * @apiName Post
 * @apiGroup User_POST
 *
 * @apiParam {File} post User post vedio.
 * @apiParam {ID} userid User Id .
 *
 *
 * @apiSuccess {Boolean} status True/false.
 * @apiSuccess {String} message  Response message.
 * @apiSuccess {ID} userid Response ID of login user.
 */



//  USER POSTS

router.post("/post",upload.single('post'),function(req,res){
    if(typeof req.body.userid=='undefined')
    {
      res.send({"status" : false , "message" : "userid is undefined."});
        return;
    }
    else if(typeof req.file=='undefined')
    {
      res.send({"status" : false , "message" : "picture is undefined."});
        return;
    }
    var file= req.file;
    var name;
    var path;
    userid = req.body.userid;
    nameFile = "uploads/"+nameFile;
    if(userid=="")
    {
        res.send({"status" : false, "message" : "userid empty"});
    }
    else if(req.file=="")
    {
        res.send({"status" : false , "message" : " post not given."});
        return;
    }
    else
    { 
      var path = file.originalname;
      userCollection.findOne({_id:userid},function(err, result) {
        if(err)
        {
            res.send({"status" : false, "message" : "userid not exits"});
            return;     
        }
        if (result)
        {
          var milliseconds = (new Date).getTime();
          var user1 = new userPosts(
            { user_id:userid,
              post: nameFile,
              time:milliseconds,
              user_first_name: result.first_name,
              user_last_name:result.last_name,
              user_profile_picture_url:result.profile_picture_url,
              total_likes:"",
              total_share:"",
              total_comment:"",
              original_postid:null,
              original_user_first_name: null,
              original_user_last_name:null,
              original_user_id:null,
              total_file:""
            });
          user1.save(function (err, result) {
            if (err) {
              console.log(err);
            } else {
              res.send({"status" : true, "message" : "Successfully Posted" , "userid" : userid});
            }
          });
        }
        else
        {
          res.send({"status":false,
          "message":"cannot post...."});
        }
      });   
    }    
});