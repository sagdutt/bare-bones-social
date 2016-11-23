var mongoose =  require('mongoose');
//define schema of a work
module.exports = mongoose.model('Work', {
	userId: String,
	organization: String,
	designation: String,
	startDate: String,
	endDate: String,
	description: String
});