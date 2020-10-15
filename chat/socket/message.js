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
        io.emit(msg.to, JSON.stringify(msg));
        io.emit(msg.from, JSON.stringify(msg));
        this.recordMsg(msg);
    }

    static recordMsg(msg){
        msg.from =1234121;
        msg.to = 7777777;
        console.log("COUCOUCOUCOUCOUCOU");
        console.log(msg);
        db.query('INSERT INTO log_chat(id_user1, id_user2,message) VALUE (?,?,?)', [msg.from,msg.to,msg.msg], (err, res) => {
            if(err) console.log(err);
        })
    }
    static getMyHistory(req, res){
        // récupérer le token dans le header
        this.myHistory(1234121)
    }

    static myHistory(id){
        db.query('SELECT * FROM log_chat WHERE id_user1 = ? OR id_user2 = ?', [id,id], (err, rows) => {
            console.log(rows);
        })
    }
}

