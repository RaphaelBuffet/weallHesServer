function getall(req, res, next) {
    db.query('SELECT * FROM localite', (err, rows) => {
        if (err) { console.log(err); }
        else {
            console.log(rows)
            let result = [];
            for (const value of rows) {
                console.log(value.nom)
                result.push({
                    npa: value.NPA,
                    ville: value.ville,
                    canton: value.id_canton
                });
            }
            res.json(result);
        }
    })
}
function getById(req, res, next) {
    console.log(req.params.id)
    db.query('Select * from localite WHERE npa= ?', [req.params.id], (err, rows) => {
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