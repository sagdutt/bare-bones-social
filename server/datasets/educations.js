var mongoose =  require('mongoose');
//define schema of a work
module.exports = mongoose.model('Education', {
	userId: String,
	institute: String,
	degree: String,
	startDate: String,
	endDate: String,
	description: String
});