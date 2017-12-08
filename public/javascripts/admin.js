var app = angular.module('sk8tApp', []);

app.controller('sk8tAdminCtrl', function($scope, $http, $timeout) {
	
	getParks();
	$scope.displaySave = true;
	$scope.displayUpdate = false;

	function getParks() {
		$scope.newPark = {
			id: 0,
			park: '',
			location: '',
			rating: '',
			descript: ''
		};		

		$http({
			method: 'GET',
			url: '/api/parks/'
		}).then(function successCallback(response) {
		    if (response && response.data) {
				$scope.parkRows = response.data;
			}
		}, function errorCallback(response) {
			alert('bad response: ' + response);
		});

	};

	// create a new park
	$scope.createSkatepark = function () {
		$http({
			method: 'POST',
			url: '/api/parks/',
			data: JSON.stringify($scope.newPark),
			headers: { 'Content-Type': 'application/JSON' }
		}).
		success(function (data) {
			$scope.status = "The park saved successfully!";
			$timeout(function(){$scope.status = '';}, 6000);
			getParks();
		})
		.error(function (error) {
			$scope.status = 'Unable to create park: ' + error.message;
			$timeout(function(){$scope.status = '';}, 6000);
		});
	}

	// edit a park
	$scope.editSkatepark = function (pId) {
		for (i in $scope.parkRows) {
			if ($scope.parkRows[i].id == pId) {
				$scope.newPark = {
					id: $scope.parkRows[i].id,
					park: $scope.parkRows[i].park,
					location: $scope.parkRows[i].location,
					rating: $scope.parkRows[i].rating,
					descript: $scope.parkRows[i].descript
				};		
		
				$scope.displaySave = false;
				$scope.displayUpdate = true;
				
				$scope.status = '';
			}
		}
	}

	// update a park
	$scope.updateSkatepark = function () {
		$http({
			method: 'PUT',
			url: '/api/parks/' + $scope.newPark.id,
			data: JSON.stringify($scope.newPark),
			headers: { 'Content-Type': 'application/JSON' }
		}).
		success(function (data) {
			$scope.status = "The park updated successfully!";
			$timeout(function(){$scope.status = '';}, 6000);
			getParks();

			$scope.displaySave = true;
			$scope.displayUpdate = false;
		})
		.error(function (error) {
			$scope.status = 'Unable to update a park: ' + error.message;
			$timeout(function(){$scope.status = '';}, 6000);
		});
	}

	// delete a park
	$scope.deleteSkatepark = function (pId) {
		$http({
			method: 'DELETE',
			url: '/api/parks/' + pId
		}).
		success(function (data) {
			$scope.status = "The park deleted successfully!!!";
			$timeout(function(){$scope.status = '';}, 6000);
			getParks();
		})
		.error(function (error) {
			$scope.status = 'Unable to delete park: ' + error.message;
			$timeout(function(){$scope.status = '';}, 6000);
		});
	}

});


