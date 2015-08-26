app.factory('FamiliaService', ['$http', '$localStorage', function($http, $localStorage){

        return {
            save: function(data, success, error) {
                $http.post(baseUrl + '/signin', data).success(success).error(error)
            },
            signin: function(data, success, error) {
                $http.post(baseUrl + '/authenticate', data).success(success).error(error)
            },
            me: function(success, error) {
                $http.get(baseUrl + '/me').success(success).error(error)
            },
            logout: function(success) {
                changeUser({});
                delete $localStorage.token;
                success();
            }
        };
    }
]);