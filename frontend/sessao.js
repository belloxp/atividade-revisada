// Protege as páginas internas: se não houver token salvo, volta para o login.
const token = localStorage.getItem('token')
if (!token) {
    window.location.href = './login.html'
}

// Mostra o nome do cliente logado, se houver um elemento para isso na página
const nomeLogado = localStorage.getItem('nome')
document.addEventListener('DOMContentLoaded', () => {
    const elementoNome = document.getElementById('cliente_logado')
    if (elementoNome && nomeLogado) {
        elementoNome.innerHTML = `Cliente logado: <strong>${nomeLogado}</strong>`
    }
})

function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('nome')
    localStorage.removeItem('codCliente')
    window.location.href = './login.html'
}
