var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var authenticationController = require('./server/controllers/auth-controller');
var feedController = require('./server/controllers/feed-controller');
var userController = require('./server/controllers/user-controller');

app.use(bodyParser.json());
app.use('/app', express.static(__dirname + "/app"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));

mongoose.connect('mongodb://localhost:27017/social');

app.get('/', function(req, res){
	res.sendfile('index.html');
});

//authentication routes
app.post('/api/auth/signup', authenticationController.signup);
app.post('/api/auth/login', authenticationController.login);

//feed routes
app.get('/api/feed', feedController.getFeed);
app.post('/api/feed', feedController.postFeed);

//user routes
app.get('/api/user/:_id', userController.getUserDetails);
app.get('/api/user/:_id/work', userController.getWorkDetails);
app.post('/api/user/:_id/work', userController.addWorkDetails);
app.get('/api/user/:_id/education', userController.getEducationDetails);
app.post('/api/user/:_id/education', userController.addEducationDetails);

app.listen('3000', function(){
	console.log("Listening on port 3000");
});