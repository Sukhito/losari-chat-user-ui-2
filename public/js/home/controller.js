app.controller('HomeCtrl',function($scope,$state){

    $scope.openChatWindow = function(){
        $state.go('conversation');
    };
});
