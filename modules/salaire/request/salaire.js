function getall(req, res, next) {
    db.query('SELECT * FROM fourchette_salaire', (err, rows) => {
        if (err) { console.log(err); }
        else {
            console.log(rows)
            let result = [];
            for (const value of rows) {
                console.log(value.nom)
                result.push({
                    id: value.id_salaire,
                    salaireMin: value.salaire_min,
                    salaireMax: value.salaire_max
                });
            }
            res.json(result);
        }
    })
}
function getById(req, res, next) {
    console.log(req.params.id)
    db.query('Select * from fourchette_salaire WHERE id_salaire= ?', [req.params.id], (err, rows) => {
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