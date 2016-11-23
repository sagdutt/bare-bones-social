angular.module('Social')
	.controller('SignUpController',function($scope, $rootScope, $state, $http){
		//function to create a new user
		$scope.createUser = function () {
			$http.post('api/user/signup', $scope.newUser).success(function(data){
				//login to the user account if account creation is successful
				localStorage.setItem('User-Data', JSON.stringify(data));
				$rootScope.loggedIn = true;
				$scope.newUser.username = "";
				$scope.newUser.password = "";
				$state.go('feed');
			}).error(function(error) {
				console.error(error);
			});
		}
	})