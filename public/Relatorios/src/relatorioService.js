app.factory('RelatorioService',['$resource', 'StorageData',
  function ($resource,StorageData) {

  var id_familia = StorageData.getFamilia();

  return $resource(BASE_URL + "/relatorios/:id", {}, {

    query: {	
      method : "GET",
      isArray: false ,
      url : BASE_URL + "/relatorios?familia_id="+id_familia,
      params: {id_familia : '@id_familia'}
    },

    getDespesas :{
    	method : "GET",
    	params: {de : 'de', dataAte : 'ate'},
    	url : BASE_URL +'/relatorios?familia_id='+id_familia+'&dataDe='+de+'&dataAte='+dataAte+'&tipo=despesa'
    },

    create: { method: 'POST' },

    'delete': {
    	method:'DELETE'
    },

    update: { method: 'PUT', params: {id: '@id'} },

    show: { method: 'GET' },
  });


}]);
