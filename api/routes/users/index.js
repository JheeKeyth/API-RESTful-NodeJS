const router = require('express').Router()
const UserTable = require('./UserTable')
const User = require('./User')
const SerializerUser = require('../../Serializer').SerializerUser

router.get('/', async (request, response) => {
    const users = await UserTable.list()
    response.status(200)
    const serializer = new SerializerUser(response.getHeader('Content-Type'))
    response.send(serializer.serialize(users))
})

router.post('/', async (request, response, next) => {
    try {
        const data = request.body
        const user = new User(data)
        await user.create()
        response.status(201)
        const serializer = new SerializerUser(response.getHeader('Content-Type'))
        response.send(serializer.serialize(user))  
    } catch (error) {
        next(error)
    }
})

router.get('/:idUser', async (request, response, next) => {
    try {
        const id = request.params.idUser
        const user = new User({id: id})
        await user.get()
        response.status(200)
        const serializer = new SerializerUser(
            response.getHeader('Content-Type'),
            ['email', 'createdAt', 'updatedAt']
        )
        response.send(serializer.serialize(user))
    } catch (error) {
        next(error)
    }
})

router.put('/:idUser', async (request, response, next) => {
    try {
        const id = request.params.idUser
        const data = Object.assign({}, request.body, {id: id})
        const user = new User(data)
        await user.update()
        response.status(204)
        //response.send(JSON.stringify({message: 'User was successfully updated.'}))
        response.end()
    } catch (error) {
        next(error)
    }
})

router.delete('/:idUser', async (request, response, next) => {
    try {
        const id = request.params.idUser
        const user = new User({id: id})
        await user.get()
        await user.delete()
        response.status(204)
        //response.send(JSON.stringify({message: 'User was successfully deleted.'}))
        response.end()
    } catch (error) {
        next(error) 
    }

})

module.exports = router