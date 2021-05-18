function getall(req, res, next) {
    db.query('SELECT * FROM filtre_offre', (err, rows) => {
        if (err) { console.log(err); }
        else {
            console.log(rows)
            let result = [];
            for (const value of rows) {
                console.log(value.nom)
                result.push({
                    id: value.id_filtre,
                    nom: value.nom,
                });
            }
            res.json(result);
        }
    })
}
function getById(req, res, next) {
    console.log(req.params.id)
    db.query('Select * from filtre_offre WHERE id_filtre= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = rows;
            res.json(result);
        }

    })
}
function getAllFiltrePostulant(req, res, next) {
    console.log(req.params.id)
    let result = {
        secteur: [],
        canton: [],
        taux: '',
        contrat: [],
        dispo: '',
        salaire: [],
        type: [],
        ethique: []
    }
    db.query('Select * from filtre_postulant WHERE id_filtre= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            result.taux = rows[0].id_taux_max
            result.dispo = rows[0].id_disponibilite
            console.log(rows)
        }
    })
    db.query('Select id_secteur AS id from filtre_secteur WHERE id_filtre_postulant= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            result.secteur = rows
        }
    })
    db.query('Select id_canton AS id from filtre_canton WHERE id_filtre_postulant= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            result.canton = rows
        }
    })
    db.query('Select id_contrat AS id from filtre_contrat WHERE id_filtre= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            result.contrat = rows
        }
    })
    db.query('Select id_salaire AS id from filtre_salaire WHERE id_filtre= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            result.salaire = rows
        }
    })
    db.query('Select id_type AS id from filtre_type_entreprise WHERE id_filtre= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            result.type = rows
        }
    })
    db.query('Select id_ethique AS id from filtre_ethique WHERE id_filtre= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            result.ethique = rows
        }
    })
    setTimeout(() => res.json(result), 400)

}
function getAllFiltreOffre(req, res, next) {
    console.log(req.params.id)
    let result = {
        secteur: [],
        experience: '',
        cursus: [],
        degre: [],
        langue: []
    }
    db.query('Select id_secteur from filtre_secteur WHERE id_filtre_entreprise= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            result.secteur = rows
        }
    })
    db.query('Select experience_min from filtre_offre WHERE id_filtre= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            result.experience = rows
        }
    })
    db.query('Select id_cursus from filtre_cursus WHERE id_filtre= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            result.cursus = rows
        }
    })
    db.query('Select id_degre from filtre_degre WHERE id_filtre= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            result.degre = rows
        }
    })
    db.query('Select * from filtre_langue WHERE id_filtre= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            result.langue = rows
        }
    })
    setTimeout(() => res.json(result), 400)
}
function updtaefiltreOffre(req, res, next) {
    console.log(req.params.id)
    //DELETE
    db.query('Delete from filtre_secteur WHERE id_filtre_entreprise= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
    })
    db.query('Delete from filtre_offre WHERE id_filtre= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
    })
    db.query('Delete from filtre_cursus WHERE id_filtre= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
    })
    db.query('Delete from filtre_degre WHERE id_filtre= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
    })
    db.query('Delete from filtre_langue WHERE id_filtre= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
    })
    //INSERT
    let secteur = []
    for (let i = 0; i < req.body.secteur.length; i++) {
        secteur.push([req.body.secteur, req.params.id, 1])
    }
    db.query('INSERT INTO filtre_secteur(id_secteur,id_filtre_entreprise,id_filtre_postulant) VALUES = ?', [secteur], (err, rows) => {
        if (err) { console.log(err); }
    })
    db.query('INSERT INTO filtre_offre(id_filtre,experience_min) VALUES = ?', [req.params.id, req.body.experience], (err, rows) => {
        if (err) { console.log(err); }
    })
    let cursus = []
    for (let i = 0; i < req.body.cursus.length; i++) {
        cursus.push([req.body.cursus[i], req.params.id])
    }
    db.query('INSERT INTO filtre_cursus(id_cursus,id_filtre) VALUES = ?', [cursus], (err, rows) => {
        if (err) { console.log(err); }
    })
    let degree = []
    for (let i = 0; i < req.body.degre.length; i++) {
        degree.push([req.body.degre, req.params.id])
    }
    db.query('INSERT INTO filtre_degre(id_degree,id_filtre) VALUES = ?', [degree], (err, rows) => {
        if (err) { console.log(err); }
    })
    let langue = []
    for (let i = 0; i < req.body.langue.length; i++) {
        langue.push([req.params.id, req.body.langue[i], req.body.niveau[i]])
    }
    db.query('INSERT INTO filtre_langue(id_filtre,id_langue,id_niveau) VALUES = ?', [langue], (err, rows) => {
        if (err) { console.log(err); }
    })
}
function updtaefiltrePostulant(req, res, next) {
    console.log(req.params.id)
    //DELETE
    db.query('Delete from filtre_postulant WHERE id_filtre= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
    })
    db.query('Delete from filtre_secteur WHERE id_filtre_postulant= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
    })
    db.query('Delete from filtre_canton WHERE id_filtre= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
    })
    db.query('Delete from filtre_contrat WHERE id_filtre= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
    })
    db.query('Delete from filtre_salaire WHERE id_filtre= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
    })
    db.query('Delete from filtre_type_entreprise WHERE id_filtre= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
    })
    db.query('Delete from filtre_ethique WHERE id_filtre= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
    })
    //INSERT
    db.query('INSERT INTO filtre_postulant(id_filtre,id_taux_max,id_disponibilite) VALUES = ?', [req.params.id, req.body.taux, req.body.dispo], (err, rows) => {
        if (err) { console.log(err); }
    })
    let secteur = []
    for (let i = 0; i < req.body.secteur.length; i++) {
        secteur.push([req.body.secteur, req.params.id, 1])
    }
    db.query('INSERT INTO filtre_secteur(id_secteur,id_filtre_postulant,id_filtre_entreprise) VALUES = ?', [secteur], (err, rows) => {
        if (err) { console.log(err); }
    })
    let canton=[]
    for(let i=0;i<req.body.canton.length;i++){
        canton.push([req.body.canton[i],req.params.id])
    }
    db.query('INSERT INTO filtre_canton(id_canton,id_filtre) VALUES = ?', [canton], (err, rows) => {
        if (err) { console.log(err); }
    })
    let contrat=[]
    for(let i=0;i<req.body.contrat.length;i++){
        contrat.push([req.body.contrat[i],req.params.id])
    }
    db.query('INSERT INTO filtre_contrat(id_contrat,id_filtre) VALUES = ?', [contrat], (err, rows) => {
        if (err) { console.log(err); }
    })
    let salaire=[]
    for(let i=0;i<req.body.salaire.length;i++){
        salaire.push([req.body.salaire[i],req.params.id])
    }
    db.query('INSERT INTO filtre_salaire(id_salaire,id_filtre) VALUES = ?', [salaire], (err, rows) => {
        if (err) { console.log(err); }
    })
    let type=[]
    for(let i=0;i<req.body.type.length;i++){
        type.push([req.body.type[i],req.params.id])
    }
    db.query('INSERT INTO filtre_type_entreprise(id_type,id_filtre) VALUES = ?', [type], (err, rows) => {
        if (err) { console.log(err); }
    })
    let ethique=[]
    for(let i=0;i<req.body.ethique.length;i++){
        ethique.push([req.body.ethique[i],req.params.id])
    }
    db.query('INSERT INTO filtre_ethique(id_ethique,id_filtre) VALUES = ?', [ethique], (err, rows) => {
        if (err) { console.log(err); }
    })
}
module.exports = {
    getall,
    getById,
    getAllFiltreOffre,
    getAllFiltrePostulant,
    updtaefiltreOffre,
    updtaefiltrePostulant
}