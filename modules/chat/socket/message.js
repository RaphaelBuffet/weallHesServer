let db, io;

module.exports= (_db, _io) => {
    db = _db;
    io = _io;
    return Message;
}

let Message = class {
    static postMessage(msg){
        msg = JSON.parse(msg);
        io.emit(msg.idUser1, JSON.stringify(msg));
        io.emit(msg.idUser2, JSON.stringify(msg));
        this.recordMsg(msg);
    }

    static recordMsg(msg){
        if(typeof msg.idUser1 !== 'number' || typeof msg.idUser2 !== 'number'){
            return;
        }
        db.query('INSERT INTO log_chat(id_user1, id_user2,message) VALUE (?,?,?)', [msg.idUser1,msg.idUser2,msg.msg], (err, res) => {
            if(err) console.log(err);
        })
    }
}

