app.controller('UserCtrl',['$scope', '$http', '$window','localStorageService','$location', 'StorageData', function ($scope, $http, $window,localStorageService,$location, StorageData ) {
  
  	$scope.user = {
  		nome : StorageData.getValue('nome'),
  		id   : StorageData.getValue('id'),
  	};
  
    $scope.logOff = function() {
         localStorageService.clearAll();
         $scope.user = null;
         $location.path( "/login" );
    }
}]);