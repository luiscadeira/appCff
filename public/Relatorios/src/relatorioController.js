(function(){
	'use strict';
	angular.module('app')
		.controller('RelatorioCtrl',RelatorioCtrl );

		RelatorioCtrl.$injet = ['$scope','CategoriaService', 'StorageData', '$location'];

		function RelatorioCtrl ($scope,CategoriaService,StorageData, $location){

			$scope.showCarts = false;

			$scope.consultar = function(){
				$scope.showCharts = !$scope.showCharts;
				de($scope.consulta);
			}

			//Catetorias

				if(StorageData.getFamilia() != 0) {
			      CategoriaService.contadorCategoriasDespesa().$promise.then(
			        function(data) {
								de(data);
								return;
								$scope.labelsCategorias = $scope.categorias;
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


			$scope.labelsCategorias = $scope.categorias;
			$scope.dataCategorias = [1, 2];


			$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
            $scope.data = [300, 500, 100];
    	};

})()
