(function(){
	'use strict';
	angular.module('app')
		.factory('CategoriaService', ['$resource','StorageData',
			function($resource,StorageData){
  
				  return $resource(BASE_URL + "/categorias/:id", {}, {
				    
				    query: { 
				      method : "GET",
				      isArray: false ,
				      url : BASE_URL + "/categorias?familia_id="+StorageData.getFamilia(),
				      params: {id_familia : '@id_familia'}

				    },
				    create: { method: 'POST' },
				    'delete': {
				    	method:'DELETE'
				    },
				    update: { method: 'PUT', params: {id: '@id'} },
				    show: { method: 'GET' },
				  });

				}]);
			

})();