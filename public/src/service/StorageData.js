app.factory('StorageData', ['localStorageService', function (localStorageService) {
	

   var StorageApi = {};

    StorageApi.getFamilia = function () {
        return localStorageService.get('familia_id')
    };
    return StorageApi;

}]);