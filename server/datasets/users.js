var mongoose =  require('mongoose');
//define schema of a user
module.exports = mongoose.model('User', {
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	email: String,
	currentOrganization: String,
	currentDesignation: String,
	requestsSent: [{id:String}],
	requestsReceived: [{id:String}],
	connections: [{id: String}]
});