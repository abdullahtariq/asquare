define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./apidoc/main.js",
    "group": "C__Users_Naini_Documents_GitHub_asquare_apidoc_main_js",
    "groupTitle": "C__Users_Naini_Documents_GitHub_asquare_apidoc_main_js",
    "name": ""
  },
  {
    "type": "Post",
    "url": "api/disable_comments",
    "title": "Request to Disable comments",
    "name": "Disabled_Comment",
    "group": "DASHBOARD",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "post_id",
            "description": "<p>Post id.</p>"
          },
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "user_id",
            "description": "<p>Login User id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comments",
            "description": "<p>comments { [comment_id:id , enable,True/flase], \t\t\t\t[comment_id:id , enable,True/flase]}.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response Message.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/disable_comments.js",
    "groupTitle": "DASHBOARD"
  },
  {
    "type": "Post",
    "url": "api/view_all_comments",
    "title": "Request to View All Comments",
    "name": "View_all_comments",
    "group": "DASHBOARD",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>login User Id.</p>"
          },
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "post_id",
            "description": "<p>POst Id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "bucket",
            "description": "<p>Bucket.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response stauts.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response All coments array Json.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "offset",
            "description": "<p>Response offset.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/view_all_comments.js",
    "groupTitle": "DASHBOARD"
  },
  {
    "type": "Post",
    "url": "api/isfollow",
    "title": "Request to isfollow a friend",
    "name": "Check_follow_or_not",
    "group": "Follow",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>login User Id.</p>"
          },
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "friend_id",
            "description": "<p>friend User Id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response stauts.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response follow.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/isfollow.js",
    "groupTitle": "Follow"
  },
  {
    "type": "Post",
    "url": "api/suggestions",
    "title": "Request to Default follows",
    "name": "Default_Follow_User",
    "group": "Follow",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>login user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>(_id,Name)  Response result(default user id,first Name).</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/suggestions.js",
    "groupTitle": "Follow"
  },
  {
    "type": "Socket",
    "url": "follow",
    "title": "Request to Follow a friend",
    "name": "Follow_a_friend",
    "group": "Follow",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>login User Id.</p>"
          },
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "friend_id",
            "description": "<p>friend User Id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "stauts",
            "description": "<p>Response stauts.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response succussfully follow.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/follow_friend.js",
    "groupTitle": "Follow"
  },
  {
    "type": "Post",
    "url": "api/total_followers",
    "title": "Request to See Number of followers",
    "name": "See_Number_follower",
    "group": "Follow",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>login user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>Response total_follower.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/total_followers.js",
    "groupTitle": "Follow"
  },
  {
    "type": "Post",
    "url": "api/total_following",
    "title": "Request to See Number of followering",
    "name": "See_Number_following",
    "group": "Follow",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>login user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>Response total_following.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/total_following.js",
    "groupTitle": "Follow"
  },
  {
    "type": "Post",
    "url": "api/see_follower",
    "title": "Request to See Follower",
    "name": "See_follower",
    "group": "Follow",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>login user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>(follower)  Response result(follower).</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/see_following.js",
    "groupTitle": "Follow"
  },
  {
    "type": "Post",
    "url": "api/see_following",
    "title": "Request to See following",
    "name": "See_following",
    "group": "Follow",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>login user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>(following)  Response result(following).</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/see_follower.js",
    "groupTitle": "Follow"
  },
  {
    "type": "Post",
    "url": "api/unfollow",
    "title": "Request to Unfollow a friend",
    "name": "UnFollow_a_friend",
    "group": "Follow",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>login User Id.</p>"
          },
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "friend_id",
            "description": "<p>friend User Id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "stauts",
            "description": "<p>Response stauts.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response succussfully follow.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/unfollow.js",
    "groupTitle": "Follow"
  },
  {
    "type": "Post",
    "url": "api/report",
    "title": "Request to report a user",
    "name": "report_post",
    "group": "Report",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "post_id",
            "description": "<p>User Post id.</p>"
          },
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "user_id",
            "description": "<p>post id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>User report message.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>True/false.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/report.js",
    "groupTitle": "Report"
  },
  {
    "type": "Post",
    "url": "api/seen",
    "title": "Request to notification Seen",
    "name": "Notification_seen",
    "group": "USER_NOTIFICATIONS",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>User Who like post.</p>"
          },
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "notification_id",
            "description": "<p>Offset.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response  Message.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/seenNotification.js",
    "groupTitle": "USER_NOTIFICATIONS"
  },
  {
    "type": "Socket",
    "url": "notification",
    "title": "To see number of unreadable notification",
    "name": "Number_of_unseen_notification",
    "group": "USER_NOTIFICATIONS",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>User Id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response  Number of notification.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/notification.js",
    "groupTitle": "USER_NOTIFICATIONS"
  },
  {
    "type": "Post",
    "url": "api/notification",
    "title": "Request to see notification",
    "name": "See_notification",
    "group": "USER_NOTIFICATIONS",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>User id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "bucket",
            "description": "<p>Bucket.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response  Array of Objects.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "offset",
            "description": "<p>Response offset.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/notification.js",
    "groupTitle": "USER_NOTIFICATIONS"
  },
  {
    "type": "Post",
    "url": "api/register",
    "title": "Request to register User",
    "name": "Create",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>User First Name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>User Last Name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User Email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User Password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>True/false.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>Response ID of created user.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/signup.js",
    "groupTitle": "User"
  },
  {
    "type": "Post",
    "url": "api/login",
    "title": "Request to login User",
    "name": "Login",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User Email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User Password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>True/false.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>Response ID of login user.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/login.js",
    "groupTitle": "User"
  },
  {
    "type": "Post",
    "url": "api/search",
    "title": "Request to seacrh friends",
    "name": "Search_friend",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "search",
            "description": "<p>User Name of friend.</p>"
          },
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>Login user id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response status of result.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>(_id,Name,Lname)  Response result(_id,first Name,Last name).</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/search.js",
    "groupTitle": "User"
  },
  {
    "type": "Post",
    "url": "api/search",
    "title": "Request to seacrh friends",
    "name": "Search_friend",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "search",
            "description": "<p>User Name of friend.</p>"
          },
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>Login user id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response status of result.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>(_id,Name,Lname)  Response result(_id,first Name,Last name).</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/showme.js",
    "groupTitle": "User"
  },
  {
    "type": "Post",
    "url": "api/cover_picture",
    "title": "Request to Set Profile Cover",
    "name": "Set_cover_picture",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>User login id.</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "picture",
            "description": "<p>User Profile picture.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>True/false.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/cover_picture.js",
    "groupTitle": "User"
  },
  {
    "type": "Post",
    "url": "api/set_profilepicture",
    "title": "Request to Set User Profile",
    "name": "Set_profile",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>User login id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "picture",
            "description": "<p>User Profile picture.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>True/false.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/setprofile.js",
    "groupTitle": "User"
  },
  {
    "type": "Post",
    "url": "api/update_profile",
    "title": "Request to update profile",
    "name": "Update_Profile",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>Login user id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>User First Name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>User Last Name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_name",
            "description": "<p>User user_name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User Password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "date_of_birth",
            "description": "<p>User date_of_birth.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>User description.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response status of result.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/update profile.js",
    "groupTitle": "User"
  },
  {
    "type": "Socket",
    "url": "comment",
    "title": "Request to comment a post",
    "name": "Comment_a_Post",
    "group": "User_POST",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>login User Id.</p>"
          },
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "post_id",
            "description": "<p>Post Id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "stauts",
            "description": "<p>Response stauts.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response succussfully comment a post.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/comment.js",
    "groupTitle": "User_POST"
  },
  {
    "type": "Post",
    "url": "api/post_comment",
    "title": "Request to comment a post",
    "name": "Comment_a_Post",
    "group": "User_POST",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>login User Id.</p>"
          },
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "post_id",
            "description": "<p>Post Id.</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "comment",
            "description": "<p>User post vedio comment.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "stauts",
            "description": "<p>Response stauts.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response succussfully comment a post.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/comment.js",
    "groupTitle": "User_POST"
  },
  {
    "type": "Post",
    "url": "api/get_hashtag",
    "title": "Request to Get Post on Tags",
    "name": "Get_Post_On_HashTag",
    "group": "User_POST",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tag",
            "description": "<p>HashTag name.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "bucket",
            "description": "<p>Bucket.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response posts.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/getHashtag.js",
    "groupTitle": "User_POST"
  },
  {
    "type": "Socket",
    "url": "likepost",
    "title": "Request to like a user post",
    "name": "Like_post",
    "group": "User_POST",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "post_id",
            "description": "<p>User Post id.</p>"
          },
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>User Who like post.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>True/false.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/likepost.js",
    "groupTitle": "User_POST"
  },
  {
    "type": "Post",
    "url": "api/newsfeed",
    "title": "Request to News Feed",
    "name": "News_feed",
    "group": "User_POST",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>login User ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "bucket",
            "description": "<p>Bucket.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response  Array of Objects.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "offset",
            "description": "<p>Response offset.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/newsfeed.js",
    "groupTitle": "User_POST"
  },
  {
    "type": "Post",
    "url": "api/post",
    "title": "Request to Add Post",
    "name": "Post",
    "group": "User_POST",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "post",
            "description": "<p>User post vedio.</p>"
          },
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>User Id .</p>"
          },
          {
            "group": "Parameter",
            "type": "JSON",
            "optional": false,
            "field": "hashtags",
            "description": "<p>User Hashtags.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>User message .</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>True/false.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>Response ID of login user.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/posts.js",
    "groupTitle": "User_POST"
  },
  {
    "type": "Socket",
    "url": "post",
    "title": "Request to Add Post",
    "name": "Post",
    "group": "User_POST",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>User Id .</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>True/false.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/posts.js",
    "groupTitle": "User_POST"
  },
  {
    "type": "Post",
    "url": "api/post_detail",
    "title": "see detail user post",
    "name": "Post_detail",
    "group": "User_POST",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "post_id",
            "description": "<p>User Post id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>True/false.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>Response JSON object.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/post_detail.js",
    "groupTitle": "User_POST"
  },
  {
    "type": "Post",
    "url": "api/post_liker",
    "title": "See the id(s) who likes this post",
    "name": "Post_likers",
    "group": "User_POST",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "post_id",
            "description": "<p>User Post id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>Array of User.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/post_liker.js",
    "groupTitle": "User_POST"
  },
  {
    "type": "Post",
    "url": "api/seen",
    "title": "Request to see post",
    "name": "See_Posts",
    "group": "User_POST",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "post_id",
            "description": "<p>Post Id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "stauts",
            "description": "<p>Response stauts.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response succussfully comment a post.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/seen.js",
    "groupTitle": "User_POST"
  },
  {
    "type": "Socket",
    "url": "sharepost",
    "title": "Request to Share post",
    "name": "Share_a_friend_Post",
    "group": "User_POST",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>login User Id.</p>"
          },
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "post_id",
            "description": "<p>Post Id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "stauts",
            "description": "<p>Response stauts.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response succussfully Share a post.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/share_post.js",
    "groupTitle": "User_POST"
  },
  {
    "type": "Post",
    "url": "api/time_line",
    "title": "Request to Show time line posts",
    "name": "Timeline_Posts",
    "group": "User_POST",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "user_id",
            "description": "<p>User Id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "bucket",
            "description": "<p>Bucket.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "stauts",
            "description": "<p>Response stauts.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response succussfully comment a post.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/timeline.js",
    "groupTitle": "User_POST"
  },
  {
    "type": "Post",
    "url": "api/total_likes",
    "title": "Request to see total number like a user post",
    "name": "Total_Likes_of_a_post",
    "group": "User_POST",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "post_id",
            "description": "<p>User Post id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>True/false.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response total likes .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>Response total likes .</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/total_likes.js",
    "groupTitle": "User_POST"
  },
  {
    "type": "Post",
    "url": "api/total_share",
    "title": "Request total number share a user post",
    "name": "Total_share_of_a_post",
    "group": "User_POST",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "post_id",
            "description": "<p>User Post id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>True/false.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response total share.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/total_share.js",
    "groupTitle": "User_POST"
  },
  {
    "type": "Post",
    "url": "api/unlike_post",
    "title": "Request to Unlike a user post",
    "name": "Unlike_post",
    "group": "User_POST",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "post_id",
            "description": "<p>User Post id.</p>"
          },
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>User Who like post.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>True/false.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/unlike_post.js",
    "groupTitle": "User_POST"
  },
  {
    "type": "Post",
    "url": "api/delete_post",
    "title": "Request to delete post",
    "name": "delete_Post",
    "group": "User_POST",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "post_id",
            "description": "<p>Post Id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "stauts",
            "description": "<p>Response stauts.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response succussfully Delete.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/delete_post.js",
    "groupTitle": "User_POST"
  },
  {
    "type": "Post",
    "url": "api/view_profile",
    "title": "Request to View Profile",
    "name": "view_profile",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "userid",
            "description": "<p>User id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>Response JSON object.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/controllers/view_profile.js",
    "groupTitle": "User"
  }
] });
