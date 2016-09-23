var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userPosts = mongoose.model('posts'),
  userCollection = mongoose.model('users');

var fs = require('fs');

var defaultPath = "uploads/img-v3.jpg" ;
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });
 
 
module.exports = function (app) {
  app.use('/api', router);
};

var nameFile ;
var milliseconds = (new Date).getTime();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    nameFile = req.body.userid+"_"+file.originalname;
    cb(null,nameFile)
  }
});
 
var upload = multer({ storage: storage });

/**
 * @api {Post} api/set_profilepicture Request to Set User Profile
 * @apiName Set profile
 * @apiGroup User
 *
 * @apiParam {ID} userid User login id.
 * @apiParam {File} picture User Profile picture.
 *
 *
 * @apiSuccess {Boolean} status True/false.
 * @apiSuccess {String} message  Response message.
 */


router.post("/set_profilepicture",upload.single('picture'), function(req,res){
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
    var userid= req.body.userid;
    var file= req.file;
    var name;
    var path;
    if(userid=="")
    {
        res.send({"status" : false , "message" : "userid is not given."});
        return;
    }
    else if(req.file=="")
    {
        res.send({"status" : false , "message" : " profile pic not given."});
        return;
    }

    nameFile = "uploads/"+nameFile;
    /*
     userCollection.findOne({_id:userid}, function(err,foundUser){
      if(err)
        {res.send({"status":false, "message" : "not successfully updated"});}
      else if(foundUser)
      {
        var oldPath = foundUser.profile_picture_url;
        if(oldPath!=defaultPath)
        {
          fs.unlink("public\\"+oldPath,function(err){
                if(err) return console.log(err);
                console.log('file deleted successfully');
           }); 
        }
      }
    });
*/

    var path = file.originalname;
      userCollection.findByIdAndUpdate(userid, { $set: { profile_picture_url: nameFile}}, function (err, tank) {
          if (err) 
            {res.send({"status":false, "message" : "not successfully updated"});}
          else
           {
            
              userCollection.update( {"following":{"$elemMatch":{follower_id:userid}} },{ $set : { "following.$.profile_picture_url": nameFile}}, function(err, rest)
                {
                  if(err)
                  {
                    res.send({"status" : false, "message" : err});
                  }
                  else if(rest)
                     {
                      userCollection.update( {"follower":{"$elemMatch":{following_id:userid}} },{ $set : { "follower.$.profile_picture_url": nameFile}}, function(err, rest)
                        {
                          if(err)
                          {
                            res.send({"status" : false, "message" : err});
                          }
                          else if(rest)
                             {
                                userPosts.update( {"user_comment":{"$elemMatch":{comment_user_id:userid}} },{ $set : { "user_comment.$.comment_profile_pic_url": nameFile}}, function(err, rest)
                                  {
                                    if(err)
                                    {
                                      res.send({"status" : false, "message" : err});
                                    }
                                    else if(rest)
                                       {
                                          userPosts.update( {"user_likes":{"$elemMatch":{like_user_id:userid}} },{ $set : { "user_likes.$.like_profile_pic_url": nameFile}}, function(err, rest)
                                          {
                                            if(err)
                                            {
                                              res.send({"status" : false, "message" : err});
                                            }
                                            else if(rest)
                                               {
                                                userPosts.update( {"user_shares":{"$elemMatch":{share_user_id:userid}} },{ $set : { "user_shares.$.share_profile_pic_url": nameFile}}, function(err, rest)
                                                  {
                                                    if(err)
                                                    {
                                                      res.send({"status" : false, "message" : err});
                                                    }
                                                    else if(rest)
                                                       {
                                                          userPosts.update( {user_id:userid },{ $set : { "user_profile_pic_url": nameFile}}, function(err, rest)
                                                            {
                                                              if(err)
                                                              {
                                                                res.send({"status" : false, "message" : err});
                                                              }
                                                              else if(rest)
                                                                 {res.send({"status" : true, "message" : "Successfully updated profile picture"});}
                                                            });
                                                       }
                                                  });
                                               }
                                          });
                                       }
                                  });
                             }
                        });          
                     }
                });



           }
        });
      });
