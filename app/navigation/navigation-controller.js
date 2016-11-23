angular.module('Social')
	.controller('NavigationController',function($scope, $rootScope, $state, $http){
		//check if user is logged in
		if(localStorage['User-Data']){
			$rootScope.loggedIn = true;
			$rootScope.id = JSON.parse(localStorage.getItem('User-Data'))._id;
		} else {
			$rootScope.loggedIn = false;
		}
		
		//function to login user
		$scope.loginUser = function (){
			$http.post('api/user/login', $scope.login).success(function(data){
				$rootScope.id = data._id;
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