exports.success = function (result){
    return {
        status:'success',
        result:result
    }
}
exports.error = function (message){
    return{
        status:'error',
        message:message
    }
}

exports.isErr = (err)=> {
    return err instanceof  Error;
}
// ternaire après le '?' valeurs vrai, après ':' valeurs fausse (par rapport au test)
exports.checkAndChange = (obj) => {
    return this.isErr(obj)? this.error(obj.message): this.success(obj)
}