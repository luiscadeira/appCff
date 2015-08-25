app.controller('BancoCtrl', ['$scope','$location', '$http','BancoService',
	function ($scope,$location,$http, BancoService){

		
		listar();


		function listar() {
			$scope.bancos = {};
			BancoService.query(function(data) {
		    $scope.bancos = data._embedded.bancos;
		});

		}


		


			//var data = BancoService.getBancos();
			//console.log(data);
			//$scope.bancos = data._embedded.bancos;


}]);