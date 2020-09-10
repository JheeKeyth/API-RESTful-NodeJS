const router = require('express').Router()
const UserTable = require('./UserTable')
const User = require('./User')

router.get('/', async (request, response) => {
    const users = await UserTable.list()
    response.send(JSON.stringify(users))
})

router.post('/', async (request, response) => {
    const data = request.body
    const user = new User(data)
    await user.create()
    response.send(JSON.stringify(user))
})

router.get('/:idUser', async (request, response) => {
    try {
        const id = request.params.idUser
        const user = new User({id: id})
        await user.get()
        response.send(JSON.stringify(user))
    } catch (error) {
        response.send(JSON.stringify({message: error.message}))
    }
})

router.put('/:idUser', async (request, response) => {
    try {
        const id = request.params.idUser
        const data = Object.assign({}, request.body, {id: id})
        const user = new User(data)
        await user.update()
        response.send(JSON.stringify({message: 'User was successfully updated.'}))
    } catch (error) {
        response.send(JSON.stringify({message: error.message}))
    }
})

module.exports = router