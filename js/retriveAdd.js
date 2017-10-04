var app = angular.module('retriveAdd',[]);

app.controller('MainCtrl', function($scope) {
  
  
  $scope.streetNumber = JSON.parse(localStorage.getItem("address"));
  
});
