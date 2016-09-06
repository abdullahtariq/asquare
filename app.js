 

 var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

server.listen(3000);


 /*

var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
var app = express();

require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

*/



app.get('/', function (req,res)
{
	res.sendFile(__dirname+'/app/views/send.html');
});

app.post('/', function(req,res)
	{
	//	var data = req.body.data;
//io.sockets.on('connection', function(socket)/
//	{
//		socket.on('send', function(data)
//		{
			console.log("data");
			io.sockets.emit('mess',"data");
//		});
//	});
		
	});