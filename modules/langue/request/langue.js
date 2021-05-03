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
    db.query('Select * from langue_postulant_view WHERE id_postulant= ?', [req.params.id], (err, langue) => {
        if (err) { console.log(err); }
        else {
            let results=[]
            for (let i = 0; i < langue.length; i++) {
                let sejours = []
                console.log(langue[0])
                db.query('Select * from sejours_view WHERE id_postulant= ? AND id_langue= ?', [req.params.id, langue[i].id_langue], (err, rows) => {
                    if (err) { console.log(err); }
                    else {
                        sejours = rows
                        console.log(rows)
                        results.push ({
                            id_langue: langue[i].id_langue,
                            langue: langue[i].langue,
                            id_postulant: langue[i].id_postulant,
                            niveau: langue[i].niveau,
                            certificat: langue[i].certificat,
                            obtention: langue[i].obtention,
                            sejours: sejours
                        });   
                    }
                })
            }
            setTimeout(
                function() {res.json(results)},400
            )
            
        }
    })

}
function getAllSejours(req, res, next) {
    let postulant = req.params.id_postulant
    db.query('Select * from sejours_view WHERE id_postulant= ?', [postulant], (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = rows;
            res.json(result);
        }

    })
}
function modifyLanguePostulant(req, res, next) {
    console.log(req.params.id)
    let data = [
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
            let result = { status: true };
            res.json(result);
        }
    })
}
function modifySejours(req, res, next) {
    console.log(req.params.id)
    let data = [
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
            let result = { status: true };
            res.json(result);
        }
    })
}
function deleteLangue(req, res, next) {
    db.query('Delete from langue_postulant WHERE id_postulant= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
    })
}
module.exports = {
    getall,
    getById,
    getByPostulant,
    getAllSejours,
    modifyLanguePostulant,
    modifySejours,
    deleteLangue
}