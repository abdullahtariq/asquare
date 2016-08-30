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
  share:String,
  comment:[{
    user_id: String,
    first_name: String,
    last_name: String,
    comment: String,
    time:String
  }]
});

posts.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('posts',posts);

