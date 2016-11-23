angular.module('Social',['ui.router'])
	.config(function($stateProvider, $urlRouterProvider){
		//define default route
		$urlRouterProvider.otherwise('/');
		
		//define each route in the app
		$stateProvider
			.state('home',{
				url: "/",
				templateUrl: "app/home/home.html",
			})
			.state('signUp',{
				url: "/signup",
				templateUrl: "app/signup/signup.html",
				controller: "SignUpController"
			})
			.state('feed',{
				url: "/feed",
				templateUrl: "app/feed/feed.html",
				controller: "FeedController"
			})
			.state('user',{
				url: "/user/:id",
				templateUrl: "app/user/user.html",
				controller: "UserController"
			})
	});