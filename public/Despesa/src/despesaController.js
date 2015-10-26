(function(){
	'use strict';

	app.controller('DespesaCtrl', ['$scope', 'DespesaService',
		function ($scope,DespesaService) {


		
		    

	    DespesaService.query(function(success){
	    	$scope.despesaList = success._embedded.despesas;
	    	$scope.totalDespesas = $scope.despesaList[$scope.despesaList.length-1].totalDespesas;
	    	$scope.qtdLancemeento = $scope.despesaList.length;
   		
        })

	}


	]);


})();

