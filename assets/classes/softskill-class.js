module.exports = Softskill =class {
    static getById(id){

        return new Promise((next) => {
            db.query('Select * from softskill WHERE id= ?',[id])
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

                db.query('Select * from softskill')
                    .then((result) => next(result))
                    .catch((err) => next(err))

        })

    }

}