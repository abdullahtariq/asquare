var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var hashtag = new Schema({
        tag: String,
        
        posts:[{
          post_id : String
        }],
});

hashtag.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('hashtag',hashtag);

