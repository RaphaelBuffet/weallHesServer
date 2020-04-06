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
                        next(new Error('Wrong id'))
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
                next(new Error('Wrong max value'))

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
                            next(new Error("name already taken"))
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
                next(new Error('no name value'))
            }

        })
    }

}