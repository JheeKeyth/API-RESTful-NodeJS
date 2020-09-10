const model = require('./UsersModel')

module.exports = {
    list(){
        return model.findAll()
    }
}