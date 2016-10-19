  var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
  userPosts = mongoose.model('posts');


module.exports = function (app) {
  app.use('/api', router);
};

/**
 * @api {Post} api/disable_comments Request to Disable comments 
 * @apiName Disabled Comment 
 * @apiGroup DASHBOARD
 *
 * @apiParam {ID} post_id  Post id.
 * @apiParam {ID} user_id  Login User id.
 * @apiParam {String} comments comments { [comment_id:id , enable,True/flase],
 				[comment_id:id , enable,True/flase]}.
 *
 *
 * @apiSuccess {Boolean} status  Response status.
 * @apiSuccess {String} message  Response Message.
 */
router.post("/disable_comments",function(req,res){
    var comments= req.body.comments;
    var userid = req.body.userid;
    var post_id = req.body.post_id;
    var obj = JSON.parse(comments);
    var arr=[];
    for (var i = 0; i < obj.length; i++) {
    	arr.push(obj[i].comment_id);
    }
    
    userPosts.update({_id:post_id, user_id:userid, "user_comment": { "$elemMatch": {"_id": { $in : arr } } } }, { $set: { "user_comment.$.enable": "false"}}, function (err, tank) {
    	if(err)
    	{
    		res.send({status:false , "message" : err});
    	}
    	else if(tank)
    	{
    		res.send({status:true , "message" : "successfully disabled"});
    	}
    	else
    	{
    		res.send("nai yrr.....!!");
    	}
    });
  
  /*console.log(arr);  
  userPosts.find({_id:post_id, user_id:userid, "user_comment": { "$elemMatch": {"_id": { $in : arr } } } }, function (err, tank) {
    	if(err)
    	{
    		res.send({status:false , "message" : "err23or"});
    	}
    	else if(tank)
    	{
    		res.send({status:true , "message" : tank});
    	}
    	else
    	{	
    		res.send({status:false , "message" : "not that way"});
    	}
    });
  */// res.send(obj[0]);
});