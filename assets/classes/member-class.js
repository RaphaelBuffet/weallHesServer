let db, config
module.exports = (_db, _config)=>{
    db=_db
    config=_config
    return Members
}
let Members =class  {

    static getById(id){

        return new Promise((next) => {
            db.query('Select * from members WHERE id= ?',[id])
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
                db.query('Select * from members Limit 0, ?', [parseInt(max)])
                    .then((result) => next(result))
                    .catch((err) => next(err))
            }else if(max !=undefined) {
                next(new Error(config.errors.wrongMaxValue))

            }
            else {
                db.query('Select * from members')
                    .then((result) => next(result))
                    .catch((err) => next(err))
            }
        })

    }
    static add(name){
        return new Promise((next)=> {

            if (name != undefined && name.trim()!= '') {

                name=name.trim()

                db.query('Select * from members where name= ?', [name])
                    .then((result) => {

                        if (result[0] != undefined) {
                            next(new Error(nameAlreadyTaken))
                        } else {
                            return db.query('Insert into members(name) values (?)', [name])
                        }
                    })
                    .then(()=>{
                        return db.query('Select * from members where name = ?', [name])
                        })
                    .then((result)=> {
                        next({
                            id: result[0].id,
                            name: result[0].name
                        })
                    })
                    .catch((err) => next(err))

            } else {
                next(new Error(config.errors.noNameValue))
            }

        })
    }
    static update(id, name){
        return new Promise((next)=>{

            if (name != undefined && name.trim()!= '') {

                name=name.trim()

                db.query('Select * from members WHERE id = ?',[id])
                    .then((result)=>{
                        if (result[0]!=undefined) {
                            return db.query('Select * from members where name=? And id!=?', [name, id])
                        } else{
                            next(new Error(config.errors.wrongID))
                        }
                    })
                    .then((result)=>{
                            if (result[0] != undefined) {
                                next(new Error(config.errors.sameName))
                            } else {
                                return db.query('Update members Set name= ? where id=?', [name, id])
                            }
                        })
                    .then(()=>{
                        next(true)
                    })
                    .catch((err) => next(err))
            } else {
                next(new Error(config.errors.noNameValue))
            }
        })
    }
    static delete(id){
        return new Promise((next)=>{

            db.query('Select * from members WHERE id= ?',[id])
                .then((result)=>{

                    if (result[0]!=undefined) {
                        return db.query('Delete from members where id=?', [id])
                    }
                    else{
                        next(new Error(config.errors.wrongID))
                    }
                })
                .then(()=>{
                    next(true)
                })
                .catch((err) => next(err))
        })
    }

}