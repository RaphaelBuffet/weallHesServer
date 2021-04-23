function getall(req, res, next) {
    db.query('SELECT * FROM softskill', (err, rows) => {
        if (err) { console.log(err); }
        else {
            console.log(rows)
            let result = [];
            for (const value of rows) {
                console.log(value.nom)
                result.push({
                    id: value.id_softskill,
                    nom: value.nom,
                });
            }
            res.json(result);
        }
    })
}
function getById(req, res, next) {
    console.log(req.params.id)
    db.query('Select * from softskill WHERE id_softskill= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = rows;
            res.json(result);
        }
        
    })
}
function getByPostulant(req, res, next) {
    console.log(req.params.id)
    db.query('Select * from softskill_View WHERE id_postulant= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = rows;
            res.json(result);
        }
        
    })
}
function modifySoftskill(req, res, next) {
    console.log(req.params.id)
    let data= [
        req.body.softskill,
        req.params.id_postulant,
        req.params.id_softskill
    ]
    db.query('UPDATE softskill_postulant SET id_softskill=? where id_postulant=? and id_softskill=?', data, (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = {status:true};
            res.json(result);
        }
    })
}
function deleteSoftskill(req, res, next) {
    db.query('Delete from softskill_postulant WHERE id_postulant= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
    })
}
module.exports = {
    getall,
    getById,
    getByPostulant,
    modifySoftskill,
    deleteSoftskill
}