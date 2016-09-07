// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);



module.exports = function(app,io) {
app.put('/foo', function(req, res) {

  var numUsers = 0;

io.on('connection', function (socket) {
  
});    
});
}
