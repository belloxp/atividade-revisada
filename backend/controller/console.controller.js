const Console = require('../models/Console')
const Cliente = require('../models/Cliente')
const { criptografar, descriptografar } = require('../utils/crypto')

const cadastrar = async (req, res) => {
    const valores = req.body
    try {
        if (!valores.modelo || !valores.marca || !valores.numeroSerie || !valores.tipoServico || !valores.codCliente) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
        }

        const cliente = await Cliente.findByPk(valores.codCliente)
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente inexistente!' })
        }

        await Console.create({
            modelo: valores.modelo,
            marca: valores.marca,
            numeroSerie: criptografar(valores.numeroSerie),
            tipoServico: valores.tipoServico,
            codCliente: valores.codCliente
        })
        return res.status(201).json({ message: 'Console cadastrado com sucesso!' })
    } catch (err) {
        console.error('Erro ao cadastrar console!', err)
        return res.status(500).json({ message: 'Erro ao cadastrar console!' })
    }
}

const listar = async (req, res) => {
    try {
        const consoles = await Console.findAll()
        const dados = consoles.map(consoleItem => ({
            codConsole: consoleItem.codConsole,
            modelo: consoleItem.modelo,
            marca: consoleItem.marca,
            numeroSerie: descriptografar(consoleItem.numeroSerie),
            tipoServico: consoleItem.tipoServico,
            codCliente: consoleItem.codCliente
        }))
        return res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar consoles!', err)
        return res.status(500).json({ message: 'Erro ao listar consoles!' })
    }
}

// Consulta por termo (número de série do console)
const consultar = async (req, res) => {
    const termo = req.params.termo
    try {
        const consoles = await Console.findAll()
        const encontrados = consoles
            .map(consoleItem => ({
                codConsole: consoleItem.codConsole,
                modelo: consoleItem.modelo,
                marca: consoleItem.marca,
                numeroSerie: descriptografar(consoleItem.numeroSerie),
                tipoServico: consoleItem.tipoServico,
                codCliente: consoleItem.codCliente
            }))
            .filter(consoleItem => consoleItem.numeroSerie.includes(termo))

        if (encontrados.length === 0) {
            return res.status(404).json({ message: 'Nenhum console encontrado com esse número de série!' })
        }
        return res.status(200).json(encontrados)
    } catch (err) {
        console.error('Erro ao consultar console!', err)
        return res.status(500).json({ message: 'Erro ao consultar console!' })
    }
}

module.exports = { cadastrar, listar, consultar }
