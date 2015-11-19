(function(){
	'use strict';

	app.controller('DespesaCtrl', ['$scope', 'DespesaService','$location','StorageData','Notification','ContaService','CategoriaService','$route',
		function ($scope,DespesaService,$location,StorageData,Notification,ContaService,CategoriaService, $route) {



      $scope.novaDespesa = function() {
      	$location.path('/newDespesa');
      }
      $scope.voltar = function()
      {
        $location.path('/despesas');
      }

			$scope.editDespesa = function (despesa) {
					$location.path('/editDespesa/' + despesa.id);
			};

			$scope.delete = function(despesa) {
			if (confirm("Remover  Despesa ?")) {
						DespesaService.delete({id: despesa.id}, function(data) {
							Notification.info( {message: 'Despesa removido com sucesso', delay: 2000});
							 $route.reload()
						},
						function(error) {
							Notification.error( {message: 'Erro ao remover Despesa: '+banco.nome+'.\n'+error.statusText, delay: 2000});
						});
					}
			 };


			$scope.createDespesa = function () {

        $scope.despesa.idUser     = StorageData.getValue('id');
				$scope.despesa.idFamilia  = StorageData.getValue('familia_id');

			  $scope.dataVencimentoDespesa = new Date($scope.dataVencimentoDespesa);
			  var date = 	$scope.dataVencimentoDespesa.toLocaleString();
				$scope.despesa.dataVencimentoDespesa = date;
				de(angular.toJson($scope.despesa));
						DespesaService.create($scope.despesa, function(success){
            Notification.success({message: 'Despesas criada com sucesso' , delay: 9000});
            $location.path('/despesas');
				}, function(error){
          Notification.error({message: 'Erro ao cadastrar Despesas:'+error , delay: 9000});
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



app.controller('DespesaDetalhe',['$scope','$location','$routeParams','DespesaService', 'StorageData','Notification','ContaService','CategoriaService',
  function($scope,$location,$routeParams,DespesaService,StorageData,Notification, ContaService, CategoriaService) {


    $scope.updateDespesa = function () {
			var validate = true;
			$scope.despesa.idUser     = StorageData.getValue('id');
			$scope.despesa.idFamilia  = StorageData.getValue('familia_id');

			$scope.dataVencimentoDespesa = new Date($scope.dataVencimentoDespesa);
			var date = 	$scope.dataVencimentoDespesa.toLocaleString();
			$scope.despesa.dataVencimentoDespesa = date;
						validate =  this.validate();
						de(validate);
						if(!validate) {
							return;
						}

            DespesaService.update($scope.despesa, function(data) {
                Notification.info( {message: 'Despesa: '+$scope.despesa.descricao+' alterado com sucesso', delay: 2000} );
                $location.path('/despesas');
              },
              function(error) {
                Notification.error( {message: 'Erro ao atualizar Despesa: '+$scope.despesa.descricao+'.\n'+error.statusText, delay: 2000});
                $location.path('/despesas');
           });
        }

        $scope.voltar = function () {
            $location.path('/despesas');
        };

				$scope.validate = function() {
					var valido = true;
					if(!$scope.despesa.descricao) {
						alert('Infome a descrição da despesa');
						valido = false;
					}
					if(!$scope.despesa.valor) {
						alert('Infome o valor da despesa');
						valido = false;
					}

					if(!$scope.dataVencimentoDespesa) {
						alert('Infome a data de vencimento da despesa');
						valido = false;
					}
					return valido;
				}

        DespesaService.show({id: $routeParams.id}, function(data) {
          $scope.despesa = data[0];
	      });

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



})();
