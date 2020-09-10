const router = require('express').Router()
const UserTable = require('./UserTable')

router.use('/', async (request, response) => {
    const users = await UserTable.list()
    response.send(JSON.stringify(users))
})

module.exports = router