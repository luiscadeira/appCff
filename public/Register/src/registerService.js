
app.factory('RegisterService',['$resource', 
function ($resource) {

  
  return $resource(BASE_URL + "/register/:id", {}, {
    save: { method: 'POST' },
    'delete': {
    	method:'DELETE'
    },
    update: { method: 'PUT', params: {id: '@id'} },
    show: { method: 'GET' },
  });
	



}]);