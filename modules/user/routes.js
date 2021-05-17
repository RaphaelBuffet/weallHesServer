const express = require('express')
const UserRouter = express.Router()
const bcrypt = require('bcrypt');
const authentification = require('./controllers/authentification')

UserRouter.get('/', async (req, res) => {
    db.query('Select * from user', (err, result) => res.json(result))
});
//inscription
UserRouter.post('/', async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let entreprise = req.body.entreprise
    let id
    db.query("Select * from user where e_mail=?",[req.body.email],function (err, result, fields) {
        if (err) throw err;
        if(result[0]!=undefined){
            console.log(result[0])
            res.send({message: 'email already use'})
        }
        else{
            bcrypt.hash(password, 10, function (err, hash) {
                let sql = "INSERT INTO user (e_mail,mot_de_passe,isEntreprise) VALUES ?";
                let values = [[email, hash, entreprise]]
                db.query(sql, [values], function (err, result, fields) {
                    id=parseInt(result.insertId);
                    if (err) throw err;
                    res.send({
                        message: 'Table Data',
                        Total_record: result.length,
                        result: result
                    });
                });
                    if(entreprise ==="1"){
                        setTimeout(function () {db.query('INSERT INTO entreprise (id_user) VALUES (?)',[id])},500)
                    }
                    else if(entreprise==="0"){
                        setTimeout(function () {db.query('INSERT INTO postulant (id_user) VALUES (?)',[id])},500)
                    }
                
            });
        }
    });
    
});
UserRouter.get('/:id', async (req, res) => {
    db.query('Select * from user WHERE id_user= ?', [id], (err, result) => {
        console.log(result)
        if (result[0] != undefined) {
            res.json(result[0])
        } else {
            res.json(new Error(config.errors.wrongID))
        }
    })
})
//connexion
UserRouter.route('/token')
    .post(async (req, res) => {
        let clientPassword = req.body.password
        let dbPassword = await getByEmail(req.body.email)
        let accountType
        if (dbPassword[0].entreprise === 1) {
            accountType = true
        }
        else {
            accountType = false
        }
        bcrypt.compare(clientPassword, dbPassword[0].mot_de_passe, function (err, ismatch) {
            if (!ismatch) {
                res.statusCode = 401;
                res.json("connection failed")
            }
            else {
                res.json({
                    email: req.body.email,
                    token: authToken,
                    isEntreprise: accountType
                })
            }
        })
    })

function getByEmail(req, res, next) {
    const email = null;
    db.query('Select * from user WHERE e_mail= ?', [email], ((err, result) => next(result)));
}
UserRouter.post('/login', authentification.login)

module.exports = UserRouter;