app.controller('ConversationCtrl',function($scope,ConversationService){
    //assuming the user has logged in and has this credential
    $scope.user = {
        id : 100,
        name : "Ronan"
    };

    //when live chat button is clicked a new conversation is created in the database
    ConversationService.createConversation($scope.user).then(function(response){
        $scope.conversation = response.data[0];
        $scope.conversation.chats = JSON.parse($scope.conversation.chats);
    });

    //initiate a new chat object
    $scope.newChat = {
        body : "",
        name : $scope.user.name
    };

    //send button to send new chat object to database
    $scope.send = function(){
        var conversationData = {
            newChat : $scope.newChat,
            chatId  : $scope.conversation.id
        }

        ConversationService.sendChat(conversationData).then(function(response){
            $scope.newChat.body = "";
            if(response.data){

            }else{
                alert("Failed");
            }
        });

    }

    $scope.chats = [];
    //keep checking for conversation update
    setInterval(function(){ 
        ConversationService.getConversation($scope.conversation.id, $scope.user.id).then(
            function(response){
                console.log(response.data);
                if(response.data != null){
                    $scope.chats = $scope.chats.concat(response.data);
                }
            }
        )
    }, 1000);
});
