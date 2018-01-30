var con = require('./db');

module.exports = function(app){

    //create new conversation in db (assuming the operator has been signed to this specific user)
    app.post('/api/conversations',function(req,res){

        var userID = req.body.id;
        var operatorID = 200;

        var sql = "INSERT INTO conversations ( " +

            "user_id," +
            "operator_id," +
            "chats," + 
            "date_created,"+ 
            "date_updated,"+
            "user_last_update,"+
            "operator_last_update)"+ 

            "VALUES ("+

            userID + "," +
            operatorID + "," +
            "'[]'" + "," + 
            "NOW()," +
            "NOW()," +
            "NOW()," +
            "NOW())";
        
            con.query(sql,function(err,result,fields){
            if(err){
                console.log(err);
            }else{
                var sql = "SELECT * FROM conversations where id =" + result.insertId;
                con.query(sql,function(err, result, fields){
                    res.json(result);
                });
            }
        });
    });

    //get conversation
    app.get('/api/conversations/:conversationid/user/:userid',function(req,res){
        var conversationId = req.params.conversationid;
        var userid = req.params.userid

        var sql = "CALL losari.conversations_get_chats_user("+conversationId+")";

        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            if(result[1][0]['nArray'] === undefined){
                res.json(null)
            }else{
                var sql2 = "SELECT * FROM losari.conversations WHERE id = " +  conversationId;
                con.query(sql2,function(err,result2, fields){
                    var chats = JSON.parse(result2[0].chats);
                    if(result[1][0]['nArray']){
                        res.json(chats.slice(parseInt(result[1][0]['nArray']) + 1, chats.length));
                    }else{
                        res.json(chats);
                    }
                });
                
                
            }

        });
    })

    //append new chat to json chat file in db
    app.post('/api/conversations/:id/chats',function(req,res){

        var conversationId = req.params.id;
        var newChat = req.body.newChat;

        var sql = "CALL losari.conversations_insert_chat( \'" + newChat.body +"\',\'" + newChat.name +"\'," + conversationId + ")";

        con.query(sql,function(err,result,fields){
            res.json(result);
        });
    })
}