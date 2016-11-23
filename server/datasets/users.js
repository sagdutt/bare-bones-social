var mongoose =  require('mongoose');
//define schema of a user
module.exports = mongoose.model('User', {
	username: String,
	password: String,
	connections: [{id: String}]
});