const UnsupportedType = require('./errors/UnsupportedType')
const jsontoxml = require('jsontoxml')

class Serializer {
    json(data){
        return JSON.stringify(data)
    }

    xml(data){
        let tag = this.tagSingular
        if(Array.isArray(data)){
            tag = this.tagPlural
            data = data.map((item) => {
                return {
                    [this.tagSingular]: item
                }
            })
        }
        return jsontoxml({ [tag]: data })
    }

    serialize(data){
        data = this.filter(data)

        if(this.contentType === 'application/json')
            return this.json(data)
        if(this.contentType === 'application/xml')
            return this.xml(data)

        throw new UnsupportedType(this.contentType)
    }
    
    filterObject(data){
        const object = {}
        this.fieldsPublic.forEach((field) => {
            if(data.hasOwnProperty(field))
                object[field] = data[field]
        })

        return object;
    }

    filter(data){
        if(Array.isArray(data)){
            data = data.map(item => {
                return this.filterObject(item)
             })
        } else
            data = this.filterObject(data)

        return data
    }

}
//Design Patterns: Template Method
class SerializerUser extends Serializer{
    constructor(contentType, extraFields){
        super()
        this.contentType = contentType
        this.fieldsPublic = ['id', 'username', 'type'].concat(extraFields || [])
        this.tagSingular = 'user'
        this.tagPlural = 'users'
    }
}

class SerializerError extends Serializer{
    constructor(contentType, extraFields){
        super()
        this.contentType = contentType
        this.fieldsPublic = ['id', 'message'].concat(extraFields || [])
        this.tagSingular = 'error'
        this.tagPlural = 'errors'
    }
}

module.exports = {
    Serializer: Serializer,
    SerializerUser: SerializerUser,
    SerializerError: SerializerError,
    typesAccepted: ['application/json', 'application/xml']
}