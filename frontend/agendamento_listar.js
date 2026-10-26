const resposta = document.getElementById('resposta')
const btn_listar = document.getElementById('btn_listar')

btn_listar.addEventListener('click', (e) => {
    e.preventDefault()
    resposta.innerHTML = ``

    fetch('http://localhost:3000/agendamentos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = `
            <table>
                ${criarThead()}
                ${criarTbody(dados)}
            </table>
        `
    })
    .catch((err) => {
        console.error('Erro ao listar os dados:', err)
        resposta.innerHTML = '<p>Erro ao conectar com o servidor.</p>'
    })
})

function criarThead() {
    return `
        <thead>
            <tr>
                <th>Código</th>
                <th>Data</th>
                <th>Horário</th>
                <th>Cód. Cliente</th>
                <th>Cód. Console</th>
            </tr>
        </thead>
    `
}

function criarTbody(dados) {
    let corpo = '<tbody>'
    dados.forEach(el => {
        corpo += `<tr>`
        corpo += `<td>${el.codAgendamento}</td>`
        corpo += `<td>${el.data}</td>`
        corpo += `<td>${el.hora}</td>`
        corpo += `<td>${el.codCliente}</td>`
        corpo += `<td>${el.codConsole}</td>`
        corpo += `</tr>`
    })
    corpo += `</tbody>`
    return corpo
}
