var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;


var url = 'mongodb://localhost:27017/facing';


MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {

	console.log('Connection established to', url);

    var collection = db.collection('users');
	
	var http = require("http");
	var express = require("express");
	var app=express();
	app.use(express.bodyParser());
	app.use(app.router);
	http.createServer(app).listen(8081);
	
	var passport = require("passport");
	var passport_local = require("passport-local").Strategy;
	app.use(passport.initialize);
	
	app.get("/login",function(req,res)
	{
		res.sendfile("./login.html");
	});
	
	
	app.get("/signup",function(req,res)
	{
		res.sendfile("./signup.html");
	});
	
	
	
	app.post("/login",function(req,res){
		
		var user= req.body.first_name;
		var password= req.body.password;
		console.log(user);
		console.log(password);
		
		collection.findOne({Name: user,Password:password},function(err, result) {
		if(err)
		{
			console.log("Not found");
		}
		if (result)
		{
			console.log(result);
			res.send({
			"status":true,
			"message":"successfuly login"
			});
		}
		else
		{
			res.send({"status":false,
			"message":"invalid user name and password"});
		}
	});
      //Close connection
      db.close();
    });
	
	
	
	
	
	app.post("/signup",function(req,res){
		var user= req.body.first_name;
		var last= req.body.last_name;
		var password= req.body.password;
		var repassword= req.body.repassword;
		var user1 = {Name: user, Lname: last,Password: password};
		var collection = db.collection('users');
		//-----Insert Into Users
		collection.insert(user1, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send("Inserted");
      }
      //Close connection
      db.close();
    });
	});
  }
});
