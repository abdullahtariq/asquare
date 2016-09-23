var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var transaction = new Schema({
        user_id: String,
        user_first_name: String,
        user_last_name:String,
        isfollow:String,
});

transaction .virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('transaction',transaction );

