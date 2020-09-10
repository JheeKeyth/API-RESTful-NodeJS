class DataNotProvided extends Error {
    constructor(){
        super ('Field(s) for update were not informed.')
        this.name = 'DataNotProvided'
        this.id = 2
    }
}

module.exports = DataNotProvided