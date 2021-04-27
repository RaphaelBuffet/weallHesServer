function getall(req, res, next) {
    db.query('SELECT * FROM postulant_view', (err, rows) => {
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
    db.query('Select * from postulant_view WHERE id_postulant= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = rows;
            res.status(200)
            res.json(result);
        }
        
    })
}
function getByuser(req, res, next) {
    console.log(req.headers.authorization)
    console.log("id")
    console.log(req.params.id)
    db.query('Select * from postulant_view WHERE id_user= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = rows;
            res.status(200).json(result);
        }
        
    })
}
function modifyPostulant(req, res, next) {
    console.log(req.params.id)
    let data= [
        req.body.nom,
        req.body.prenom,
        req.body.naissance,
        req.body.sexe,
        req.body.description,
        req.body.url_image,
        req.body.adresse,
        req.body.adresse_suplémentaire,
        req.body.npa,
        req.body.telephone,
        req.params.id
    ]
    db.query('UPDATE postulant SET nom=?,prenom=?,date_de_naissance=?,id_sexe=?,description=?,url_photo=?,adresse=?,adresse_suplement=?,npa=?,telephone=?where id_postulant=?', data, (err, rows) => {
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
    getByuser,
    modifyPostulant
}