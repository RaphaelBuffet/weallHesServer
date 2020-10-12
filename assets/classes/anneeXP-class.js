let db, config
module.exports = (_db, _config)=>{
    db=_db
    config=_config
    return AnneeXP
}
let AnneeXP =class {
    static getById(id){
        return new Promise((next) => {
            db.query('Select * from anneeexperience WHERE id= ?',[id])
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
    static getAll(max){
        return new Promise((next) => {
            if(max !=undefined && max >0) {
                db.query('Select * from anneeexperience Limit 0, ?', [parseInt(max)])
                    .then((result) => next(result))
                    .catch((err) => next(err))
            }else if(max !=undefined) {
                next(new Error(config.errors.wrongMaxValue))

            }
            else {
                db.query('Select * from anneeexperience')
                    .then((result) => next(result))
                    .catch((err) => next(err))
            }
        })

    }

}