const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
module.exports = {
    login,
    logout
}

function login(req,res,next) {
    console.log("COUCOU")
    console.log(req.body);
    console.log(req.headers['content-lenght'])
    const email = req.body.email;
    const password = req.body.password;
    console.log(email+":"+password);
    const sqlQuery = 'SELECT * FROM `user` WHERE e_mail = ?'
    db.query(sqlQuery, [email], (err, result) => {
        if (err || !result || !result[0]) {
            res.status(401).json({message: 'utilisateur introuvable'});
            return;
        }
        bcrypt.compare(password, result[0].mot_de_passe, (err, result2) => {
            if(result2) {
                const token = jwt.sign(
                    {userId: result[0].id_user},
                    process.env.SECRET_TOKEN_GENERATOR,
                    {expiresIn: '7d'}
                );
                res.status(200).json({
                    userId: result[0].id_user,
                    token: token
                });
            }
            else{
                res.status(401).json({message: 'utilisateur introuvable'});
            }
        })
    })
}

function logout(req,res,next){

}