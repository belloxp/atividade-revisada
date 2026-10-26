const btn_login = document.getElementById('btn_login')
const resposta = document.getElementById('resposta')

btn_login.addEventListener('click', (e) => {
    e.preventDefault()
    resposta.innerHTML = ``

    const valores = {
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value
    }

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then(dados => {
        if (dados.token) {
            localStorage.setItem('token', dados.token)
            localStorage.setItem('nome', dados.nome)
            localStorage.setItem('codCliente', dados.codCliente)
            window.location.href = './index.html'
        } else {
            resposta.innerHTML = `<p>${dados.message}</p>`
        }
    })
    .catch(err => {
        console.error('Erro ao realizar login:', err)
        resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>'
    })
})
