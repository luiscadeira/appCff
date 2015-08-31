app.controller('FamiliaCtrl' , ['$scope', '$localStorage','FamiliaService','StorageData',
	function($http, $scope, FamiliaService, $localStorage, StorageData){

		$scope.familia.nome = "teste";
	    FamiliaService.query(function(data) {
          $scope.familia = data._embedded.familias[0];
          de($scope.familia)
      });

}]);