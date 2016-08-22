var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var follows = new Schema({
  follower_id: String,
  follow_id: String,
});

follows.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('follows',follows);

