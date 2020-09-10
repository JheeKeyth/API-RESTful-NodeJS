const UnsupportedType = require('./errors/UnsupportedType')

class Serializer {
    json(data){
        return JSON.stringify(data)
    }

    serialize(data){
        if(this.contentType === 'application/json')
            return this.json(this.filter(data))

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
    constructor(contentType){
        super()
        this.contentType = contentType
        this.fieldsPublic = ['id', 'username', 'type']
    }
}

module.exports = {
    Serializer: Serializer,
    SerializerUser: SerializerUser,
    typesAccepted: [
        'application/json'
    ]
}