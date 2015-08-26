 app.controller('AuthCtrl', ['$scope','$http', '$localStorage','$location', 'localStorageService',function($scope, $http, $localStorage,$location,localStorageService) {



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
                console.log(localStorageService.get('familias_id'))              
   

             })
            .error(function (data, status, headers, config) {
                // Erase the token if the user fails to log in
               console.log('Falha ao tentar acessar');
                // Handle login errors here
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