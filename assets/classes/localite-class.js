module.exports = Localite =class {
    static getById(id){

        return new Promise((next) => {
            db.query('Select * from localite WHERE id= ?',[id])
                .then((result)=> {
                    if (result[0]!=undefined){
                        next(result)
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

                db.query('Select * from localite')
                    .then((result) => next(result))
                    .catch((err) => next(err))

        })

    }

}