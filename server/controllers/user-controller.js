var mongoose = require('mongoose');
var User = require('../datasets/users');
var Work = require('../datasets/works');
var Education = require('../datasets/educations');

//function to get a user's personal details
module.exports.getUserDetails =  function (req, res) {
	User.findOne({'_id': req.params._id}, 'firstName lastName currentOrganization currentDesignation email', function(err, result){
		if(err){
			console.log("Error loging in");
		}
		if(result){
			res.json(result);
		}
	});
}
//function to get a user's work details
module.exports.getWorkDetails =  function (req, res) {
	Work.find({'userId': req.params._id}, function(err, result){
		if(err){
			console.log("Error loging in");
		}
		if(result){
			res.json(result);
		}
	});
}
//function to add a new work experience
module.exports.addWorkDetails =  function (req, res) {
	var work = new Work(req.body);
	work.save();
	setTimeout(function(){
		Work.findOne(req.body, '_id', function(err, result){
			if(err){
				console.log("Error loging in");
			}
			if(result){
				work.workId = result._id;
				res.json(work);
			}
		});
	},10);
}
//function to get a user's education details
module.exports.getEducationDetails =  function (req, res) {
	Education.find({'userId': req.params._id}, function(err, result){
		if(err){
			console.log("Error loging in");
		}
		if(result){
			res.json(result);
		}
	});
}
//function to add a new education detail
module.exports.addEducationDetails =  function (req, res) {
	var edu = new Education(req.body);
	edu.save();
	setTimeout(function(){
		Education.findOne(req.body, '_id', function(err, result){
			if(err){
				console.log("Error loging in");
			}
			if(result){
				edu.educationId = result._id;
				res.json(edu);
			}
		});
	},10);
}