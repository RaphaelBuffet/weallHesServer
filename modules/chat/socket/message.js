let db, io;

module.exports= (_db, _io) => {
    db = _db;
    io = _io;
    return Message;
}

let Message = class {
    static postMessage(msg){
        msg = JSON.parse(msg);
        console.log(msg);
        io.emit(msg.to.id, JSON.stringify(msg));
        io.emit(msg.from.id, JSON.stringify(msg));
        this.recordMsg(msg);
    }

    static recordMsg(msg){
        if(typeof msg.from.id !== 'number' || typeof msg.to.id !== 'number'){
            return;
        }
        console.log(msg);
        db.query('INSERT INTO log_chat(id_user1, id_user2,message) VALUE (?,?,?)', [msg.from.id,msg.to.id,msg.msg], (err, res) => {
            if(err) console.log(err);
        })
    }
}

