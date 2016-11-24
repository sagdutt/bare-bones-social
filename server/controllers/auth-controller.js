var mongoose = require('mongoose');
var User = require('../datasets/users');

//function to signup a new user
module.exports.signup =  function (req, res) {
	var user_init = req.body;
	console.log(req.body);
	user_init.requestsSent = [];
	user_init.requestsReceived = [];
	user_init.connections = [];
	var user = new User(user_init);
	//add new user to database
	user.save();

	setTimeout(function(){
		//query newly created user to retrieve the unique user id
		User.findOne({'username': req.body.username, 'password': req.body.password}, '_id username connections requestsSent requestsReceived', function(err, result){
			if(err){
				console.log("Error loging in");
			}
			if(result){
				res.json(result);
			}
		});
	}, 10);
}

//function to login existing user
module.exports.login = function(req, res){
	//check to see if user and password combination exists
	User.findOne({'username': req.body.username, 'password': req.body.password}, '_id username connections requestsSent requestsReceived', function(err, result){
		if(err){
			console.log("Error loging in");
		}
		if(result){
			res.json(result);
		}
	});
}