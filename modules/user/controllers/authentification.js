const jwt = require('jsonwebtoken');
module.exports = {
    login,
    logout
}

function login(req,res,next){
    const email = req.body.email;
    const password = req.body.password;
    const sqlQuery = 'SELECT * FROM `user` WHERE e_mail = ? AND mot_de_passe = ?'
    db.query(sqlQuery,[email, password], (err,result) => {
        if(err || !result || !result[0]) {
            console.log(err);
            console.log(result);
            console.log(result[0]);

            res.status(401).json({message: 'utilisateur introuvable'});
            return;
        }
        console.log("env value")
        console.log(process.env.SECRET_TOKEN_GENERATOR);
        const token = jwt.sign(
            {userId: result[0].id_user},
            process.env.SECRET_TOKEN_GENERATOR,
            { expiresIn:'7d'}
        );
        res.status(200).json({
            userId:result[0].id_user,
            token: token
        });
    })
}

function logout(req,res,next){

}