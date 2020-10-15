let db, io;

module.exports= (_db, _io) => {
    db = _db;
    io = _io;
    return Message;
}

let Message = class {
    static recordMsg(msg){
        msg.from =1234121;
        msg.to = 7777777;
        console.log(msg);
        db.query('INSERT INTO log_chat(id_user1, id_user2,message) VALUE (?,?,?)', [msg.from,msg.to,msg.msg], (err, res) => {
            if(err) console.log(err);
        })
    }
}

