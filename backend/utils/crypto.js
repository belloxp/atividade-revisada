const crypto = require('crypto')

// Criptografia simétrica AES-256-CBC usada para proteger dados sensíveis
// (CPF, senha e número de série do console), atendendo à LGPD.
const ALGORITMO = 'aes-256-cbc'
// Gera uma chave de 32 bytes (256 bits) a partir de uma frase secreta
const CHAVE_SECRETA = crypto.createHash('sha256').update('pixelfix_chave_secreta').digest()

function criptografar(texto) {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv(ALGORITMO, CHAVE_SECRETA, iv)
    let criptografado = cipher.update(String(texto), 'utf8', 'hex')
    criptografado += cipher.final('hex')
    // Guarda o IV junto com o texto cifrado para permitir a descriptografia
    return `${iv.toString('hex')}:${criptografado}`
}

function descriptografar(textoCriptografado) {
    const [ivHex, dados] = String(textoCriptografado).split(':')
    const iv = Buffer.from(ivHex, 'hex')
    const decipher = crypto.createDecipheriv(ALGORITMO, CHAVE_SECRETA, iv)
    let descriptografado = decipher.update(dados, 'hex', 'utf8')
    descriptografado += decipher.final('utf8')
    return descriptografado
}

module.exports = { criptografar, descriptografar }
