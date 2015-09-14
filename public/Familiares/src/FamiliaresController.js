app.controller('FamiliaresCtrl', ['$scope', 'FamiliaresService'
	function ($scope,FamiliaresService) {

    $scope.familiares = null;
		
    if(StorageData.getFamilia()) {
      FamiliaresService.query(function(data) {
          $scope.familiares = data._embedded.familiares;
      });
    } 
	
}])