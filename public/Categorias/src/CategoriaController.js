(function(){
	'use strict';
	angular.module('app')
		.controller('CategoriasCrl', ['$scope','$location', '$route','CategoriaService','StorageData','Notification',
			function($scope,$location,$route,CategoriaService,StorageData,Notification) {

	if(StorageData.getFamilia() != 0 && $location.path() == '/categorias') {
      CategoriaService.query().$promise.then(
        function(data) {
          $scope.categorias = data._embedded.categorias;
        },
        function( error ){
          if(error.status === 404) {
            Notification.info({message:'Cadastre suas categorias.', delay:5000});
            return;
          }
          Notification.error({message: "Erro ao consultar categorias:" + status,  delay: 9000});
        }
      );
    }

    $scope.novaCategoria =  function () {
    	$location.path('/newCategoria');
    };

    $scope.voltar =  function () {
    	$location.path('/categorias');
    };

    $scope.editCategoria = function (categoria) {
            $location.path('/editCategoria/' + categoria.id);
    };

           
    $scope.delete = function(categoria) {
        if (confirm('Remover '+categoria.categoria+" ?")) {
              CategoriaService.delete({id: categoria.id}, function(data) {
                Notification.info( {message: 'Categoria: '+categoria.categoria+' removido com sucesso', delay: 2000});
                 $route.reload() 
              },
              function(error) {
                Notification.error( {message: 'Erro ao remover Categoria: '+categoria.categoria+'.\n'+error.statusText, delay: 2000});
              });
            }

    };

    $scope.createCategoria = function() {
    	$scope.categoria.familia_id = StorageData.getFamilia();
    	CategoriaService.create($scope.categoria, function(success){
    		 Notification.success({message:'Categoria '+success.categoria+' cadastrada com sucesso.', delay:5000});
       		 $location.path('/categorias')

    	}, function(error){
    		de(error);
    		Notification.error({message: "Erro ao criar categoria:" + error.message,  delay: 9000});

    	});
    }

			
		






















		}]);

})();