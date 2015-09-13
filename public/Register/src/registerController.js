app.controller('RegisterCtrl', ['$scope','StorageData' ,'RegisterService','Notification',
	
function ($scope,StorageData,Notification,RegisterService) {


	$scope.create =  function() {

		var usuario = 
        {
            email       : $scope.register.email,
            nome		: $scope.register.nome,
            password1   : $scope.register.password,
            password2   : $scope.register.repeatPassword
        }
        

		if(validaPassword(usuario)){
			de(usuario);
			var res = RegisterService.save(usuario, function() {
					Notification.success( {message: 'Usuario criado com sucesso!', delay: 4000});
	        			$location.path('/');
			});

		}

		Notification.error({message: 'A senhas informadas não são iguais' , delay: 1000});
	}

	function validaPassword (register) {
		if(register.password1 !== register.password2) {
			return false;
		}
		return true;
	}





}])