function getall(req, res, next) {
    db.query('SELECT * FROM offre_view', (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = rows;
            res.json(result);
        }
    })
}
function getById(req, res, next) {
    console.log(req.params.id)
    db.query('Select * from offre_view WHERE id_offre= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = rows;
            res.json(result);
        }
        
    })
}
function getByEntreprise(req, res, next) {
    console.log(req.params.id)
    db.query('Select * from offre_view WHERE id_entreprise= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = rows;
            res.json(result);
        }
        
    })
}
function modifyOffre(req, res, next) {
    console.log(req.params.id)
    let data= [
        req.body.nom,
        req.body.taux,
        req.body.contrat,
        req.body.dispo,
        req.body.salaire,
        req.body.url,
        req.body.npa,
        req.body.issearchable,
        req.body.duree,
        req.params.id
    ]
    db.query('UPDATE offre SET nom=?,id_taux=?,id_contrat=?,id_dispo=?,id_salaire=?,url=?,npa=?,is_searchable=?,duree=? where id_offre=?', data, (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = {status:true};
            res.json(result);
        }
        
    })
}
function deleteOffre(req, res, next) {
    db.query('Delete from offre WHERE id_offre= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
    })
}
module.exports = {
    getall,
    getById,
    getByEntreprise,
    modifyOffre,
    deleteOffre
}