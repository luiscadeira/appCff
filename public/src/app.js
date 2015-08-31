'use restric';
var app = angular.module('app', 
    [
        'ngRoute',
        'ngStorage',
        'ngResource',
        'LocalStorageModule',
        'ui-notification',
        'blockUI'
    ]
);

BASE_URL = "http://localhost:666";

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('APIInterceptor');
}]);


app.service('APIInterceptor',['StorageData','$location',
    function(StorageData,$location) {
    var service = this;

    service.request = function(config) {

        var urlAtual = $location.path();
        
        if(!StorageData.getFamilia() && '/register' !== urlAtual )  {
            $location.path('/');
        }   
        return config; 
    };
}]);

app.config(
	['$routeProvider',
		function($routeProvider) {

				$routeProvider
                .when('/bancos', {
                    templateUrl: 'Banco/Templates/bancoIndex.html',
                })
                .when('/newBanco', {
                    templateUrl: 'Banco/Templates/newBanco.html',
                })
                .when('/editBanco/:id', {
                    templateUrl: 'Banco/Templates/editBanco.html',
                })
                .when('/despesas', {
                    templateUrl: 'Despesa/Templates/despesaIndex.html',
                })

				.when('/', 
				{
					templateUrl	: '../Auth/template/login.html'
				})
				.when('/register', 
				{
					templateUrl	: './templates/register.html'
				})
				.when('/familia', 
				{
					templateUrl	: '../Familia/Templates/familiasIndex.html',
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
       
}]);

// Configurações do localstorage
app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
    .setStorageType('localStorage')
    .setPrefix('')
});





function db(data) {
    return console.log(data);
}

function de(data){
    console.log(data);
    return false;

}

