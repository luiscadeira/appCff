
app.factory('BancoService', ['$resource', function ($resource) {

    
   
  return $resource(BASE_URL + "/bancos/:id", {}, {
    query: { method : "GET", isArray: false },
    create: { method: 'POST' },
    'delete': {
    	method:'DELETE'
    },
    update: { method: 'PUT', params: {id: '@id'} },
    show: { method: 'GET' },
  });
	



}]);

