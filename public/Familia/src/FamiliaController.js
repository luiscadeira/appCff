var app = angular.module('app',[]);
app.controller('FamiliaCtrl' , ['$scope', '$http', '$localStorage',
	function($http, $scope, FamiliaService, $localStorage ){


	get();
	console.log();


	$scope.save = function (familia) {
		   var formData = {
            familia : familia.familia,
            qtdMembros: familia.qtdMembros
        }

	}

	function get ($http) {
		var id_familia = localStorage.getItem('familias_id');
		$http.get('http://localhost:666/familias/' + id_familia).
        success(function(data) {
        	console.log(data);
            $scope.nomeFamilia = data.nome;
            $scope.qtdMembros = data.qtdMembros;
        });
	
	}


}]);