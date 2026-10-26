const Agendamento = require('../models/Agendamento')
const Cliente = require('../models/Cliente')
const Console = require('../models/Console')

const cadastrar = async (req, res) => {
    const valores = req.body
    try {
        if (!valores.data || !valores.hora || !valores.codCliente || !valores.codConsole) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
        }

        const cliente = await Cliente.findByPk(valores.codCliente)
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente inexistente!' })
        }

        const consoleEncontrado = await Console.findByPk(valores.codConsole)
        if (!consoleEncontrado) {
            return res.status(404).json({ message: 'Console inexistente!' })
        }

        await Agendamento.create({
            data: valores.data,
            hora: valores.hora,
            codCliente: valores.codCliente,
            codConsole: valores.codConsole
        })
        return res.status(201).json({ message: 'Agendamento cadastrado com sucesso!' })
    } catch (err) {
        console.error('Erro ao cadastrar agendamento!', err)
        return res.status(500).json({ message: 'Erro ao cadastrar agendamento!' })
    }
}

// Listagem ordenada por data (e horário) agendada
const listar = async (req, res) => {
    try {
        const dados = await Agendamento.findAll({
            order: [['data', 'ASC'], ['hora', 'ASC']]
        })
        return res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar agendamentos!', err)
        return res.status(500).json({ message: 'Erro ao listar agendamentos!' })
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body
    try {
        const agendamento = await Agendamento.findByPk(id)
        if (!agendamento) {
            return res.status(404).json({ message: 'Agendamento inexistente!' })
        }

        await Agendamento.update({
            data: valores.data,
            hora: valores.hora,
            codCliente: valores.codCliente,
            codConsole: valores.codConsole
        }, { where: { codAgendamento: id } })
        return res.status(200).json({ message: 'Agendamento atualizado com sucesso!' })
    } catch (err) {
        console.error('Erro ao atualizar agendamento!', err)
        return res.status(500).json({ message: 'Erro ao atualizar agendamento!' })
    }
}

module.exports = { cadastrar, listar, atualizar }
