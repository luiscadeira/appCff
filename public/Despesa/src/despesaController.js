(function(){
	'use strict';

	app.controller('DespesaCtrl', ['$scope', 'DespesaService','$location','StorageData','Notification','ContaService','CategoriaService',
		function ($scope,DespesaService,$location,StorageData,Notification,ContaService,CategoriaService) {



      $scope.novaDespesa = function() {
      	$location.path('/newDespesa');
      }

			$scope.createDespesa = function () {
        var date = angular.element('dataVencimento').val();
        de(date);
        $scope.despesa.idUser = StorageData.getValue('id');
				$scope.despesa.idFamiliar = StorageData.getValue('familia_id');
				DespesaService.create($scope.despesa, function(success){
						de(success);
				}, function(error){
					de(error);
				});

			}

			if(StorageData.getFamilia() && $location.path() != '/newDespesa') {
				DespesaService.query().$promise.then(
				function(success) {
					$scope.despesaList = success._embedded.despesas;
					$scope.totalDespesas = $scope.despesaList[$scope.despesaList.length-1].totalDespesas;
					$scope.qtdLancemeento = $scope.despesaList.length;
				},
				function( error ){

					if(error.status === 404) {
						$location.path('/despesas');
						Notification.info({message: 'Cadastre suas Despesas' , delay: 9000});
					return;
					}

				Notification.error({message: error.status+'-'+  error.statusText , delay: 9000});


				});
			}


      if(StorageData.getFamilia() && $location.path() != '/despesas')
      {
        ContaService.query(function(success){
          $scope.contasList = success._embedded.contas;
        });

        CategoriaService.query(function(success){
          $scope.categoriasList = success._embedded.categorias;
        });
      }



	}]);



app.controller('DespesaDetalhe',['$scope','$location','$routeParams','DespesaService', 'StorageData','Notification',
  function($scope,$location,$routeParams,DespesaService,StorageData,Notification) {


    $scope.updateDespesa = function () {

      var despesa = {
              id          : $scope.despesa.id,
              nome        : $scope.despesa.nome,
              agencia     : $scope.despesa.agencia,
              familia_id  : StorageData.getFamilia(),
              status      : 1
            }
            DespesaService.update(banco, function(data) {
                Notification.info( {message: 'Despesa: '+despesa.descricao+' alterado com sucesso', delay: 2000} );
                $location.path('/despesas');
              },
              function(error) {
                Notification.error( {message: 'Erro ao remover Despesa: '+banco.nome+'.\n'+error.statusText, delay: 2000});
                $location.path('/despesas');
           });
        }

        $scope.voltar = function () {
            $location.path('/bancos');
        };

        BancoService.show({id: $routeParams.id}, function(data) {
          $scope.banco = data[0];
        });

}]);



})();
