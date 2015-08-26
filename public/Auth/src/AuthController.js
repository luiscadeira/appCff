 app.controller('AuthCtrl', ['$scope','$http', '$localStorage','$location', 'localStorageService','Notification',
    function($scope, $http, $localStorage,$location,localStorageService,Notification) {



    $scope.auth = function (authUser) {
      localStorageService.clearAll();

        // Todo 
        //AuthService.auth(authUser);
      
        var formData = {
            email: authUser.email,
            password: authUser.password
        }

        
        $http.post(BASE_URL + '/auth', formData)
            .success(function (data, status, headers, config) {

                _addKey('id',          data.id);
                _addKey('familias_id', data.familias_id);
                _addKey('perfil',      data.perfil);
                Notification.success( {message: data.message, delay: 2000});
                $location.path( "/bancos" );

             })
            .error(function (data, status, headers, config) {
                Notification.error( {message: 'Email ou senha incorreta', delay: 2000});
                $scope.authUser.password = null;

            });
    };

    $scope.logOff = function() {
         localStorageService.clearAll();
         $location.path( "/main" );

    }

    function _addKey(key, val) {
        return localStorageService.set(key, val);
    }



}]);