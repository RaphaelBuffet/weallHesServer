module.exports = {getById, getAll, getByEmail};
function getById(req, res, next){
    const id = req.params.id;
    db.query('Select * from user WHERE id= ?', [id], (err, result) => {
        if (result[0] != undefined) {
            res.json(result[0])
        } else {
            res.json(new Error(config.errors.wrongID))
        }
    })
}
function getAll(req,res,next){
    console.log("ici")
    db.query('Select * from user',(err,result) => res.json(result))
}
function getByEmail(req, res, next){
    const email = null;
    db.query('Select * from user WHERE e_mail= ?',[email], ((err,result) => next(result)));
}