function myHistory(req, res, next){
    console.log(req.userId)
    const id = req.userId;
    db.query('SELECT * FROM chatLogView WHERE id_user1 = ? OR id_user2 = ?', [id,id], (err, rows) => {
        if(err){console.log(err);}
        else {
            let result = {};
            for (const value of rows){
                let idOther = value.id_user1 === Number(id) ? value.id_user2 : value.id_user1;
                if(typeof result[idOther] === 'undefined'){
                    result[idOther] = {};
                    result[idOther].msg = [];
                    result[idOther].id = idOther;
                    result[idOther].name = value.id_entreprise === idOther ? value.nom_entreprise : value.nom_postulant;
                    result[idOther].lastVisit = value.heure_visite;
                }
                result[idOther].msg.push({
                    idUser1 : value.id_user1,
                    idUser2 : value.id_user2,
                    msg : value.message,
                    date : value.date
                });
            }
            res.json(result);
        }
    })
}

function myHistoryWith(req, res){
    let myId = req.header('myId') || 1
    let otherId = req.params.id;
    db.query('SELECT * FROM chatLogView WHERE (id_user1 = ? AND id_user2 = ?) OR (id_user1 = ? AND id_user2 = ?)', [myId, otherId, otherId, myId], (err, rows) =>{
        if(err){console.log(err);}
        else {
            myId = Number(myId);
            otherId = Number(otherId);
            let result = {};
            result.msg = [];
            if(rows.length > 0)
            result.correspondent = {
                id:otherId,
                name: rows[0].id_entreprise === otherId ? rows[0].nom_entreprise : rows[0].nom_postulant
            }
            else result.correspondent = {
                id:otherId,
                name:'unknown'
            }
            for(const value of rows){
                result.msg.push({
                    idUser1 : value.id_user1,
                    idUser2 : value.id_user2,
                    msg : value.message,
                    date : value.date
                })
            }
            res.json(result);
        }
    })
}

function updateLastVisit(req,res){
    const time = new Date(req.body.time);
    const from = req.body.from;
    const to = req.body.to;
    db.query(`UPDATE chat_derniere_visite set heure_visite = ? where id_from = ? and id_to = ?`,
        [time,from,to], function(err,result){
            if(result.affectedRows <1)
                db.query(`INSERT INTO chat_derniere_visite(id_from, id_to, heure_visite) VALUES (?,?,?)`,
                    [from,to,time],function(err,rows){
                        res.json();
                    });
            else {
                res.json();
            }
        });
}

module.exports = {
    myHistory,
    myHistoryWith,
    updateLastVisit
}