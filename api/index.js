const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')

app.use(bodyParser.json())

const router = require('./routes/users')
app.use('/api/users', router)

app.listen(config.get('api.port'), () => console.log('API funcionando'))