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
    var arr=[];
    var data = req.body.search;
    var userid = req.body.userid;
    userCollection.find({Name: new RegExp(data, "i"), _id: {'$ne':userid }},{"_id":true,"Name":true,"Lname":true} ,function(err, doc) {
      if(doc)
        {
          var c=parseInt(0);
          for(var v=0;v<Object(doc).length;v++)
          {
            userfollow.findOne({follower_id:doc[c]._id, following_id:userid}, function(err, result) 
            {
                if(err)
                {
                  res.send({"status" : false , "message" : "Error", "result" : err});
                }
                else if(result)
                {
                  doc[c].follow=true;
                  //var obj={"_id":doc[c]._id ,"Name" : doc[c].Name , "Lname" :doc[c].Lname , "follow":true};
                  //arr.push(obj);
                  //console.log(obj);
                  //arr[c]=obj;
                }
                else
                {
                  doc[c].follow=false;
                  //var obj={"_id":doc[c]._id ,"Name" : doc[c].Name , "Lname" :doc[c].Lname , "follow":false};
                  //arr.push(obj);
                  //arr[c]=obj;
                }
                c++;
            });
          }
          res.send({"status":true ,"message":"found", "result":doc});
          //console.log(arr[1]);
        }
      else
        res.send({"status":false ,"message":"no result found", "result":doc});
});
});