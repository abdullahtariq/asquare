var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var share = new Schema({
  post_id: String,
  user_id: String,
  time:String
});

share.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('share',share);

