(function(){
'use strict';

angular.module('app')
	.factory('UserService',['$resource','StorageData', function($resource,StorageData){

		var id_usuario = StorageData.getValue('id');
		var id_familia = StorageData.getValue('familia_id');

		return $resource(BASE_URL + "/user/:id", {}, {
			save: { method: 'POST' },
			'delete': {
			method:'DELETE'
			},
			update: { method: 'PUT', params: {id: id_usuario}},
			show: { method: 'GET' },
		});

	}]);
	
})();