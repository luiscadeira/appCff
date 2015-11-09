(function(){
	'use strict';
	angular.module('app')
		.controller('RelatorioCtrl',RelatorioCtrl );

		RelatorioCtrl.$injet = ['$scope'];

		function RelatorioCtrl ($scope){

			$scope.consultar = function(){
				de($scope.data);
			}
			var graficoCategoria1 = "teste";
			$scope.grafico = {
				categoria1 : 'Teste'
			};


			
		};

})()
