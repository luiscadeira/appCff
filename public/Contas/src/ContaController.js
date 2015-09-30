app.controller('ContaCtrl', ['$scope', 'ContaService','StorageData','$location','BancoService','Notification','$route',
	function ($scope, ContaService, StorageData, $location,BancoService,Notification,$route) {

	$scope.contas = null;
		
    if(StorageData.getFamilia() != 0 && $location.path() != '/newContas') {
      ContaService.query().$promise.then(
        function( data ) {
         
          if(data.total_items === 0) {
          	Notification.info( {message: 'Cadastre suas contas bancárias.', delay: 2000});
            return;
          }
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
	            numero      : $scope.conta.numero,
	            banco_id    : $scope.conta.banco,
	            status      : 1, 
	            familia_id  : StorageData.getFamilia()
	        }
	        de(conta);

	        var res = ContaService.create(conta, 
	        	function(sucess) {
	        			Notification.success( {message: 'Conta criado com sucesso!', delay: 4000});
	        			$location.path('/contas');
	            },
	            function(error) {
	            	Notification.error({message: 'Erro ao criar conta :'+error.statusText , delay: 1000});
	            });

	}




    $scope.editConta = function (conta) {
            $location.path('/editContas/' + conta.id);
    };

	$scope.delete = function(conta) {
		 		if (confirm('Remover conta: '+conta.numero+" ?")) {
       				ContaService.delete({id: conta.id}, function(data) {
       					Notification.info( {message: 'Conta: '+conta.numero+' removida com sucesso', delay: 2000});
       					 $route.reload() 
       				},
       				function(error) {
       					Notification.error( {message: 'Erro ao remover Conta: '+banco.nome+'.\n'+error.statusText, delay: 2000});
       				});
            }

	}
}])

app.controller('ContaDetalheCtrl', ['$scope', 'ContaService','StorageData','$location','BancoService','Notification','$route','$routeParams',
 function ($scope,ContaService, StorageData, $location,BancoService,Notification,$route,$routeParams) {


	   ContaService.show({id: $routeParams.id}, function(data) {
          $scope.conta = data;   
        });

		$scope.voltar = function() {
			$location.path('/contas')
		}

		$scope.updateBanco = function()
		{
			var conta = {
				id          : $scope.conta.id,
	            numero      : $scope.conta.numero,
	            banco_id    : $scope.conta.banco,
	            familia_id  : StorageData.getFamilia(),
                status      : 1
            }

            ContaService.update(conta, function(data) {
       					Notification.info( {message: 'Conta: '+ conta.numero +' alterado com sucesso', delay: 2000} );
       					$location.path('/contas');
       				},
       				function(error) {
       					Notification.error( {message: 'Erro ao atualizar conta: '+ conta.numero +'.\n'+error.statusText, delay: 2000});
                        $location.path('/contas');
           });
            
		}

	    BancoService.query().$promise.then(
        function(data) {
          $scope.bancos = data._embedded.banco;
        },
        function( error ){
          Notification.error({message: 'Erro ao carregar bancos :\n'+error.status+'-'+  error.statusText , delay: 9000});
        }
      );

	
}])