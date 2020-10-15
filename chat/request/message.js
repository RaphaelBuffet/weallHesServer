let db, config;

module.exports= (_db, _config) => {
    db = _db;
    config = _config;
    return Message;
}

let Message = class {
    static myHistory(id){
        return new Promise((next) => {
            db.query('SELECT * FROM log_chat WHERE id_user1 = ? OR id_user2 = ?', [id,id], (err, rows) => {
                next(rows);
            })
        })
    }
}

