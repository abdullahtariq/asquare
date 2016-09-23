var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
  userPosts = mongoose.model('posts'),
  transaction = mongoose.model('transaction'),
  userfollow = mongoose.model('follows');

var user_id=0;
var userid=0;
module.exports = function (app) {
  app.use('/api', router);
};

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
  * @apiSuccess {String} message  Response message.
  * @apiSuccess {String} result(_id,Name,Lname)  Response result(_id,first Name,Last name).
 */

var user1;

router.post("/search",function(req,res){
    if(typeof req.body.userid=='undefined')
    {
      res.send({"status" : false , "message" : "userid is not given."});
        return;
    }
    else if(typeof req.body.search=='undefined')
    {
      res.send({"status" : false , "message" : "search name is not given."});
        return;
    }
    var data = req.body.search;
    var userid = req.body.userid;
    var resultFound;
    var arr=[];
    userCollection.find({first_name: new RegExp(data, "i"), _id: {'$ne':userid }},
      {"_id":true,"first_name":true,"last_name":true, "follow":true} ,function(err, doc) {
      if(doc)
        {


          doc = JSON.parse(JSON.stringify(doc));
          for (var i = 0; i < Object(doc).length; i++) {
              userfollow.findOne({follower_id:doc[i]._id, following_id:userid}, function(err, found)
                {
                  i--;
                  if(err)
                  {
                    console.log("ooo error");
                  }
                  if(found)
                  {
                    user1 = new transaction(
                      {
                        user_id: userid,
                        user_first_name: doc[i].first_name,
                        user_last_name:doc[i].last_name,
                        isfollow:"true",
                    });
                  }
                  else
                  {
                    user1= new transaction(
                      {
                        user_id: userid,
                        user_first_name: doc[i].first_name,
                        user_last_name:doc[i].last_name,
                        isfollow:"false",
                    });
                  }
                  user1.save();
               //   arr.push(user1);
                });
          }
//          console.log(arr);

              transaction.find(function(err,found){
                  transaction.find(function(err,found){
                        res.send({"status":true ,"message":"found", "result":found});
                    });
              }); 

              transaction.remove(function(found){});  
        }
      else
        res.send({"status":false ,"message":"no result found", "result":doc});
});
});
