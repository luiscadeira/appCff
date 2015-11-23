(function(){
	'use strict';
	angular.module('app')
		.controller('RelatorioCtrl',RelatorioCtrl );

		RelatorioCtrl.$injet = ['$scope', 'StorageData', '$location','RelatorioService'];

		function RelatorioCtrl ($scope,StorageData, $location,RelatorioService){

			$scope.showCarts = false;

			$scope.consultar = function(){
				 $scope.showCharts   = !$scope.showCharts;
				 $scope.dataDe       = new Date($scope.dataDe);
			     var dateDe          = $scope.dataDe.toLocaleString();
			     dateDe = dateDe.substring(0, 10);		    
				 $scope.dataAte     = new Date($scope.dataAte);
			     var dateAte        = $scope.dataAte.toLocaleString();
			     dateAte = dateAte.substring(0, 10);

			     var consulta = {
			        de : dateDe,
			        ate: dateAte,
			        tipo : $scope.consulta.tipo
			     };

			     de(consulta);

			     RelatorioService.getDespesas({id: banco.id}, function(success){
						$scope.labelsCategorias = success._embedded.relatorios.labelsCategoria;
						$scope.dataCategorias = success._embedded.relatorios.dataCategoria;;
			     }, function(error){
			     	de(error);
			     })
				
			}


			$scope.labelsCategorias = $scope.categorias;
			$scope.dataCategorias = [1, 2];


			$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
            $scope.data = [300, 500, 100];
    	};

})()
