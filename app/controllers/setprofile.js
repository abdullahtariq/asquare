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

// var nameFile ;
// var milliseconds = (new Date).getTime();

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads/')
//   },
//   filename: function (req, file, cb) {
//     nameFile = (new Date).getTime()+"_"+file.originalname;
//     cb(null,nameFile)
//   }
// });
 
// var upload = multer({ storage: storage });

/**
 * @api {Post} api/set_profilepicture Request to Set User Profile
 * @apiName Set profile
 * @apiGroup User
 *
 * @apiParam {ID} userid User login id.
 * @apiParam {String} picture User Profile picture.
 *
 *
 * @apiSuccess {Boolean} status True/false.
 * @apiSuccess {String} message  Response message.
 */


// router.post("/set_profilepicture",upload.single('picture'), function(req,res){
  router.post("/set_profilepicture", function(req,res){
    if(typeof req.body.userid=='undefined')
    {
      res.send({"status" : false , "message" : "userid is undefined."});
        return;
    }

    var userid= req.body.userid;
    
    if(userid=="")
    {
        res.send({"status" : false , "message" : "userid is not given."});
        return;
    }
 
    var nameFile = req.picture;
    
    //  userCollection.findOne({_id:userid}, function(err,foundUser){
    //   if(err)
    //     {res.send({"status":false, "message" : "not successfully updated"});}
    //   else if(foundUser)
    //   {
    //     var oldPath = foundUser.profile_picture_url;
    //     if(oldPath!=defaultPath)
    //     {
    //       fs.unlink("public\\"+oldPath,function(err){
    //             if(err) return console.log(err);
    //             console.log('file deleted successfully');
    //        }); 
    //     }
    //   }
    // });


      userCollection.findByIdAndUpdate(userid, { $set: { profile_picture_url: nameFile}}, function (err, tank) {
          if (err) 
            {
              res.send({"status":false, "message" : "not successfully updated"});
              return;
            }
          else
           {
              userCollection.update( {"following":{"$elemMatch":{follower_id:userid}} },{ $set : { "following.$.profile_picture_url": nameFile}}, function(err, rest)
                {
                  if(err)
                  {
                    res.send({"status" : false, "message" : err});
                    return;
                  }
                  else
                     {
                      userCollection.update( {"follower":{"$elemMatch":{following_id:userid}} },{ $set : { "follower.$.profile_picture_url": nameFile}}, function(err, rest)
                        {
                          if(err)
                          {
                            res.send({"status" : false, "message" : err});
                            return;
                          }
                          else
                             {
                                userPosts.update( {"user_comment":{"$elemMatch":{comment_user_id:userid}} },{ $set : { "user_comment.$.comment_profile_pic_url": nameFile}}, function(err, rest)
                                  {
                                    if(err)
                                    {
                                      res.send({"status" : false, "message" : err});
                                      return;
                                    }
                                    else
                                       {
                                          userPosts.update( {"user_likes":{"$elemMatch":{like_user_id:userid}} },{ $set : { "user_likes.$.like_profile_picture_url": nameFile}}, function(err, rest)
                                          {
                                            if(err)
                                            {
                                              res.send({"status" : false, "message" : err});
                                              return;
                                            }
                                            else
                                               {
                                                userPosts.update( {"user_shares":{"$elemMatch":{share_user_id:userid}} },{ $set : { "user_shares.$.share_profile_picture_url": nameFile}}, function(err, rest)
                                                  {
                                                    if(err)
                                                    {
                                                      res.send({"status" : false, "message" : err});
                                                      return;
                                                    }
                                                    else
                                                       {
                                                          userPosts.update( {user_id:userid },{ $set : { "user_profile_picture_url": nameFile}}, function(err, rest)
                                                            {
                                                              if(err)
                                                              {
                                                                res.send({"status" : false, "message" : err});
                                                                return;
                                                              }
                                                              else if(rest)
                                                                 {
                                                                  res.send({"status" : true, "message" : "Successfully updated profile picture"});
                                                                }
                                                                else
                                                                {
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
           }
        });
      });
