app.controller('FamiliaCtrl' , ['$scope', 'FamiliaService','StorageData','Notification','$location','UserService',
	function($scope, FamiliaService, StorageData, Notification, $location, UserService){

		$scope.familia = null;
		var familia_id = StorageData.getFamilia();
		
     
       if(0 != familia_id){
       	FamiliaService.query(function(data) {
          $scope.familia = data._embedded.familia[0];
       });

       } else {
       		Notification.info( {message: 'Cadastre sua Familia!', delay: 6000} );
       }
	   

       $scope.save = function (familia_id) {    	
        	 if( familia_id ){	
       	 	FamiliaService.update($scope.familia, function(data) {
       	 		Notification.info( {message: 'Familia: '+$scope.familia.nome+' alterada com sucesso', delay: 2000} );
       			$location.path('/familia');
       	 	});
       	 } else {
       	 	   FamiliaService.create($scope.familia, function(data) {
                          Notification.success( {message: 'Familia: '+$scope.familia.nome+' criada com sucesso', delay: 2000} );
                          StorageData.removeKey('familia_id');
                          StorageData.setValue('familia_id',  data.id); 

                          var user = {
                              familia_id  : StorageData.getFamilia()
                          };
                           UserService.update(user);
                     }

       	 	 

        	    );

       	 }
       	 
       	

       }


}]);