angular.module('Social')
	.controller('NavigationController',function($scope, $rootScope, $state, $http){
		//check if user is logged in
		if(localStorage['User-Data']){
			$rootScope.loggedIn = true;
			var userData = JSON.parse(localStorage.getItem('User-Data'));
			$rootScope.id = userData._id;
			$rootScope.connections = userData.connections?userData.connections : [];
			$rootScope.requestsSent = userData.requestsSent?userData.requestsSent : [];
			$rootScope.requestsReceived = userData.requestsReceived?userData.requestsReceived : [];
		} else {
			$rootScope.loggedIn = false;
		}
		
		//function to login user
		$scope.loginUser = function (){
			$http.post('api/auth/login', $scope.login).success(function(data){
				$rootScope.id = data._id;
				$rootScope.connections = data.connections?data.connections : [];
				$rootScope.requestsSent = data.requestsSent?data.requestsSent : [];
				$rootScope.requestsReceived = data.requestsReceived?data.requestsReceived : [];
				localStorage.setItem('User-Data', JSON.stringify(data));
				$scope.login.username = "";
				$scope.login.password = "";
				$rootScope.loggedIn = true;
				$state.go('feed');
			}).error(function(error){
				console.error(error);
			});
		}
		//function to logout user
		$scope.logoutUser = function(){
			localStorage.removeItem('User-Data');
			$rootScope.loggedIn = false;
			$rootScope.id = undefined;
			$state.go('home');
		}
	});