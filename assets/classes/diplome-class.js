let db, config
module.exports = (_db, _config)=>{
    db=_db
    config=_config
    return Diplome
}
let Diplome =class {
    static getById(id){

        return new Promise((next) => {
            db.query('Select * from diplome WHERE id= ?',[id])
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

                db.query('Select * from diplome')
                    .then((result) => next(result))
                    .catch((err) => next(err))

        })

    }


}