(function(){
  'use strict';
  angular.module('app')
    .controller('OrcamentoDetalhes', OrcamentoDetalhes);
    OrcamentoDetalhes.$inject = ['$scope', 'OrcamentoService','$location','Notification','StorageData','contasList'];

    function OrcamentoDetalhes($scope, OrcamentoService,$location,Notification,StorageData,contasList) {
      var id_familia = StorageData.getFamilia();

      contasList.$promise.then(function(data) {
        $scope.contasList = data._embedded.contas;
      });

      $scope.createorcamento = function(orcamento) {
        orcamento.idFamilia = id_familia;
        orcamento.idUser    =
      };

    };

})();
