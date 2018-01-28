app.factory('ConversationService',function($http){
    return{
        createConversation : function(userID){
            return $http.post('api/conversations',userID);
        },
        getConversation: function(){
            return $http.get('api/conversations');
        },
        sendChat: function(newChat){
            return $http.post('api/conversations',newChat);
        }
    }
})