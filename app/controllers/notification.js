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

/*
var express = require('express'),
  app = express().Router,
  server = require('http').createServer(app),
  io = require('socket.io').listen(server);

server.listen(3000);
*/

router.get("/notification",function(req,res){
    
   res.render('send.html')
});


router.post("/notification",function(req,res){
    
   io.sockets.on('connection', function(socket)
  {
    socket.on('send', function(data)
    {
      io.sockets.emit('mess',data);
    });
  });
     // io.sockets.emit('mess',"data");
      res.send("send");
    
});
