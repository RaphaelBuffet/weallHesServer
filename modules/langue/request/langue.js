function getall(req, res, next) {
    db.query('SELECT * FROM langue', (err, rows) => {
        if (err) { console.log(err); }
        else {
            console.log(rows)
            let result = [];
            for (const value of rows) {
                console.log(value.nom)
                result.push({
                    id: value.id_langue,
                    nom: value.nom,
                });
            }
            res.json(result);
        }
    })
}
function getById(req, res, next) {
    console.log(req.params.id)
    db.query('Select * from langue WHERE id_langue= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = rows;
            res.json(result);
        }
        
    })
}
function getByPostulant(req, res, next) {
    console.log(req.params.id)
    db.query('Select * from langue_postulant_view WHERE id_postulant= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = rows;
            res.json(result);
        }
        
    })
}
function getAllSejours(req, res, next) {
    let langue=req.params.id_langue
    let postulant=req.params.id_postulant
    db.query('Select * from sejours_view WHERE id_postulant= ? and id_langue=?', [postulant,langue], (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = rows;
            res.json(result);
        }
        
    })
}
function modifyLanguePostulant(req, res, next) {
    console.log(req.params.id)
    let data= [
        req.body.langue,
        req.body.niveau,
        requ.body.certificat,
        requ.body.obtention,
        req.params.id_postulant,
        req.params.id_langue
    ]
    db.query('UPDATE langue_postulant SET id_langue=?,id_niveau=?,certificat=?,obtention=? WHERE id_postulant= ? and id_langue=?', data, (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = {status:true};
            res.json(result);
        }
    })
}
function modifySejours(req, res, next) {
    console.log(req.params.id)
    let data= [
        req.body.pays,
        req.body.type,
        req.body.debut,
        req.body.fin,
        req.params.id_postulant,
        req.params.id_langue
    ]
    db.query('UPDATE sejour SET id_pays=?,id_type=?,debut=?,fin=? WHERE id_postulant= ? and id_langue=?', data, (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = {status:true};
            res.json(result);
        }
    })
}
module.exports = {
    getall,
    getById,
    getByPostulant,
    getAllSejours,
    modifyLanguePostulant,
    modifySejours
}