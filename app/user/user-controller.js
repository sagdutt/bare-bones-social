angular.module('Social')
	.controller('UserController',function($scope, $rootScope, $state, $stateParams, $http){
		$scope.user_id = $stateParams.id;
		$scope.editable = false;
		$scope.addingWork = false;
		$scope.addingEducation = false;
		if($rootScope.id == $scope.user_id)
			$scope.editable = true;
		
		$scope.cancelAdding = function(){
			$scope.addingEducation = false;
			$scope.addingWork = false;
		}
		$scope.userDetails = {
			firstName: "",
			lastName:"",
			currentOrganization: "",
			currentDesignation: "",
			email: ""
		};
		$http.get('api/user/'+$scope.user_id).success(function(data){
			$scope.userDetails = data;
		});

		$scope.updatePersonal = function(){
			$scope.userDetails = {
				firstName: $scope.personal.firstName,
				lastName: $scope.personal.lastName,
				currentOrganization: $scope.personal.currentOrganization,
				currentDesignation: $scope.personal.currentDesignation,
				email: $scope.personal.email
			};
		};

		$scope.works = [];
		//get all work exp from server
		$http.get('api/user/'+$scope.user_id+'/work').success(function(data){
			console.log(data);
			$scope.works = data;
		}).error(function(error){
			console.log(error);
		});
		//helper function
		$scope.enableAddingWork = function(){
			$scope.addingWork = true;
		}
		//add new work experience
		$scope.addWork = function(){
			var work = $scope.newWork;
			work.userId = $scope.user_id;
			work.startDate = new Date(work.startDate);
			work.endDate = new Date(work.endDate);

			$http.post('api/user/'+$scope.user_id+'/work', work).success(function(data){
				$scope.addingWork = false;
				console.log(data);
				$scope.works.push(data);
			}).error(function(error){
				console.error(error);
			});
		};
		//edit details of work experience
		$scope.updateWork = function(editedWorkId){
			console.log(editedWorkId);
			for(i in $scope.works){
				if($scope.works[i].workId == editedWorkId){
					$scope.works[i] = $scope.editedWork;
					break;
				}
			}
		};

		$scope.educations = [];
		//get all education from server
		$http.get('api/user/'+$scope.user_id+'/education').success(function(data){
			console.log(data);
			$scope.educations = data;
		}).error(function(error){
			console.log(error);
		});
		//helper function
		$scope.enableAddingEducation = function(){
			$scope.addingEducation = true;
		}
		//add new education
		$scope.addEducation = function(){
			var education = $scope.newEducation;
			education.userId = $scope.user_id;
			education.startDate = new Date(education.startDate);
			education.endDate = new Date(education.endDate);

			$http.post('api/user/'+$scope.user_id+'/education', education).success(function(data){
				$scope.addingWork = false;
				console.log(data);
				$scope.educations.push(data);
			}).error(function(error){
				console.error(error);
			});
		};
		//edit details of education
		$scope.updateEducation = function(editedEducationId){
			console.log(editedEducationId);
			
		};
	});