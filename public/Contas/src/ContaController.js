app.controller('ContaCtrl', ['$scope', 'ContaService','StorageData','$location','BancoService','Notification',
	function ($scope, ContaService, StorageData, $location,BancoService,Notification) {

	$scope.contas = null;
		
    if(StorageData.getFamilia()) {
      ContaService.query().$promise.then(
        function( data ) {
          $scope.contas = data._embedded.contas;
        },
        function( error ){
          Notification.error({message: 'Erro ao carregar contas :\n'+error.status+'-'+  error.statusText , delay: 9000});
        }
      );
    }

    if(StorageData.getFamilia()) {
      BancoService.query().$promise.then(
        function(data) {
          $scope.bancos = data._embedded.banco;
        },
        function( error ){
          Notification.error({message: 'Erro ao carregar bancos :\n'+error.status+'-'+  error.statusText , delay: 9000});
        }
      );
    }

	$scope.novaConta = function() {
	   $location.path('/newContas');
	}

    $scope.createConta = function() {

	  		var conta = {
	            numero        : $scope.conta.numero,
	            banco_id    : $scope.conta.banco,
	            status      : 1, 
	            familia_id : StorageData.getFamilia()
	        }
	        de(conta);

	        var res = ContaService.create(conta, 
	        	function(data) {
	        			Notification.success( {message: 'Conta criado com sucesso!', delay: 4000});
	        			$location.path('/bancos');
	            },
	            function(error) {
	            	Notification.error({message: 'Erro ao criar conta :'+error.statusText , delay: 1000});
	            });

	}

	

	
}])