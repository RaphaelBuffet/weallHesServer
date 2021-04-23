function getall(req, res, next) {
    db.query('SELECT * FROM Experience_view', (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = rows;
            res.json(result);
        }
    })
}
function getById(req, res, next) {
    console.log(req.params.id)
    db.query('Select * from Experience_view WHERE id_experience= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = rows;
            res.json(result);
        }
        
    })
}
function getByPostulant(req, res, next) {
    console.log(req.params.id)
    db.query('Select * from Experience_view WHERE id_postulant= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = rows;
            res.json(result);
        }
        
    })
}
function modifyExperience(req, res, next) {
    console.log(req.params.id)
    let data= [
        req.body.entreprise,
        req.body.poste,
        req.body.debut,
        req.body.fin,
        req.body.secteur,
        req.body.pays,
        req.body.npa,
        req.body.description,
        req.params.id
    ]
    db.query('UPDATE experience_professionelle SET entreprise=?,poste=?,date_debut=?,date_fin=?,id_secteur=?,id_pays=?,npa=?,description=? where id_experience=?', data, (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = {status:true};
            res.json(result);
        }
        
    })
}
function deleteExperience(req, res, next) {
    db.query('Delete from experience_professionelle WHERE id_postulant= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
    })
}
module.exports = {
    getall,
    getById,
    getByPostulant,
    modifyExperience,
    deleteExperience
}