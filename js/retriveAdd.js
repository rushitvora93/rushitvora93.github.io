var app = angular.module('retriveAdd',[]);

app.controller('MainCtrl', function($scope) {
  
  $scope.streetNumber = {
    name: '',
    
  };
  
  $scope.streetNumber.name = localStorage.getItem("address");
  
});
