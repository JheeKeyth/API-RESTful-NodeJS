const router = require('express').Router()
const UserTable = require('./UserTable')
const User = require('./User')

router.get('/', async (request, response) => {
    const users = await UserTable.list()
    response.status(200)
    response.send(JSON.stringify(users))
})

router.post('/', async (request, response) => {
    try {
        const data = request.body
        const user = new User(data)
        await user.create()
        response.status(201)
        response.send(JSON.stringify(user))  
    } catch (error) {
        response.status(400)
        response.send(JSON.stringify({message: error.message}))
    }
})

router.get('/:idUser', async (request, response) => {
    try {
        const id = request.params.idUser
        const user = new User({id: id})
        await user.get()
        response.status(200)
        response.send(JSON.stringify(user))
    } catch (error) {
        response.status(404)
        response.send(JSON.stringify({message: error.message}))
    }
})

router.put('/:idUser', async (request, response) => {
    try {
        const id = request.params.idUser
        const data = Object.assign({}, request.body, {id: id})
        const user = new User(data)
        await user.update()
        response.status(204)
        //response.send(JSON.stringify({message: 'User was successfully updated.'}))
        response.end()
    } catch (error) {
        response.status(400)
        response.send(JSON.stringify({message: error.message}))
    }
})

router.delete('/:idUser', async (request, response) => {
    try {
        const id = request.params.idUser
        const user = new User({id: id})
        await user.get()
        await user.delete()
        response.status(204)
        //response.send(JSON.stringify({message: 'User was successfully deleted.'}))
        response.end()
    } catch (error) {
        response.status(404)
        response.send(JSON.stringify({message: error.message}))  
    }

})

module.exports = router