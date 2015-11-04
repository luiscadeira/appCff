(function(){
	'use strict';
	angular.module('app')
		.controller('CategoriaEditController', ['$scope','$location','$routeParams','CategoriaService','Notification',
		function($scope,$location,$routeParams,CategoriaService,Notification) {


	    $scope.updateCategoria = function () {
            CategoriaService.update($scope.categoria, function(data) {
                Notification.info( {message: 'Categoria: '+$scope.categoria.categoria+' alterado com sucesso', delay: 2000} );
                $location.path('/categorias');
              },
              function(error) {
                Notification.error( {message: 'Erro ao atualizar categoria: '+categoria.categoria+'.\n'+error.statusText, delay: 2000});
                $location.path('/categorias');
           });
	    };

        $scope.voltar = function () {
            $location.path('/categorias');
        };

        CategoriaService.show({id: $routeParams.id}, function(data) {
          $scope.categoria = data[0];
          de($scope.categoria);
        });
        
}]);

})();