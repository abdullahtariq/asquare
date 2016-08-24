var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var userlikes = new Schema({
  post_id: String,
  user_id: String,
  time:String
});

userlikes.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('userlikes',userlikes);

