  var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userCollection = mongoose.model('users'),
  userPosts = mongoose.model('posts');

  const http =require('http');
  var httpServer = http.createServer(router);
  var io = require('socket.io')(httpServer);
module.exports = function (app) {
  app.use('/api', router);
};


/**
 * @api {Post} api/notification Request to notification 
 * @apiName Post notification
 * @apiGroup User_POST
 *
 * @apiParam {ID} userid login User Id.
 * @apiParam {ID} post_id Post Id.
 * @apiParam {String} user_first_name Post Id.
 * @apiParam {String} user_last_name Post Id.
 * @apiParam {String} notification Post Id.
 *
 *
 * @apiSuccess {Boolean} stauts  Response stauts.
 * @apiSuccess {String} message  Response succussfully.
 */


router.post("/notification",function(req,res){
    
    io.on('connection', function(socket)
      {

      });

    io.on('disconnection', function(socket)
      {
        
      });
    
});