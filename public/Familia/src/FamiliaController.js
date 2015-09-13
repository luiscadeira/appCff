app.controller('FamiliaCtrl' , ['$scope', 'FamiliaService','StorageData','Notification','$location',
	function($scope, FamiliaService, StorageData, Notification, $location){

		$scope.familia = null;
		var id_familia = StorageData.getFamilia();

	   FamiliaService.query(function(data) {
          $scope.familia = data._embedded.familia[0];
       });

       $scope.save = function (){
       	 if( id_familia  =! 0){	
       	 	FamiliaService.update($scope.familia, function(data) {
       	 		Notification.info( {message: 'Familia: '+$scope.familia.nome+' alterada com sucesso', delay: 2000} );
       					$location.path('/familia');
       	 	});
       	 }
       	 return;

       	 FamiliaService.create($scope.familia, function(data) {
       	 	Notification.success( {message: 'Familia: '+$scope.familia.nome+' criada com sucesso', delay: 2000} );
       					$location.path('/familia');
       	 });

       }


}]);