(function() {
  'use strict';
  angular.module('app')
    .controller('RelatorioCtrl', RelatorioCtrl);

  RelatorioCtrl.$injet = ['$scope', 'StorageData', '$location', '$http'];

  function RelatorioCtrl($scope, StorageData, $location, $http) {

    $scope.showCarts = false;

    $scope.consultar = function() {

      var id_familia = StorageData.getFamilia();


      $scope.dataDe = new Date($scope.dataDe);
      var dateDe = $scope.dataDe.toLocaleString();
      dateDe = dateDe.substring(0, 10);
      $scope.dataAte = new Date($scope.dataAte);
      var dateAte = $scope.dataAte.toLocaleString();
      dateAte = dateAte.substring(0, 10);

      var consulta = {
        de: dateDe,
        ate: dateAte,
        tipo: $scope.consulta.tipo
      };

      $http.get(BASE_URL + '/relatorios?familia_id=' + id_familia + '&dataDe=' + consulta.de + '&dataAte=' + consulta.ate + '&tipo=' + consulta.tipo)
        .success(function(data) {
					de(data);
					$scope.labelsCategorias = data._embedded.relatorios[0].labelsCategoria.replace("\'", "\"");

					var labels = data._embedded.relatorios[0].labelsCategoria.substring(1);

          $scope.dataCategorias = [38,1];
					$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
					$scope.data = [300, 500, 100];
          $scope.showCharts = !$scope.showCharts;
					de($scope.labelsCategorias);
					de($scope.dataCategorias);
        }).error(function(error) {
          de(error);
        });

    }



    $scope.data = [8, 1, 2];
  };

})()
