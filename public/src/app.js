var app = angular.module('app',
    [
      'ngRoute',
      'ngStorage',
      'ngResource',
      'LocalStorageModule',
      'ui-notification',
       'blockUI',
       'chart.js',
       'ui.mask'
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
        var id_familia = StorageData.getFamilia();

        if((!id_familia || 0 === id_familia) && '/register' !== urlAtual )  {
           $location.path('/login');
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
                .when('/newDespesa', {
                    templateUrl: 'Despesa/Templates/newDespesa.html',
                })

				.when('/login',
				{
					templateUrl	: '../Auth/template/login.html'
				})
				.when('/register',
				{
					templateUrl	: './Register/Templates/registerIndex.html'
				})
				.when('/familia',
				{
					templateUrl	: '../Familia/Templates/familiasIndex.html',
				})

                .when('/familiares',
                {
                    templateUrl : '../Familiares/Templates/familiaresIndex.html',
                })

                .when('/newFamiliar',
                {
                    templateUrl : '../Familiares/Templates/newFamiliar.html',
                })

                .when('/editFamiliar/:id',
                {
                    templateUrl : '../Familiares/Templates/editFamiliar.html',
                })

                 .when('/contas',
                {
                    templateUrl : '../Contas/Templates/contasIndex.html',
                })
                .when('/newContas',
                {
                    templateUrl : '../Contas/Templates/newConta.html',
                })
                .when('/editContas/:id',
                {
                    templateUrl : '../Contas/Templates/editConta.html',
                })
                .when('/categorias',
                {
                    templateUrl : '../Categorias/Templates/categoriasIndex.html',
                })
                 .when('/newCategoria',
                {
                    templateUrl : '../Categorias/Templates/newCategoria.html',
                })
                .when('/editCategoria/:id',
                {
                    templateUrl : '../Categorias/Templates/editCategoria.html',
                })
                .when('/dash',
                {
                    templateUrl : '../dashboard/dashBoard.html',
                })
                .when('/relatorios',
                {
                    templateUrl : '../Relatorios/Template/relatorioIndex.html',
                })
                .when('/regras',
                {
                    templateUrl : '../Regras/Template/regrasIndex.html',
                })
                 .when('/newRegra',
                {
                    templateUrl : '../Regras/Template/regrasDetalhes.html',
                })
                .when('/orcamento',
                {
                    templateUrl : '../Orcamento/Template/orcamentoIndex.html',
                })
                .when('/newOrcamento',
                {
                    templateUrl : '../Orcamento/Template/orcamentoDetalhes.html',
                })
                 .when('/estornarOrcamento',
                {
                    templateUrl : '../Orcamento/Template/estornar.html',
                })
                .when('/receitas',
                {
                    templateUrl : '../Receitas/Template/receitasIndex.html',
                })
                .when('/newReceita',
                {
                    templateUrl : '../Receitas/Template/receitaDetalhes.html',
                })

				.otherwise({ redirectTo: '/dash'});
	    }
	]
);


app.config(['blockUIConfig', function (blockUIConfig) {
     // Change the default overlay message
    blockUIConfig.message = 'Aguarde...';

    //Change the default delay to 100ms before the blocking is visible
    blockUIConfig.delay = 0;
    blockUIConfig.blockBrowserNavigation = true;
}]);


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




function de(data){
    console.log((data));
    return;
}
