module.exports= {
    newMessage : receiveMessage
}

function receiveMessage(io, msg,db){
    msg = JSON.parse(msg);
    console.log(msg);
    io.emit(msg.to, JSON.stringify(msg));
    io.emit(msg.from, JSON.stringify(msg));
    recordMsg(msg,db);
}

function recordMsg(msg,db){
    msg.from =1234121;
    msg.to = 7777777;
    db.query('INSERT INTO log_chat(id_user1, id_user2,message) VALUE (?,?,?)', [msg.from,msg.to,msg.msg], (err, res) => {
        if(res) console.log(res);
    })
}
