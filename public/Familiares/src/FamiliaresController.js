app.controller('FamiliaresCtrl', ['$scope','StorageData', 'FamiliaresService',
	function ($scope,StorageData,FamiliaresService) {

    $scope.familiares = null;
		
    if(StorageData.getFamilia()) {
      FamiliaresService.query(function(data) {
          $scope.familiares = data._embedded.familiares;
          $scope.familia = data._embedded.familiares[0].familia.nome;
          de($scope.familia)
      });
    } 
	
}])