app.factory('FamiliaService', ['$resource', 
    function ($resource) {
   

  return $resource(BASE_URL + "/familias/:id", {}, {
    query: { method : "GET", isArray: false },
    create: { method: 'POST' },
    'delete': {
        method:'DELETE'
    },
    update: { method: 'PUT', params: {id: '@id'} },
    show:   { method: 'GET' },
  });
    
}]);
