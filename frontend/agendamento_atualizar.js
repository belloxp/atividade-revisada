const btn_atualizar = document.getElementById('btn_atualizar')
const resposta = document.getElementById('resposta')

btn_atualizar.addEventListener('click', (e) => {
    e.preventDefault()
    resposta.innerHTML = ``

    const id = document.getElementById('id').value

    const valores = {
        data: document.getElementById('data').value,
        hora: document.getElementById('hora').value,
        codCliente: document.getElementById('codCliente').value,
        codConsole: document.getElementById('codConsole').value
    }

    fetch(`http://localhost:3000/agendamento/${id}`, {
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
        console.error('Erro ao atualizar agendamento:', err)
        resposta.innerHTML = '<p>Erro ao conectar com o servidor.</p>'
    })
})
