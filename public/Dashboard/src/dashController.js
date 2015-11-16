(function(){
    'use stric';
    angular.module('app')
        .controller('DashBoardCtrl', DashBoardCtrl);
        DashBoardCtrl.$inject = ['$scope','DespesaService', 'StorageData','Notification','ReceitaService'];

        function DashBoardCtrl($scope,DespesaService,StorageData,Notification,ReceitaService) {


            $scope.labels = ["Receitas", "Despesas"];
            $scope.data = [];

            if(StorageData.getFamilia()) {
                DespesaService.query().$promise.then(
                function(success) {
                    $scope.despesaList = success._embedded.despesas;
                    $scope.totalDespesas = $scope.despesaList[$scope.despesaList.length-1].totalDespesas;
                    $scope.qtdLancemeento = $scope.despesaList.length;
                      
                      var totalDespesas = $scope.totalDespesas;
                      $scope.data[1] = totalDespesas;
                },
                function( error ){
                    Notification.error({message: error.status+'-'+  error.statusText , delay: 9000});
                });
            };


            if(StorageData.getFamilia()) {
                ReceitaService.query().$promise.then(
                function(success) {
                    $scope.receitaList    = success._embedded.receitas;
                    $scope.totalReceita   = $scope.receitaList[$scope.receitaList.length-1].totalReceita;
                    $scope.qtdLancemeento = $scope.receitaList.length;
                    $scope.data[0]        =  $scope.totalReceita;
                },
                function( error ){

                    if(error.status === 404) {
                        Notification.info({message: 'Cadastre suas Receitas' , delay: 9000});
                    return;
                    }

                   Notification.error({message: error.status+'-'+  error.statusText , delay: 9000});
                });
            }


        }
})();
