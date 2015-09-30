app.factory('StorageData', ['localStorageService', function (localStorageService) {
	

   var StorageApi = {};

    StorageApi.getFamilia = function () {
        return localStorageService.get('familia_id')
    };
    StorageApi.getValue =  function(key) {
        return localStorageService.get(key);
    }

    StorageApi.setValue = function(key, val) {
    	 return localStorageService.set(key, val);
    	 
    };

   StorageApi.removeKey = function (key) {
   		return localStorageService.remove(key);
   };

   return StorageApi;

}]);