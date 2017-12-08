var app = angular.module('sk8tApp', []);

app.controller('sk8tCtrl', function($scope, $http) {
	$scope.parkRows = null;
	$scope.parkName = '';

    $scope.searchAction = function() { 
    	$scope.parkRows = [];
    	if (!$scope.parkName || $scope.parkName.length === 0) return;
		$http({
			method: 'GET',
			url: '/api/parks?park=' + $scope.parkName
		}).then(function successCallback(response) {
		    if (response && response.data) {
				//$scope.parkRows = JSON.parse(response.data);
				$scope.parkRows = response.data;
			}
		}, function errorCallback(response) {
			alert('bad response: ' + response);
		});
    };

    $scope.parkNameChange = function() { 
    	$scope.parkRows = null;
	};    	
});


