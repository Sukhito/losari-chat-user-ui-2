app.factory('ConversationService',function($http){
    return{
        createConversation : function(userID){
            return $http.post('api/conversations',userID);
        },
        getConversation: function(conversationID,userID){
            return $http.get('api/conversations/' + conversationID + "/user/" + userID);
        },
        sendChat: function(conversation){
            return $http.post('api/conversations/'+ conversation.chatId+'/chats',conversation);
        }
    }
})