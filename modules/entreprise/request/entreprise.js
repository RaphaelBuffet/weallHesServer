function getall(req, res, next) {
    db.query('SELECT * FROM entreprise_view', (err, rows) => {
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
    db.query('Select * from entreprise_view WHERE id_entreprise= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = rows;
            res.json(result);
        }
        
    })
}
function getByUser(req, res, next) {
    console.log(req.params.id)
    db.query('Select * from entreprise_view WHERE id_user= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = rows;
            res.json(result);
        }
        
    })
}
function modifyEntreprise(req, res, next) {
    console.log(req.params.id)
    let data= [
        req.body.nom,
        req.body.description,
        req.body.id_type_entreprise,
        req.body.id_ethique,
        req.body.id_benefice_externe_1,
        req.body.id_benefice_externe_2,
        req.body.id_benefice_externe_3,
        req.body.image_url,
        req.body.id_localite,
        req.body.id_secteur,
        req.body.adresse,
        req.body.adresse_suplémentaire,
        req.body.id_label,
        req.params.id
    ]
    db.query('UPDATE entreprise SET nom=?,description=?,id_type_entreprise=?,id_ethique=?,id_benefice_externe_1=?,id_benefice_externe_2=?,id_benefice_externe_3=?,image_url=?,id_localite=?,id_secteur=?,adresse=?,adresse_suplémentaire=?,id_label=? where id_entreprise=?', data, (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = {status:true};
            res.json(result);
        }
        
    })
}
function modifyContact(req, res, next) {
    console.log(req.params.id)
    let data= [
        req.body.nom_responsable_RH,
        req.body.prenom_responsable_RH,
        req.body.poste_responsable_RH,
        req.body.telephone_responsable_RH,
        req.params.id
    ]
    db.query('UPDATE entreprise SET nom_responsable_RH=?,prenom_responsable_RH=?,poste_responsable_RH=?,telephone_responsable_RH=? where id_entreprise=?', data, (err, rows) => {
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
    getByUser,
    modifyEntreprise,
    modifyContact
}