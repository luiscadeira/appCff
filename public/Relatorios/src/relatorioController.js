(function(){
	'use strict';
	angular.module('app')
		.controller('RelatorioCtrl',RelatorioCtrl );

		RelatorioCtrl.$injet = ['$scope'];

		function RelatorioCtrl ($scope){

			$scope.consultar = function(data){
				de($scope.data);
				de('teste');
			}

		};

})()
