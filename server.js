var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var authenticationController = require('./server/controllers/auth-controller');
var feedController = require('./server/controllers/feed-controller');

app.use(bodyParser.json());
app.use('/app', express.static(__dirname + "/app"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));

mongoose.connect('mongodb://localhost:27017/social');

app.get('/', function(req, res){
	res.sendfile('index.html');
});

//authentication routes
app.post('/api/user/signup', authenticationController.signup);
app.post('/api/user/login', authenticationController.login);

//feed routes
app.get('/api/feed', feedController.getFeed);
app.post('/api/feed', feedController.postFeed);

app.listen('3000', function(){
	console.log("Listening on port 3000");
});