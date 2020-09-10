const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NotFound = require('./errors/NotFound')
const FieldInvalid = require('./errors/FieldInvalid')
const DataNotProvided = require('./errors/DataNotProvided')
const UnsupportedType = require('./errors/UnsupportedType')
const typesAccepted = require('./Serializer').typesAccepted
const SerializerError = require('./Serializer').SerializerError

app.use(bodyParser.json())
app.use((request, response, next) => {
    let typeRequest = request.header('Accept')
    
    if(typeRequest === '*/*')
        typeRequest = 'application/json'

    if(typesAccepted.indexOf(typeRequest) === -1){
        response.status(406)
        response.end()
        return
    }

    response.setHeader('Content-Type', typeRequest)
    next()

})

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
    
    const serializer = new SerializerError(
        response.getHeader('Content-Type')
    )
    response.status(status)       
    response.send(serializer.serialize({
        message: error.message,
        id: error.id
    }))
})

app.listen(config.get('api.port'), () => console.log('API funcionando'))