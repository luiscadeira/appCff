
app.controller('RegisterCtrl', ['$scope','RegisterService','Notification','$location',
	
function ($scope,RegisterService,Notification,$location) {

	$scope.save =  function() {

		var usuario = 
        {
            email       : $scope.register.email,
            nome		: $scope.register.nome,
            password    : $scope.register.password,
            password2   : $scope.register.repeatPassword,
            status      : 1,
        }
        
		if(validaPassword(usuario)){
			RegisterService.save(usuario, function(success){
				Notification.success( {message: 'Usuário criado com sucesso!', delay: 4000});
	        	$location.path('/');
			},
			function(error) {
					Notification.error({message: 'Email informado já cadastrado, informe outro email!' , delay: 4000});
					$scope.register.email = null;
			});
	    } else {
	    	Notification.error({message: 'A senhas informadas não são iguais' , delay: 1000});
	    }

		
	}

	function validaPassword (register) {
		if(register.password !== register.password2) {
			return false;
		}
		return true;
	}


}])