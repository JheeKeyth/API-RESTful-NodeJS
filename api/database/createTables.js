const TableModel = require('../routes/users/UsersModel')

TableModel.sync()
    .then(() => console.log('Tabela criada com sucesso'))
    .catch(console.log)