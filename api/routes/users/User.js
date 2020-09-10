const UserTable = require('./UserTable')

class User{
    constructor({id, username, email, type, createdAt, updatedAt}){
        this.id = id
        this.username = username
        this.email = email
        this.type = type
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    async create(){
        const result = await UserTable.insert({
            username: this.username,
            email: this.email,
            type: this.type
        })

        this.id = result.id
        this.createdAt = result.createdAt
        this.updatedAt = result.updatedAt
    }
    
    async get(){
        const user = await UserTable.getById(this.id)
        this.username = user.username
        this.email = user.email
        this.type = user.type
        this.createdAt = user.createdAt
        this.updatedAt = user.updatedAt
    }

    async update(){
        await UserTable.getById(this.id)
        const fields = ['username', 'email', 'type']
        const userUpdate = {}
        fields.forEach((field) => {
            const value = this[field]
            if(typeof value === 'string' && value.length > 0)
                userUpdate[field] = value
        })

        if(Object.keys(userUpdate).length === 0)
            throw new Error('Field(s) for update were not informed.')
            
        await UserTable.update(this.id, userUpdate)
    }


}

module.exports = User