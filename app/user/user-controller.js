angular.module('Social')
	.controller('UserController',function($scope, $rootScope, $state, $stateParams, $http){
		$scope.user_id = $stateParams.id;
		$scope.editable = false;
		if($rootScope.id == $scope.user_id)
			$scope.editable = true;
		
		$scope.userDetails = {
			firstName: "abc",
			lastName: "def",
			currentOrganization: "NRI fintech",
			currentDesignation: "CEO",
			email: 'abc@abc.com',
		};

		$scope.works = [
			{
				organization: "NRI fintech",
				designation: "CEO",
				startDate: new Date("7-1-2017"),
				endDate: new Date("7-1-2019"),
				description: "I rule this shit."
			}
		];

		$scope.educations = [
			{
				institute: "Institute of Engineering and Management",
				degree: "B. Tech in Computer Science",
				startDate: new Date("7-1-2013"),
				endDate: new Date("6-30-2017"),
				description: "Had a shitload of fun."
			}
		];
	});