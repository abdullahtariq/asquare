
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var users = new Schema({
  first_name: String,
  last_name: String,
  user_name:String,
  password: String,
  email: String,
  profile_picture_url:String,
  cover_picture_url:String,
  date_of_birth: String,
  description:String,
  facebook:String,
  email_verified: Boolean,
  signup_time:String,


  total_follower: String,

  follower:[{
    following_id: String,
    following_first_name: String,
    following_last_name: String,
    following_profile_picture_url: String,
  }],


  total_following: String,

  following:[{
    follower_id: String,
    follower_first_name: String,
    follower_last_name: String,
    follower_profile_picture_url: String,
  }],

  total_posts: String,



  notification:[{
    userid: String,
    post_id: String,
    user_first_name: String,
    user_last_name: String,
    notification: String,
    notification_time:String,
    notification_seen:Boolean
  }],



});

users.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('users',users);

