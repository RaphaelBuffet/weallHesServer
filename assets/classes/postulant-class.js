let db, config
module.exports = (_db, _config)=>{
    db=_db
    config=_config
    return Postulant
}
let Postulant =class {
    static getById(id){

        return new Promise((next) => {
            db.query('Select * from postulant WHERE id= ?',[id])
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

}