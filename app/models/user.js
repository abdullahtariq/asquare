// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var users = new Schema({
  Name: String,
  Lname: String,
  Password: String
});

users.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('users',users);

