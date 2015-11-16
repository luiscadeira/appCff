(function(){
	'use strict';
	 angular.module('app')
	 	.controller('OrcamentoCtrl', OrcamentoCtrl);
	 	OrcamentoCtrl.$inject = ['$scope', 'OrcamentoService','$location','Notification','StorageData'];

	 	function OrcamentoCtrl($scope,OrcamentoService,$location,Notification,StorageData){

            if(StorageData.getFamilia() && $location.path() != '/newOrcamento') {
                OrcamentoService.query().$promise.then(
                function(success) {
                    $scope.orcamentosList = success._embedded.orcamentos;
                },
                function( error ){
                    Notification.error({message: error.statusText , delay: 9000});
                });
            }

            $scope.novo = function()
            {
                $location.path('/newOrcamento');
            }

	 	}

})();