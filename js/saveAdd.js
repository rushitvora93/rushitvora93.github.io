var app = angular.module('myApp', ['vsGoogleAutocomplete']);
app.directive('selectOnClick', ['$window', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
           scope.$watch('streetNumber.formattedText', function(newValue) {
			if (!$window.getSelection().toString() && element[0].value.indexOf("number") !== -1) {
                    // Required for mobile Safari
                    element[0].setSelectionRange(element[0].value.length-7, element[0].value.length)
                }
  });
                
          
        }
    };
}]);

app.controller('MainCtrl', function($scope, $location) {
  
  function initialize() {
	var url = $location.absUrl();
    if(url.indexOf('booking') == -1){
        $scope.streetNumber = localStorage.getItem("address");
		$scope.streetNumber = JSON.parse($scope.streetNumber);
		
    }
	else {
		$scope.streetNumber = {
			name: '',
			place: '',
			appartment:'',
			phone:'',
			additional:'',
			smsField:'',
			formattedText:'',
			formattedTextOut:'',
			components: {
			  placeId: '',
			  route:'',
			  subLocal:'',
			  streetNumber: '', 
			  street: '',
			  city: '',
			  state: '',
			  countryCode: '',
			  country: '',
			  postCode: '',
			  district: '',
			  location: {
				lat: '',
				longi: ''
			  }
			}
		 };
	 }
		
  }
  
 $scope.getBookingURL = function() {
	if($scope.addrForm.$invalid || ($scope.streetNumber.smsField && $scope.streetNumber.additional == '')) 
		return "#";
	else 
		return "set_schedual.html";
 }
 
  $scope.getenterAddressURL = function() {
	if($scope.addrForm.$invalid || ($scope.streetNumber.smsField && $scope.streetNumber.additional == '')) 
		return "#";
	else 
		return "set_schedual.html";
 }
  
  $scope.saveAddress = function() {
	if($scope.addrForm.$invalid || ($scope.streetNumber.smsField && $scope.streetNumber.additional == '')) 
		return false;
	localStorage.setItem("address", JSON.stringify($scope.streetNumber));
	
  };
   $scope.$watch('streetNumber.place', function() {
		if($scope.streetNumber.place != '') {
        for(var i=0;i<$scope.streetNumber.place.address_components.length;i++) {
			for(var j=0;j<$scope.streetNumber.place.address_components[i].types.length;j++) {
				if($scope.streetNumber.place.address_components[i].types[j] == "route") {
					$scope.streetNumber.components.route = $scope.streetNumber.place.address_components[i].short_name;
				}
				if($scope.streetNumber.place.address_components[i].types[j] == "sublocality_level_1") {
					$scope.streetNumber.components.subLocal = $scope.streetNumber.place.address_components[i].short_name;
				}
			}
		}
		if($scope.streetNumber.components.streetNumber === undefined)
			$scope.streetNumber.formattedText = $scope.streetNumber.components.route +", "+ 'number';
		else			
			$scope.streetNumber.formattedText = $scope.streetNumber.components.route +", "+ $scope.streetNumber.components.streetNumber;
		
		$scope.streetNumber.formattedTextOut = $scope.streetNumber.components.subLocal+", "+$scope.streetNumber.components.district+" - "+$scope.streetNumber.components.state;	
		
		}
    });
	$scope.isBlur = false;
	   $scope.$watch('streetNumber.formattedText', function() {
		if($scope.streetNumber.place != '' && $scope.isBlur) {
		if($scope.streetNumber.components.streetNumber === undefined)
			$scope.streetNumber.formattedText = $scope.streetNumber.components.route +", "+ 'number';
		else			
			$scope.streetNumber.formattedText = $scope.streetNumber.components.route +", "+ $scope.streetNumber.components.streetNumber;
		}
		$scope.isBlur = false;
		
    });
	
	$scope.handleBlur = function() {
		$scope.isBlur = true;
	}
  
  initialize();
  
});
