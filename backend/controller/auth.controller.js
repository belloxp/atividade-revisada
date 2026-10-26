const crypto = require('crypto')
const Cliente = require('../models/Cliente')
const { descriptografar } = require('../utils/crypto')

// Guarda as sessões ativas em memória: token -> { codCliente, nome, expiraEm }
const sessoes = {}
const TEMPO_EXPIRACAO = 90 * 60 * 1000 // 90 minutos em milissegundos

const login = async (req, res) => {
    const { email, senha } = req.body
    try {
        if (!email || !senha) {
            return res.status(400).json({ message: 'E-mail e senha são obrigatórios!' })
        }

        const cliente = await Cliente.findOne({ where: { email } })
        if (!cliente) {
            return res.status(401).json({ message: 'E-mail ou senha inválidos!' })
        }

        if (descriptografar(cliente.senha) !== senha) {
            return res.status(401).json({ message: 'E-mail ou senha inválidos!' })
        }

        const token = crypto.randomBytes(16).toString('hex')
        sessoes[token] = {
            codCliente: cliente.codCliente,
            nome: cliente.nome,
            expiraEm: Date.now() + TEMPO_EXPIRACAO
        }

        return res.status(200).json({
            message: 'Login realizado com sucesso!',
            token,
            nome: cliente.nome,
            codCliente: cliente.codCliente
        })
    } catch (err) {
        console.error('Erro ao realizar login!', err)
        return res.status(500).json({ message: 'Erro ao realizar login!' })
    }
}

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido!' })
    }

    const sessao = sessoes[token]
    if (!sessao) {
        return res.status(401).json({ message: 'Sessão inválida! Faça login novamente.' })
    }

    if (Date.now() > sessao.expiraEm) {
        delete sessoes[token]
        return res.status(401).json({ message: 'Sessão expirada! Faça login novamente.' })
    }

    req.cliente = sessao
    next()
}

module.exports = { login, authMiddleware }
