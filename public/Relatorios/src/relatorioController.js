(function(){
	'use strict';
	angular.module('app')
		.controller('RelatorioCtrl',RelatorioCtrl );

		RelatorioCtrl.$injet = ['$scope', 'StorageData', '$location','$http'];

		function RelatorioCtrl ($scope,StorageData, $location,$http){

			$scope.showCarts = false;

			$scope.consultar = function(){

				 var id_familia = StorageData.getFamilia();

				
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

			     $http.get(BASE_URL +'/relatorios?familia_id='+id_familia+'&dataDe='+consulta.de+'&dataAte='+consulta.ate+'&tipo='+consulta.tipo)
			     	.success(function(data){
			     		de(data);
					$scope.labelsCategorias = data._embedded.relatorios[0].labelsCategoria;
					$scope.dataCategorias   = data._embedded.relatorios[0].dataCategoria;
					de($scope.dataCategorias);
					$scope.labels = data._embedded.relatorios[0].labelsCategoria;
              	    $scope.showCharts       = !$scope.showCharts;

			        

			     	}).error(function(error){
			     		de(error);
			     });
		
			}


			
            $scope.data = [8,1,2];
    	};

})()
