module.exports = Dispo = class {
    static getById(id){

        return new Promise((next) => {
            db.query('Select * from disponibilite WHERE id= ?',[id])
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

                db.query('Select * from disponibilite')
                    .then((result) => next(result))
                    .catch((err) => next(err))

        })

    }
    static add(year,month){
        return new Promise((next)=> {

            if (year != undefined && month!= undefined) {

                db.query('Select * from disponibilite where year= ? AND month= ?', [year,month])
                    .then((result) => {

                        if (result[0] != undefined) {
                            next(new Error(config.errors.dateAlreadyTaken))
                        } else {
                            return db.query('Insert into disponibilite(year,month) values (?)', [year,month])
                        }
                    })
                    .then(()=>{
                        return db.query('Select * from disponibilite where year= ? AND month= ?', [year,month])
                    })
                    .then((result)=> {
                        next({
                            id: result[0].id,
                            year: result[0].year,
                            month: result[0].month
                        })
                    })
                    .catch((err) => next(err))

            } else {
                next(new Error(config.errors.noValue))
            }

        })
    }

}