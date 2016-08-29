var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var posts = new Schema({
  user_id: String,
  post: String,
  time:String,
  name: String,
  lname:String,
  likes:String,
  share_postid:String,
  share_name: String,
  share_lname:String,
  share_userid:String,
  share:String
});

posts.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('posts',posts);

