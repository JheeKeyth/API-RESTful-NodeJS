const model = require('./UsersModel')
const UsersModel = require('./UsersModel')

module.exports = {
    list(){
        return model.findAll()
    },

    insert(user){
        return model.create(user)
    },

    async getById(id){
        const user = await model.findOne({
            where: {id : id}
        })

        if(!user) 
            throw new Error('User not found.')
        return user
    },

    update(id, user){
        return model.update(
            user, {where: { id: id }})
    },

    delete(id){
       return model.destroy({where: {id: id}})
    }
}