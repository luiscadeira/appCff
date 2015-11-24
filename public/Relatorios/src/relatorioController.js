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

          $scope.labelsCategoria;
          $scope.dataCategorias;
          $scope.labelsConta;
          $scope.dataContas;
          var string =  data._embedded.relatorios[0].categoria.labelsCategoria.trim() ;
          var labels = string.split(",");

          $scope.labelsCategorias = geraArray(labels);

          var string =  data._embedded.relatorios[0].categoria.dataCategoria.trim() ;
          var dataCategorias = string.split(",");
          $scope.dataCategorias   =   geraArray(dataCategorias);


          var string = data._embedded.relatorios[1].contas.labelsConta.trim() ;
          var labels = string.split(",");
          $scope.labelsConta = geraArray(labels);
          var string = data._embedded.relatorios[1].contas.dataConta.trim() ;
          var labels = string.split(",");
          $scope.dataContas = geraArray(labels);


          var string = data._embedded.relatorios[2].usuarios.labelsUsuario.trim() ;
          var labels = string.split(",");
          $scope.labelsUsuario = geraArray(labels);
          var string = data._embedded.relatorios[2].usuarios.dataUsuario.trim() ;
          var labels = string.split(",");
          $scope.dataUsuario = geraArray(labels);

          function geraArray(array){
              var labelsCategorias = [];
              array.forEach(function(entry) {
              labelsCategorias.push(entry);
            });
            return labelsCategorias;
          }

          $scope.showCharts = !$scope.showCharts;

        }).error(function(error) {
          de(error);
        });

    }



    $scope.data = [8, 1, 2];
  };

})()
