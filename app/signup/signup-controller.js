angular.module('Social')
	.controller('SignUpController',function($scope, $rootScope, $state, $http){
		//function to create a new user
		$scope.createUser = function () {
			$http.post('api/auth/signup', $scope.newUser).success(function(data){
				//login to the user account if account creation is successful
				localStorage.setItem('User-Data', JSON.stringify(data));
				$rootScope.loggedIn = true;
				$rootScope.id = data._id;
				$scope.newUser.username = "";
				$scope.newUser.password = "";
				$scope.newUser.firstName = "";
				$scope.newUser.lastName = "";
				$scope.newUser.email = "";
				$scope.newUser.currentOrganization = "";
				$scope.newUser.currentDesignation = "";
				$state.go('feed');
			}).error(function(error) {
				console.error(error);
			});
		}
	})