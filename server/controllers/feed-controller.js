var mongoose = require('mongoose');
var Post = require('../datasets/posts');

//function to get all posts in the feed
module.exports.getFeed =  function (req, res) {
	Post.find({}, function(err, result){
		if(err){
			console.log("Error getting feed");
		}
		if(result){
			res.json(result);
		}
	});
}

//function to add new post to the feed
module.exports.postFeed =  function (req, res) {
	var post = new Post(req.body);
	post.save();
	res.json(post);
}