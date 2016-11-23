var mongoose = require('mongoose');
var User = require('../datasets/users');

//function to signup a new user
module.exports.signup =  function (req, res) {
	var user_init = req.body;
	user_init.connections = [];
	var user = new User(user_init);
	//add new user to database
	user.save();

	setTimeout(function(){
		//query newly created user to retrieve the unique user id
		User.findOne({'username': req.body.username, 'password': req.body.password}, '_id username', function(err, result){
			if(err){
				console.log("Error loging in");
			}
			if(result){
				res.json({username: req.body.username,
						_id: result._id});
			}
		});
	}, 10);
}

//function to login existing user
module.exports.login = function(req, res){
	//check to see if user and password combination exists
	User.findOne({'username': req.body.username, 'password': req.body.password}, '_id username', function(err, result){
		if(err){
			console.log("Error loging in");
		}
		if(result){
			res.json({username: req.body.username,
					_id: result._id});
		}
	});
}