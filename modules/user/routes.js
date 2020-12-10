const express = require('express')
const UserRouter= express.Router()
const bcrypt = require('bcrypt');
const User= require('../../assets/classes/user-class')
const authentification = require('./controllers/authentification')

UserRouter.get('/', User.getAll);
UserRouter.post('/',async (req, res) => {
        let email = req.body.email
        let password = req.body.password
        let entreprise = req.body.entreprise
        bcrypt.hash(password, 10, function (err, hash) {
            let sql = "INSERT INTO user (e_mail,mot_de_passe,entreprise) VALUES ?";
            let values = [[email, hash, entreprise]]
            db.query(sql, [values], function (err, result, fields) {
                if (err) throw err;
                res.send({
                    message: 'Table Data',
                    Total_record: result.length,
                    result: result
                });
            });
        });
    });
UserRouter.get('/:id', User.getById)
UserRouter.route('/token')
    .post(async (req,res)=>{
        let clientPassword=req.body.password
        let dbPassword=await User.getByEmail(req.body.email)
        let accountType
        if(dbPassword[0].entreprise===1){
            accountType=true
        }
        else{
            accountType=false
        }
        bcrypt.compare(clientPassword,dbPassword[0].mot_de_passe,function(err,ismatch){
            if (!ismatch) {
                res.statusCode=401;
                res.json("connection failed")
            }
            else{
                res.json({
                    email:req.body.email,
                    token: authToken,
                    isEntreprise:accountType
                })
            }
        })
    })

UserRouter.post('/login', authentification.login)

module.exports = UserRouter;