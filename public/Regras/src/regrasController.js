(function(){
	'use strict';
	angular.module('app')
		.controller('RegrasCtrl',RegrasCtrl);
			RegrasCtrl.$inject = ['$scope','$location'];

			function RegrasCtrl ($scope,$location){


				$scope.novaRegra =  function()
				{
					$location.path('/newRegra');
				}

				$scope.regrasList = [{
					id: 1,
					regra : 'Valores até',
					valor : '100 R$',
					categoria: 'Alimentação'

				},
				{
					id: 2,
					regra : 'Nº Lançamentos',
					valor : '100 R$',
					categoria: 'Beleza'

				},
				{
					id: 3,
					regra : '% de renda',
					valor : '5 %',
					categoria: 'Lazer'
				}];



			}

})()
