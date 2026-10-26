const Cliente = require('../models/Cliente')
const { criptografar, descriptografar } = require('../utils/crypto')

const cadastrar = async (req, res) => {
    const valores = req.body
    try {
        if (!valores.nome || !valores.email || !valores.senha || !valores.cpf || !valores.telefone) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
        }

        await Cliente.create({
            nome: valores.nome,
            email: valores.email,
            senha: criptografar(valores.senha),
            cpf: criptografar(valores.cpf),
            telefone: valores.telefone
        })
        return res.status(201).json({ message: 'Cliente cadastrado com sucesso!' })
    } catch (err) {
        console.error('Erro ao cadastrar cliente!', err)
        return res.status(500).json({ message: 'Erro ao cadastrar cliente!' })
    }
}

const listar = async (req, res) => {
    try {
        const clientes = await Cliente.findAll()
        const dados = clientes.map(cliente => ({
            codCliente: cliente.codCliente,
            nome: cliente.nome,
            email: cliente.email,
            cpf: descriptografar(cliente.cpf),
            telefone: cliente.telefone
        }))
        return res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar clientes!', err)
        return res.status(500).json({ message: 'Erro ao listar clientes!' })
    }
}

const consultar = async (req, res) => {
    const id = req.params.id
    try {
        const cliente = await Cliente.findByPk(id)
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado!' })
        }
        return res.status(200).json({
            codCliente: cliente.codCliente,
            nome: cliente.nome,
            email: cliente.email,
            cpf: descriptografar(cliente.cpf),
            telefone: cliente.telefone
        })
    } catch (err) {
        console.error('Erro ao consultar cliente!', err)
        return res.status(500).json({ message: 'Erro ao consultar cliente!' })
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body
    try {
        const cliente = await Cliente.findByPk(id)
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente inexistente!' })
        }

        const dadosAtualizados = {
            nome: valores.nome,
            email: valores.email,
            telefone: valores.telefone
        }
        // Só recriptografa senha e CPF se vierem no corpo da requisição
        if (valores.senha) dadosAtualizados.senha = criptografar(valores.senha)
        if (valores.cpf) dadosAtualizados.cpf = criptografar(valores.cpf)

        await Cliente.update(dadosAtualizados, { where: { codCliente: id } })
        return res.status(200).json({ message: 'Cliente atualizado com sucesso!' })
    } catch (err) {
        console.error('Erro ao atualizar cliente!', err)
        return res.status(500).json({ message: 'Erro ao atualizar cliente!' })
    }
}

const deletar = async (req, res) => {
    const id = req.params.id
    try {
        const cliente = await Cliente.findByPk(id)
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente inexistente!' })
        }
        await Cliente.destroy({ where: { codCliente: id } })
        return res.status(200).json({ message: 'Cliente deletado com sucesso!' })
    } catch (err) {
        console.error('Erro ao deletar cliente!', err)
        return res.status(500).json({ message: 'Erro ao deletar cliente!' })
    }
}

module.exports = { cadastrar, listar, consultar, atualizar, deletar }
