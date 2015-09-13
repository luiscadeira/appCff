app.controller('FamiliaCtrl' , ['$scope', 'FamiliaService','StorageData',
	function($scope, FamiliaService, StorageData){

		$scope.familia = null;

	   FamiliaService.query(function(data) {
          $scope.familia = data._embedded.familia[0];
          de($scope.familia);
        });


}]);