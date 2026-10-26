const Cliente = require('./Cliente')
const Console = require('./Console')
const Agendamento = require('./Agendamento')

// Um cliente possui muitos consoles
Cliente.hasMany(Console, {
    foreignKey: 'codCliente',
    as: 'consolesCliente',
    onDelete: 'CASCADE'
})

Console.belongsTo(Cliente, {
    foreignKey: 'codCliente',
    as: 'clienteConsole',
    allowNull: false
})

// Um cliente possui muitos agendamentos
Cliente.hasMany(Agendamento, {
    foreignKey: 'codCliente',
    as: 'agendamentosCliente',
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Cliente, {
    foreignKey: 'codCliente',
    as: 'clienteAgendamento',
    allowNull: false
})

// Um console possui muitos agendamentos
Console.hasMany(Agendamento, {
    foreignKey: 'codConsole',
    as: 'agendamentosConsole',
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Console, {
    foreignKey: 'codConsole',
    as: 'consoleAgendamento',
    allowNull: false
})

module.exports = { Cliente, Console, Agendamento }
