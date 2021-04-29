function getall(req, res, next) {
    db.query('SELECT * FROM formation_view', (err, rows) => {
        if (err) { console.log(err); }
        else {
            console.log(rows)
            let result = rows;
            res.json(result);
        }
    })
}
function getById(req, res, next) {
    console.log(req.params.id)
    db.query('Select * from formation_view WHERE id_formation= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = rows;
            res.json(result);
        }
        
    })
}
function getByPostulant(req, res, next) {
    console.log(req.params.id)
    db.query('Select * from formation_view WHERE id_postulant= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = rows;
            res.json(result);
        }
        
    })
}
function modifyFormation(req, res, next) {
    console.log(req.params.id)
    let data= [
        req.body.debut,
        req.body.fin,
        req.body.cursus,
        req.body.institut,
        req.body.degre,
        req.body.diplome,
        req.params.id
    ]
    db.query('UPDATE formation SET date_debut=?,date_fin=?,id_cursus=?,id_institut=?,id_degre=?,diplome=? where id_entreprise=?', data, (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = {status:true};
            res.json(result);
        }
        
    })
}
function deleteFormation(req, res, next) {
    db.query('Delete from formation WHERE id_postulant= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
    })
}
module.exports = {
    getall,
    getById,
    getByPostulant,
    modifyFormation,
    deleteFormation
}