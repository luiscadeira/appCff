(function(){
app.factory('ReceitaService',['$resource', 'StorageData',
  function ($resource,StorageData) {

  var id_familia = StorageData.getFamilia();

  return $resource(BASE_URL + "/receitas/:id", {}, {

    query: {
      method : "GET",
      isArray: false ,
      url : BASE_URL + "/receitas?familia_id="+id_familia,
      params: {id_familia : '@id_familia'}
    },

    create: { 
      method: 'POST',
      url : BASE_URL + "/receitas?familia_id="+id_familia 
    },
    
    'delete': {
    	method:'DELETE'
    },

    update: { method: 'PUT', params: {id: '@id'} },

    show: { method: 'GET' },
  });


}]);
})();
