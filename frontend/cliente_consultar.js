const btn_consultar = document.getElementById('btn_consultar')
const resposta = document.getElementById('resposta')

btn_consultar.addEventListener('click', (e) => {
    e.preventDefault()
    resposta.innerHTML = ``

    const id = document.getElementById('id').value

    fetch(`http://localhost:3000/cliente/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    })
    .then(res => res.json())
    .then(dados => {
        if (dados.codCliente) {
            resposta.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>CPF</th>
                            <th>Telefone</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${dados.codCliente}</td>
                            <td>${dados.nome}</td>
                            <td>${dados.email}</td>
                            <td>${dados.cpf}</td>
                            <td>${dados.telefone}</td>
                        </tr>
                    </tbody>
                </table>
            `
        } else {
            resposta.innerHTML = `<p>${dados.message}</p>`
        }
    })
    .catch(err => {
        console.error('Erro ao consultar cliente:', err)
        resposta.innerHTML = '<p>Erro ao conectar com o servidor.</p>'
    })
})
