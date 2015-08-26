'use restric';
var app = angular.module('app', ['ngRoute','ngStorage','ngResource','LocalStorageModule','ui-notification','blockUI']);

BASE_URL = "http://localhost:666";


app.config(
	['$routeProvider',
		function($routeProvider) {

				$routeProvider
				.when('/', 
				{
					templateUrl	: './templates/login.html'
				})
				.when('/register', 
				{
					templateUrl	: './templates/register.html'
				})
				.when('/familia', 
				{
					templateUrl	: '../Familia/Templates/familiasIndex.html',
				})
                .when('/bancos', {
                    templateUrl: 'Banco/Templates/bancoIndex.html',
                })
                .when('/newBanco', {
                    templateUrl: 'Banco/Templates/newBanco.html',
                  })
				.otherwise({ redirectTo: '/'})
	    }
	]
);

app.config(['blockUIConfig', function (blockUIConfig) {
     // Change the default overlay message
    blockUIConfig.message = 'Aguarde...';

  // Change the default delay to 100ms before the blocking is visible
    blockUIConfig.delay = 0;
    blockUIConfig.blockBrowserNavigation = true;
}])


app.config(function(NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 10000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'left',
            positionY: 'top',
            templateUrl : 'bower_components/angular-ui-notification/src/angular-ui-notification.html'
        });
    });

app.controller('userCtrl',['$rootScope', '$scope', '$location', '$localStorage', 'Main', function($rootScope, $scope, $location, $localStorage, Main) {
        id_familia = localStorage.getItem('familias_id');
 		$scope.user = "Tiago";
        $scope.signin = function() {

            var formData = {
                email: $scope.email,
                password: $scope.password
            }
 
            Main.signin(formData, function(res) {
                if (res.type == false) {
                    alert(res.data)
                } else {
                    $localStorage.token = res.data.token;
                    window.location = "/";
                }
            },
            function() {
                $rootScope.error = 'Falha ao tentar acessar';
            })
        };
 
        $scope.signup = function() {
            var formData = {
                email: $scope.email,
                password: $scope.password
            }
 
            Main.save(formData, function(res) {
                if (res.type == false) {
                    alert(res.data)
                } else {
                    $localStorage.token = res.data.token;
                    window.location = "/"
                }
            }, function() {
                $rootScope.error = 'Falha ao registrar-se';
            })
        };
 
        $scope.me = function() {
            Main.me(function(res) {
                $scope.myDetails = res;
            }, function() {
                $rootScope.error = 'Falha ao buscar os dados';
            })
        };
 
        $scope.logout = function() {
            Main.logout(function() {
                window.location = "/"
            }, function() {
                alert("Falha ao sair!");
            });
        };
        $scope.token = $localStorage.token;
    }])

// Configurações do localstorage
.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
    .setStorageType('localStorage')
    .setPrefix('')
})

.factory('Main', ['$http', '$localStorage', function($http, $localStorage){

        var baseUrl = "http:localhost:666";

        function changeUser(user) {
            angular.extend(currentUser, user);
        }
 
        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Cadeia de caracteres base64url inválida!';
            }
            return window.atob(output);
        }
 
        function getUserFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }
 
        var currentUser = getUserFromToken();
 
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



function db(data) {
    return console.log(data);
}

function de(data){
    console.log(data);
    return false;

}

