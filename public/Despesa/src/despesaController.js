(function(){
	'use strict';

	app.controller('DespesaCtrl', ['$scope', 'DespesaService','$location','StorageData','Notification',
		function ($scope,DespesaService,$location,StorageData,Notification) {

		    

        $scope.novaDespesa = function() {
        	$location.path('/newDespesa');
        }

			if(StorageData.getFamilia() && $location.path() != '/contas') {
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

