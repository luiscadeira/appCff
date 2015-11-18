(function(){
	'use strict';
	angular.module('app')
		.controller('ReceitaCtrl',ReceitaCtr);
		ReceitaCtr.$inject = ['$scope','ReceitaService','StorageData','Notification','$location','ContaService', 'CategoriaService'];

		function ReceitaCtr($scope, ReceitaService,StorageData,Notification,$location,ContaService,CategoriaService) {

			$scope.novaReceita = function(){
				$location.path('/newReceita');
			}

			$scope.voltar = function()
			{
				$location.path('/receitas')
			}


	  if(StorageData.getFamilia() && $location.path() != '/receitas')
      {
        ContaService.query(function(success){
          $scope.contasList = success._embedded.contas;
        });

        CategoriaService.query(function(success){
          $scope.categoriasList = success._embedded.categorias;
        });



      }

      $scope.save =  function(receita)
      {

      	receita.idUser     = StorageData.getValue('id');
				receita.idFamilia  = StorageData.getValue('familia_id');
				de(angular.toJson(receita));

				ReceitaService.create(receita, function(success){
            Notification.success({message: 'Receita criada com sucesso' , delay: 9000});
            $location.path('/recetas');
				}, function(error){
          Notification.error({message: 'Erro ao cadastrar Receita:'+error.statusText , delay: 9000});
					de(error);
				});

      }


		    if(StorageData.getFamilia() && $location.path() != '/newReceita') {
				ReceitaService.query().$promise.then(
				function(success) {
					$scope.receitaList    = success._embedded.receitas;
					$scope.totalReceita   = $scope.receitaList[$scope.receitaList.length-1].totalReceita;
					$scope.qtdLancemeento = $scope.receitaList.length;
				},
				function( error ){

					if(error.status === 404) {
						$location.path('/receitas');
						Notification.info({message: 'Cadastre suas Receitas' , delay: 9000});
					return;
					}

				Notification.error({message: error.status+'-'+  error.statusText , delay: 9000});


				});
			}

		}
})();
