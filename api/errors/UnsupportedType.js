class UnsupportedType extends Error {
    constructor(contentType){
        super (`Content Type ${contentType}, is not supported.`)
        this.name = 'UnsupportedType'
        this.id = 3
    }
}

module.exports = UnsupportedType