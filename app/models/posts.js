var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var posts = new Schema({
        user_id: String,
        post: String,
        time:String,
        user_first_name: String,
        user_last_name:String,
        user_profile_picture_url:String,
        total_likes:String,
        islike:Boolean,
        message:String,
        user_likes:[{
           like_user_id: String,
           like_user_first_name: String,
           like_user_last_name: String,
           like_profile_picture_url: String,
           like_time:String
        }],


        tags:[{
          tag:String,
        }],

        total_seen:String,

        total_share:String,
        thumbnail:String,
        
        code:String,
        verify:Boolean,

        user_shares:[{
           share_post_id: String,           //  post id of post that new shared
           share_user_id: String,
           share_user_first_name: String,
           share_user_last_name: String,
           share_profile_picture_url: String,
           share_time:String
        }],        


        original_postid:String,
        original_user_first_name: String,
        original_user_last_name:String,
        original_user_id:String,


        total_comment:String,
        
        user_comment:[{
          comment_user_id: String,
          comment_first_name: String,
          comment_last_name: String,
          comment_profile_pic_url: String,
          comment: String,
          comment_time:String,
          enable : String
        }],
});

posts.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('posts',posts);

