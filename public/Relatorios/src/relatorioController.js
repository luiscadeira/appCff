(function(){
	'use strict';
	angular.module('app')
		.controller('RelatorioCtrl',RelatorioCtrl );

		RelatorioCtrl.$injet = ['$scope'];

		function RelatorioCtrl ($scope){

			$scope.showCarts = false;

			$scope.consultar = function(){
				$scope.showCharts = !$scope.showCharts;
				de($scope.consulta);
			}


			$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
            $scope.data = [300, 500, 100];


		};

})()
