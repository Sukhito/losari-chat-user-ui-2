app.controller('ConversationCtrl',function($scope,ConversationService){
    $scope.user = {
        id : 100,
        name : "Ronan"
    };


    ConversationService.createConversation($scope.user).then(function(response){
        console.log(response);
    });
});
