function getall(req, res, next) {
    db.query('SELECT * FROM benefice_externe', (err, rows) => {
        if (err) { console.log(err); }
        else {
            console.log(rows)
            let result = [];
            for (const value of rows) {
                console.log(value.nom)
                result.push({
                    id: value.id_benefice,
                    nom: value.nom,
                });
            }
            res.json(result);
        }
    })
}
function getById(req, res, next) {
    console.log(req.params.id)
    db.query('Select * from benefice_externe WHERE id_benefice= ?', [req.params.id], (err, rows) => {
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