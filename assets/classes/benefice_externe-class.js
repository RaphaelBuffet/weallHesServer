module.exports = Benefice = class {
    static getById(id){

        return new Promise((next) => {
            db.query('Select * from benefice_externe WHERE id= ?',[id])
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
                db.query('Select * from benefice_externe')
                    .then((result) => next(result))
                    .catch((err) => next(err))
        })

    }

}