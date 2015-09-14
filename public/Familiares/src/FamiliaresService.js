app.factory('FamiliaresService', ['$resource', 'StorageData',
    function ($resource,StorageData) {

  var familias_id =  StorageData.getFamilia();
  
  return $resource(BASE_URL + "/user/:id", {}, {
    query: { 
      method : "GET",
      isArray: false ,
      url : BASE_URL + "/user?familia_id="+familias_id,
    },
    create: { method: 'POST' },
    'delete': {
        method:'DELETE'
    },
    update: { method: 'PUT', params: {id: '@id'} },
    show:   { method: 'GET' },
  });
    
}]);
