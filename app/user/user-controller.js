angular.module('Social')
	.controller('UserController',function($scope, $rootScope, $state, $stateParams, $http){
		$scope.user_id = $stateParams.id;
		$scope.editable = false;
		$scope.addingWork = false;
		$scope.addingEducation = false;
		$scope.isConnection = false;
		$scope.requestSent = false;
		$scope.requested = false;
		$scope.notConnectable = ((($scope.editable || $scope.isConnection) || $scope.requestSent) || $scope.requested);
		var isPresent = function(arr, id){
			for (var i in arr) {
			    if (arr[i] && arr[i]._id == id) {
			        return i+1;
			    }
		    }
		    return 0;
		};
		var checkConnectivity = function(){
			$scope.isConnection = Boolean(isPresent($rootScope.connections, $scope.user_id));
			$scope.requestSent = Boolean(isPresent($rootScope.requestsSent, $scope.user_id));
			$scope.requested = Boolean(isPresent($rootScope.requestsReceived, $scope.user_id));
			$scope.notConnectable = ((($scope.editable || $scope.isConnection) || $scope.requestSent) || $scope.requested);	
		}
		checkConnectivity();
		if($rootScope.id == $scope.user_id)
			$scope.editable = true;
		
		$scope.sendRequest = function(){
			$http.post('api/connect/send/'+$rootScope.id+'/'+$scope.user_id).success(function(data){
				$rootScope.requestsSent = data;
				checkConnectivity();
			}).error(function(error){
				console.error(error);
			});
		}
		$scope.acceptRequest = function(){
			$http.post('api/connect/accept/'+$rootScope.id+'/'+$scope.user_id).success(function(data){
				$rootScope.requestsReceived = data.requestsReceived;
				$rootScope.connections = data.connections;
				checkConnectivity();
			}).error(function(error){
				console.error(error);
			});
		}
		$scope.rejectRequest = function(){
			$http.post('api/connect/reject/'+$rootScope.id+'/'+$scope.user_id).success(function(data){
				$rootScope.requestsReceived = data.requestsReceived;
				checkConnectivity();
			}).error(function(error){
				console.error(error);
			});
		}
		$scope.cancelRequest = function(){
			$http.post('api/connect/cancel/'+$rootScope.id+'/'+$scope.user_id).success(function(data){
				$rootScope.requestsSent = data.requestsSent;
				checkConnectivity();
			}).error(function(error){
				console.error(error);
			});
		}
		$scope.removeConnection = function(){
			$http.post('api/connect/remove/'+$rootScope.id+'/'+$scope.user_id).success(function(data){
				$rootScope.connections = data;
				checkConnectivity();
			}).error(function(error){
				console.error(error);
			});	
		}
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
				$scope.works.push(data);
			}).error(function(error){
				console.error(error);
			});
		};
		//edit details of work experience
		$scope.updateWork = function(editId){
			console.log(editId);
			// for(i in $scope.works){
			// 	if($scope.works[i].workId == editedWorkId){
			// 		$scope.works[i] = $scope.editedWork;
			// 		break;
			// 	}
			// }
		};

		$scope.educations = [];
		//get all education from server
		$http.get('api/user/'+$scope.user_id+'/education').success(function(data){
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
				$scope.addingEducation = false;
				$scope.educations.push(data);
			}).error(function(error){
				console.error(error);
			});
		};
		//edit details of education
		$scope.updateEducation = function(editId){
			console.log(editId);
			
		};
	});