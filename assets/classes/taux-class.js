let db, config
module.exports = (_db, _config)=>{
    db=_db
    config=_config
    return TauxActivite
}
let TauxActivite =class {
    static getById(id){

        return new Promise((next) => {
            db.query('Select * from taux WHERE id= ?',[id])
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
    static getAll(){
        return new Promise((next) => {

                db.query('Select * from taux')
                    .then((result) => next(result))
                    .catch((err) => next(err))

        })

    }

}