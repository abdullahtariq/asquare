var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var posts = new Schema({
  user_id: String,
  post: String,
});

posts.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('posts',posts);

