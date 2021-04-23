function getall(req, res, next) {
    db.query('SELECT * FROM competence', (err, rows) => {
        if (err) { console.log(err); }
        else {
            console.log(rows)
            let result = [];
            for (const value of rows) {
                console.log(value.nom)
                result.push({
                    id: value.id_competence,
                    nom: value.nom,
                });
            }
            res.json(result);
        }
    })
}
function getById(req, res, next) {
    console.log(req.params.id)
    db.query('Select * from competence WHERE id_competence= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = rows;
            res.json(result);
        }
        
    })
}
function getByPostulant(req, res, next) {
    console.log(req.params.id)
    db.query('Select * from competence_view WHERE id_postulant= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = rows;
            res.json(result);
        }
        
    })
}
function modifyCompetence(req, res, next) {
    console.log(req.params.id)
    let data= [
        req.body.competence,
        req.params.id_postulant,
        req.params.id_competence,
    ]
    db.query('UPDATE competence_postulant SET id_competence=? where id_postulant=? and id_competence=?', data, (err, rows) => {
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
    modifyCompetence
}