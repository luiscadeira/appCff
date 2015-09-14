app.controller('FamiliaresCtrl', ['$scope','StorageData', 'FamiliaresService','$location',
	function ($scope,StorageData,FamiliaresService,$location) {

    $scope.familiares = null;

		
    if(StorageData.getFamilia()) {
      FamiliaresService.query(function(data) {
          $scope.familiares = data._embedded.user;
          $scope.familia = $scope.familiares[0].familia.nome;
      });
    }

    $scope.novoFamiliar = function () {
      $location.path('/newFamiliar');
    }
	
}])