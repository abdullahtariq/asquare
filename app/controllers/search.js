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



//  SEARCH FOLLOW

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
    userCollection.find({first_name: new RegExp(data, "i"),last_name: new RegExp(data, "i"), _id: {'$ne':userid }},
      {"_id":true,"first_name":true,"last_name":true} ,function(err, doc) {
      if(doc)
        {
          res.send({"status":true ,"message":"found", "result":doc});
        }
      else
        res.send({"status":false ,"message":"no result found", "result":doc});
});
});