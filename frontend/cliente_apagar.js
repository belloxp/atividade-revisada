const btn_apagar = document.getElementById('btn_apagar')
const resposta = document.getElementById('resposta')

btn_apagar.addEventListener('click', (e) => {
    e.preventDefault()
    resposta.innerHTML = ``

    const id = document.getElementById('id').value

    fetch(`http://localhost:3000/cliente/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = `<p>${dados.message}</p>`
        document.querySelector('form').reset()
    })
    .catch(err => {
        console.error('Erro ao apagar cliente:', err)
        resposta.innerHTML = '<p>Erro ao conectar com o servidor.</p>'
    })
})
