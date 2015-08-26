app.factory('StorageData', ['localStorageService', function (localStorageService) {
	

   var StorageApi = {};

    StorageApi.getFamilia = function () {
        return localStorageService.get('familias_id')
    };

    return StorageApi;

}]);