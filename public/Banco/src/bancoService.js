
app.factory('BancoService', ['$resource', function ($resource) {

    
   
  return $resource(BASE_URL + "/bancos/:id", {}, {
    query: { method: "GET", isArray: false }
  });
	



    // var BancoApi = {};

    // BancoApi.getBancos = function () {
    //     return $http.get(BASE_URL+'/bancos');
    // };

    // BancoApi.getBanco = function (id) {
    //     return $http.post(urlBase + '/AddStudent', id);
    // };
    // return BancoApi;

}]);

