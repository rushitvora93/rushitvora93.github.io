var app = angular.module('myApp', ['vsGoogleAutocomplete']);

app.controller('MainCtrl', function($scope) {
  
  $scope.streetNumber = {
    name: '',
    
  };
  
 $scope.getBookingURL = function() {
	if($scope.addrForm.streetNumber.$invalid) 
		return "#";
	else 
		return "set_schedual.html";
 }
 
  $scope.getenterAddressURL = function() {
	if($scope.addrForm.streetNumber.$invalid) 
		return "#";
	else 
		return "set_schedual.html";
 }
  
  $scope.saveAddress = function() {
	if($scope.addrForm.streetNumber.$invalid) 
		return false;
	localStorage.setItem("address", $scope.streetNumber.name);
	
  };
  
});
