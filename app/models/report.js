var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var report = new Schema({
  postid: String,
  message: String,
  userid: String,
  time: String,
});

report.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('report',report);

