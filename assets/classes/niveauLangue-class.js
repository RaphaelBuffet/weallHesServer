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
                        next(new Error(config.errors.wrongID))
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
    static update(id,idPostulant,idLangue,idNiveau){
        return new Promise((next)=>{

                db.query('Select * from languepostulant WHERE id = ?',[id])
                    .then((result)=>{
                        if (result[0]!=undefined) {
                            return db.query('Update languepostulant Set idPostulant=?,idLangue=?,idNiveau=? where id=?', [idPostulant,idLangue,idNiveau, id])
                        } else{
                            next(new Error(config.errors.wrongID))
                        }
                    })
                    .then(()=>{
                        next(true)
                    })
                    .catch((err) => next(err))

        })
    }
    static delete(id){
        return new Promise((next)=>{

            db.query('Select * from languepostulant WHERE id= ?',[id])
                .then((result)=>{

                    if (result[0]!=undefined) {
                        return db.query('Delete from languepostulant where id=?', [id])
                    }
                    else{
                        next(new Error(config.errors.wrongID))
                    }
                })
                .then(()=>{
                    next(true)
                })
                .catch((err) => next(err))
        })
    }

}