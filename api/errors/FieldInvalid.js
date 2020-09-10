class FieldInvalid extends Error {
    constructor(field){
        super (`Field '${field}' is invalid.`)
        this.name = 'FieldInvalid'
        this.id = 1
    }
}

module.exports = FieldInvalid