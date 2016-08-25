var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var follows = new Schema({
  following_id: String,
  follower_id: String,
});

follows.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('follows',follows);

