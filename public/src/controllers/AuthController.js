app.controller('AuthCtrl', ['$scope','$http', '$localStorage','$window', function($scope, $http, $localStorage,$window) {


    $scope.auth = function (authUser) {

        AuthService.auth(authUser);
      
        var formData = {
            email: authUser.email,
            password: authUser.password
        }
        
        $http.post(BASE_URL + '/auth', formData)
            .success(function (data, status, headers, config) {
                
                $window.localStorage.id          = data.id;
                $window.localStorage.familias_id = data.familias_id;
                $window.localStorage.perfil      = data.perfil;
                $rootScope.message               = data.message;
                console.log(data);
             })
            .error(function (data, status, headers, config) {
                // Erase the token if the user fails to log in
                $scope.error = 'Falha ao tentar acessar';
                clearSessionStorage();
                // Handle login errors here
            });
    };



}]);