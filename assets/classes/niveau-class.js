let db, config
module.exports = (_db, _config)=>{
    db=_db
    config=_config
    return Niveau
}
let Niveau =class {
    static getById(id){

        return new Promise((next) => {
            db.query('Select * from niveau WHERE id= ?',[id])
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
    static getAll(max){
        return new Promise((next) => {
            if(max !=undefined && max >0) {
                db.query('Select * from niveau Limit 0, ?', [parseInt(max)])
                    .then((result) => next(result))
                    .catch((err) => next(err))
            }else if(max !=undefined) {
                next(new Error('Wrong max value'))

            }
            else {
                db.query('Select * from niveau')
                    .then((result) => next(result))
                    .catch((err) => next(err))
            }
        })

    }

}