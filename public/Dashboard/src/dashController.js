(function(){
    'use stric';
    angular.module('app')
        .controller('DashBoardCtrl', DashBoardCtrl);
        DashBoardCtrl.$inject = ['$scope','DespesaService', 'StorageData'];

        function DashBoardCtrl($scope,DespesaService,StorageData) {



            if(StorageData.getFamilia()) {
                DespesaService.query().$promise.then(
                function(success) {
                    $scope.despesaList = success._embedded.despesas;
                    $scope.totalDespesas = $scope.despesaList[$scope.despesaList.length-1].totalDespesas;
                    $scope.qtdLancemeento = $scope.despesaList.length;

                      $scope.labels = ["Receitas", "Despesas"];
                      var totalDespesas = $scope.totalDespesas
                      $scope.data = [300, totalDespesas];
                },
                function( error ){
                    Notification.error({message: error.status+'-'+  error.statusText , delay: 9000});
                });
            };

          
        }
})();