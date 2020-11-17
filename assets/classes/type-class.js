let db, config
module.exports = (_db, _config)=>{
    db=_db
    config=_config
    return Type
}
let Type =class {
    static getById(id){

        return new Promise((next) => {
            db.query('Select * from type WHERE id= ?',[id])
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

                db.query('Select * from type')
                    .then((result) => next(result))
                    .catch((err) => next(err))

        })

    }

}