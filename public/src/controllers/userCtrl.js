app.controller('UserCtrl', function ($scope, $http, $window,localStorageService,$location ) {
  $scope.user = 'Tiago';
  $scope.message = '';

  
    $scope.logOff = function() {
         localStorageService.clearAll();
         $location.path( "/" );

    }
});