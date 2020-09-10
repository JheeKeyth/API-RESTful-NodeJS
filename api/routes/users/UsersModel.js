const Sequelize = require('sequelize')
const instance = require('../../database')

const columns = {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    type: {
        type: Sequelize.ENUM('admin', 'manager'),
        allowNull: false,
    }
}

const options = {
    freezeTableName: true,
    tableName: 'user',
    timestamps: true
}

module.exports = instance.define('user', columns, options)