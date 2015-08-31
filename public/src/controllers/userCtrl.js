app.controller('UserCtrl', function ($scope, $http, $window,localStorageService,$location ) {
  $scope.user = 'Tiago';
  
    $scope.logOff = function() {
         localStorageService.clearAll();
         $location.path( "/" );

    }
});