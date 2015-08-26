app.controller('BancoCtrl', ['$scope','$location', '$route','BancoService','StorageData','Notification','blockUI',
	function ($scope,$location, $route,BancoService , StorageData,Notification,blockUI) {

		
		BancoService.query(function(data) {
		    	$scope.bancos = data._embedded.bancos;
		});

	    $scope.createBanco = function () {

		 	var banco = {
	            nome        : $scope.banco.nome,
	            agencia     : $scope.banco.agencia,
	            familias_id : StorageData.getFamilia()
            }

            blockUI.start();

	        var res = BancoService.create(banco, 
	        	function(data) {
	        			Notification.success( {message: 'Banco criado com sucesso!', delay: 2000});
	        			$location.path('/bancos');

	            },
	            function(error) {
	            	Notification.error({message: 'Erro ao criar banco :'+error.statusText , delay: 1000});
	            });

	        blockUI.stop();                
        }


         $scope.editBanco = function (banco) {
            $location.path('/editBanco/' + banco.id);
        };

        $scope.novoBanco = function() {
        	 $location.path('/newBanco');
        }

        $scope.voltar = function() {
        	 $location.path('/bancos');

        }

        $scope.delete = function(banco) {
    		if (confirm('Remover '+banco.nome+" ?")) {
       				BancoService.delete({id: banco.id}, function(data) {
       					Notification.info( {message: 'Banco: '+banco.nome+' removido com sucesso', delay: 2000});
       					 $route.reload() 
       				},
       				function(error) {
       					Notification.error( {message: 'Erro ao remover Banco: '+banco.nome+'.\n'+error.statusText, delay: 2000});
       				});
            }

         };
        

}]);

app.controller('BancoDetalhe',['$scope','$location','$routeParams','BancoService', 'StorageData','Notification',
	function($scope,$location,$routeParams,BancoService,StorageData,Notification) {


		$scope.updateBanco = function () {

			var banco = {
				id          : $scope.banco.id,
	            nome        : $scope.banco.nome,
	            agencia     : $scope.banco.agencia,
	            familias_id : StorageData.getFamilia()
            }

            BancoService.update(banco, 

            	    function(data) {
       					Notification.info( {message: 'Banco: '+banco.nome+' alterado com sucesso', delay: 2000} );
       					$location.path('/bancos');
       				},
       				function(error) {
       					Notification.error( {message: 'Erro ao remover Banco: '+banco.nome+'.\n'+error.statusText, delay: 2000});
                        $location.path('/bancos');
           });
        }

        $scope.voltar = function () {
            $location.path('/bancos');
        };

        $scope.banco = BancoService.show({id: $routeParams.id});
}])