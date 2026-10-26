const btn_atualizar = document.getElementById('btn_atualizar')
const resposta = document.getElementById('resposta')

btn_atualizar.addEventListener('click', (e) => {
    e.preventDefault()
    resposta.innerHTML = ``

    const id = document.getElementById('id').value

    const valores = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value
    }

    // Senha e CPF só são enviados se preenchidos (serão recriptografados no backend)
    const senha = document.getElementById('senha').value
    const cpf = document.getElementById('cpf').value
    if (senha) valores.senha = senha
    if (cpf) valores.cpf = cpf

    fetch(`http://localhost:3000/cliente/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = `<p>${dados.message}</p>`
    })
    .catch(err => {
        console.error('Erro ao atualizar cliente:', err)
        resposta.innerHTML = '<p>Erro ao conectar com o servidor.</p>'
    })
})
