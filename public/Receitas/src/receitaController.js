(function(){
	'use strict';
	angular.module('app')
		.controller('ReceitaCtrl',ReceitaCtr);
		ReceitaCtr.$inject = ['$scope','ReceitaService','StorageData','Notification','$location'];

		function ReceitaCtr($scope, ReceitaService,StorageData,Notification,$location) {

			$scope.novaReceita = function(){
				$location.path('newReceita');
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
