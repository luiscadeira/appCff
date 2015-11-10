(function(){

'use strict';

app.factory('OrcamentoService',['$resource', 'StorageData',
  function ($resource,StorageData) {

  var id_familia = StorageData.getFamilia();
   
  return $resource(BASE_URL + "/orcamentos/:id", {}, {

    query: { 
      method : "GET",
      isArray: false ,
      url : BASE_URL + "/orcamentos?familia_id="+id_familia,
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