angular.module('Social')
	.controller('UserController',function($scope, $rootScope, $state, $stateParams, $http){
		$scope.user_id = $stateParams.id;
		$scope.editable = false;
		if($rootScope.id == $scope.user_id)
			$scope.editable = true;
		$scope.editProfile = function(){
			console.log("editing user"+$scope.id);
		}
	});