var con = require('./db');

module.exports = function(app){

    app.post('/api/conversations',function(req,res){

        console.log(req.body);
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

    app.get('/api/conversations',function(req,res){
        con.query("SELECT * FROM conversations", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    })

    app.post('/api/conversations/testingtestingtesting',function(req,res){

        var conversation = req.body.conversation;
        var newChat = req.body.newChat;

        conversation.chats.push(newChat);
        var sql = "UPDATE conversations SET chats = '" + JSON.stringify(conversation.chats) + "' WHERE id = " + conversation.id;
        con.query(sql,function(err,result,fields){
            res.json(result);
        });
    })
}