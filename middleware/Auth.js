const jwt = require('jsonwebtoken');

function Auth(req,res,next){
    console.log("auth start")
    console.log(req.headers)
    console.log(req.headers['authorization']);
    if(!req.headers['authorization'])
        res.status(400).json({message : 'token invalide'});
    else{

        const token = req.headers['authorization'].split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_GENERATOR);
        req.userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            res.status(400).json({message : 'token invalide'})
        } else {
            next();
        }
    }
}

module.exports = {
    Auth
}