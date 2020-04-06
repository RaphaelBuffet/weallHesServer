let db, config
module.exports = (_db, _config)=>{
    db=_db
    config=_config
    return NiveauLangue
}
let NiveauLangue =class {
    static getByPostulant(id){

        return new Promise((next) => {
            db.query('Select * from languepostulant WHERE idPostulant= ?',[id])
                .then((result)=> {
                    if (result[0]!=undefined){
                        next(result[0])
                    }
                    else {
                        next(new Error('Wrong id'))
                    }
                })
                .catch((err) => next(err))

        })
    }
    static add(idPostulant,idLangue,idNiveau){
        return new Promise((next)=> {
            db.query('Insert into offre(idPostulant,idLangue,idNiveau) values (?)', [idPostulant,idLangue,idNiveau])
        })
    }

}