const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NotFound = require('./errors/NotFound')
const FieldInvalid = require('./errors/FieldInvalid')
const DataNotProvided = require('./errors/DataNotProvided')
const UnsupportedType = require('./errors/UnsupportedType')

app.use(bodyParser.json())

const router = require('./routes/users')
app.use('/api/users', router)

app.use((error, request, response, next) => {
    let status = 500

    if(error instanceof NotFound)
        status = 404    
    if(error instanceof FieldInvalid || error instanceof DataNotProvided) 
        status = 400
    if(error instanceof UnsupportedType)
        status = 406
        
    response.status(status)       
    response.send(JSON.stringify({
        message: error.message,
        id: error.id
    }))
})

app.listen(config.get('api.port'), () => console.log('API funcionando'))