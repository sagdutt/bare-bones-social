angular.module('Social')
	.controller('ConnectionsController', function($scope, $rootScope, $state, $http){
		$scope.received = [];
		$scope.sent = [];
		$scope.conn = [];
		var getRequests = function(){
			$http.get('api/connect/getRequests/'+$rootScope.id).success(function(data){
				$scope.received = data.requestsReceived;
				$scope.sent = data.requestsSent;
				$scope.conn = data.connections;
			}).error(function(error){
				console.error(error);
			});
		};
		getRequests();
		$scope.acceptRequest = function(userId){
			$http.post('api/connect/accept/'+$rootScope.id+'/'+userId).success(function(data){
				$rootScope.requestsReceived = data.requestsReceived;
				$rootScope.connections = data.connections;
				getRequests();
			}).error(function(error){
				console.error(error);
			});
		}
		$scope.rejectRequest = function(userId){
			$http.post('api/connect/reject/'+$rootScope.id+'/'+userId).success(function(data){
				$rootScope.requestsReceived = data.requestsReceived;
				getRequests();
			}).error(function(error){
				console.error(error);
			});
		}
		$scope.cancelRequest = function(userId){
			$http.post('api/connect/cancel/'+$rootScope.id+'/'+userId).success(function(data){
				$rootScope.requestsSent = data.requestsSent;
				getRequests();
			}).error(function(error){
				console.error(error);
			});
		}
		$scope.removeConnection = function(userId){
			$http.post('api/connect/remove/'+$rootScope.id+'/'+userId).success(function(data){
				$rootScope.connections = data;
				getRequests();
			}).error(function(error){
				console.error(error);
			});	
		}
	});
