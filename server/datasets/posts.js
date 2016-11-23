var mongoose =  require('mongoose');
//define schema of a post
module.exports = mongoose.model('Post', {
	user: String,
	user_id: String,
	text: String,
	created_on: String
});