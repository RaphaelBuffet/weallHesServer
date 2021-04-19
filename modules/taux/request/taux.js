function getall(req, res, next) {
    db.query('SELECT * FROM taux', (err, rows) => {
        if (err) { console.log(err); }
        else {
            console.log(rows)
            let result = [];
            for (const value of rows) {
                console.log(value.nom)
                result.push({
                    id: value.id_taux,
                    nom: value.nom,
                });
            }
            res.json(result);
        }
    })
}
function getById(req, res, next) {
    console.log(req.params.id)
    db.query('Select * from taux WHERE id_taux= ?', [req.params.id], (err, rows) => {
        if (err) { console.log(err); }
        else {
            let result = rows;
            res.json(result);
        }
        
    })
}
module.exports = {
    getall,
    getById
}