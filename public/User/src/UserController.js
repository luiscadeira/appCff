(function(){
'use strict';

angular.
	module('app')

controller('UserCtrl', ['$scope','UserService','StorageData', function ($scope,UserService,StorageData) {

	$scope.user = {
		nome : StorageData.getValue('nome'),
		perfil :StorageData.getValue('perfil')
	};

	de(StorageData.getValue('perfil'));


}])





})
