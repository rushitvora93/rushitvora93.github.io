var app = angular.module('myApp', ['vsGoogleAutocomplete']);

app.controller('MainCtrl', function($scope) {
  
  $scope.streetNumber = {
    name: '',
    
  };
  
 
  
  $scope.saveAddress = function() {
	localStorage.setItem("address", $scope.streetNumber.name);
	
  };
  
});
