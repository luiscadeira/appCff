 app.controller('AuthCtrl', ['$scope','$http', '$localStorage','$location', 'localStorageService','Notification','StorageData',
    function($scope, $http, $localStorage,$location,localStorageService,Notification,StorageData) {


    
    notificaLogin();

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
                if(status !== 401) {
                    _addKey('id',          data.id);
                    _addKey('familia_id',  data.familia_id);
                    _addKey('perfil',      data.perfil);
                    _addKey('nome',        data.nome);
                    Notification.success( {message: data.message, delay: 5000});
                    de(data.familia_id);
                    if( data.familia_id == "0" ) {
                        return $location.path( "/familia" );
                    }
                    return $location.path( "/dash" );
                }
                 Notification.error( {message: 'Email ou senha incorreta |'+error.statusText , delay: 2000});
                 $scope.authUser.password = null;
         
            })
            .error(function (data, status, headers, config) {
                Notification.error( {message: 'Email ou senha incorreta', delay: 2000});
                $scope.authUser.password = null;
            });
    };

    $scope.logOff = function() {
         localStorageService.clearAll();
         $location.path( "/" );

    }

    function _addKey(key, val) {
        return localStorageService.set(key, val);
    }

    function notificaLogin() {     
        if(!StorageData.getFamilia()) {
            Notification.error( {message: 'Efetue o login!', delay: 3000});
        }
        return;

    }
   



}]);