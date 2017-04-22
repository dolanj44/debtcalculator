var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.counter = 1;
    $scope.rows = ['Row 1'];
    $scope.addAcct = function() {
    	$scope.counter = $scope.counter +1;
			$scope.rows.push('Row ' + $scope.counter);
    }

});