var mongoose = require('mongoose');
var User = require('../datasets/users');

var isPresent = function(arr, id){
	for (var i in arr) {
	    if (arr[i] && arr[i]._id == id) {
	        return i+1;
	    }
    }
    return 0;
};

//function to add connection request
module.exports.sendRequest =  function (req, res) {
	User.findOne({ _id: req.params.connectionId }, function (err, user){
			user.requestsReceived.push(req.params.userId);
			user.save();
	});
	setTimeout(function(){
		User.findOne({ _id: req.params.userId }, function (err, user){
			user.requestsSent.push(req.params.connectionId);
			user.save();
			res.json(user.requestsSent);
		});
	},10);
}

module.exports.acceptRequest =  function (req, res) {
	User.findOne({ _id: req.params.senderId }, function (err, user){
		var pos = isPresent(user.requestsSent, req.params.senderId);
		if(pos){
			var newId = user.requestsSent.splice(pos-1, 1)[0];
			user.connections.push(newId);
			user.save();
		}
	});
	setTimeout(function(){
		User.findOne({ _id: req.params.acceptorId }, function (err, user){
			var pos = isPresent(user.requestsReceived, req.params.senderId);
			if(pos){
				var newId = user.requestsReceived.splice(pos-1, 1)[0];
				user.connections.push(newId);
				user.save();
				res.json({connections: user.connections,
					requestsReceived: user.requestsReceived
				});
			}
		});	
	},10);
}

module.exports.rejectRequest =  function (req, res) {
	User.findOne({ _id: req.params.senderId }, function (err, user){
		var pos = isPresent(user.requestsSent, req.params.senderId);
		if(pos){
			user.requestsSent.splice(pos-1, 1);
			user.save();
		}
	});
	setTimeout(function(){
		User.findOne({ _id: req.params.rejectorId }, function (err, user){
			var pos = isPresent(user.requestsReceived, req.params.senderId);
			if(pos){
				user.requestsReceived.splice(pos-1, 1);
				user.save();
				res.json({requestsReceived: user.requestsReceived});
			}
		});	
	},10);
}

module.exports.cancelRequest =  function (req, res) {
	User.findOne({ _id: req.params.senderId }, function (err, user){
		var pos = isPresent(user.requestsReceived, req.params.senderId);
		if(pos){
			user.requestsReceived.splice(pos-1, 1);
			user.save();
		}
	});	
	setTimeout(function(){
		User.findOne({ _id: req.params.cancelerId }, function (err, user){
			var pos = isPresent(user.requestsSent, req.params.senderId);
			if(pos){
				user.requestsSent.splice(pos-1, 1);
				user.save();
				res.json({requestsSent: user.requestsSent});
			}
		});
	},10);
}

module.exports.removeConnection =  function (req, res) {
	User.findOne({ _id: req.params.connectionId }, function (err, user){
		var pos = isPresent(user.connections, req.params.removerId);
		if(pos){
			user.connections.splice(pos-1, 1);
			user.save();
		}
	});
	setTimeout(function(){
		User.findOne({ _id: req.params.removerId }, function (err, user){
			var pos = isPresent(user.connections, req.params.connectionId);
			if(pos){
				user.connections.splice(pos-1, 1);
				user.save();
				if(!user.connections)
					res.json([]);
				else
					res.json(user.connections);
			}
		});	
	},10);
}
module.exports.getRequests =  function (req, res) {
	var requestsReceived = [];
	var requestsSent = [];
	var connections = [];
	User.findOne({ _id: req.params.id }, 'requestsReceived requestsSent connections', function (err, user){
		User.find({_id : {
		  		$in: user.requestsReceived.map(function(obj){ return obj._id; })
			}}).
		select({ _id: 1, firstName: 1, lastName: 1}).
		exec(function(err, received){
			requestsReceived = received;
		});
		setTimeout(function(){
			User.find({_id : {
			  		$in: user.requestsSent.map(function(obj){ return obj._id; })
				}}).
			select({ _id: 1, firstName: 1, lastName: 1}).
			exec(function(err, sent){
				requestsSent = sent;
			});
		},10);
		setTimeout(function(){
			User.find({_id : {
			  		$in: user.connections.map(function(obj){ return obj._id; })
				}}).
			select({ _id: 1, firstName: 1, lastName: 1}).
			exec(function(err, conn){
				connections = conn;
				res.json({requestsSent: requestsSent,
					requestsReceived: requestsReceived,
					connections: connections
				});
			});
		},20);
	});
}