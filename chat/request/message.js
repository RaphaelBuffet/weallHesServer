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
                if(err){console.log(err);}
                else {
                    let result = {};
                    for (const value of rows){
                        let idOther = value.id_user1 === id ? value.id_user2 : value.id_user1;
                        if(typeof result[idOther] === 'undefined'){
                            result[idOther] = {};
                            result[idOther].msg = [];
                            result[idOther].id = idOther;
                            result[idOther].name = 'NomDuCorrespondant';
                        }
                        result[idOther].msg.push({
                            idUser1 : value.id_user1,
                            idUser2 : value.id_user2,
                            msg : value.message,
                            date : value.date
                        });
                    }
                    next(result);
                }
            })
        })
    }

    static myHistoryWith(myId, otherId){
        return new Promise((next) => {
            db.query('SELECT * FROM log_chat WHERE (id_user1 = ? AND id_user2 = ?) OR (id_user1 = ? AND id_user2 = ?)', [myId, otherId, otherId, myId], (err, rows) =>{
                if(err){console.log(err);}
                else {
                    let result = {};
                    result.msg = [];
                    result.correspondent = {
                        id:otherId,
                        name:'NomDeLAutre'
                    }
                    for(const value of rows){
                        result.msg.push({
                            idUser1 : value.id_user1,
                            idUser2 : value.id_user2,
                            msg : value.message,
                            date : value.date
                        })
                    }
                    next(result);
                }
            })
        })
    }
}

