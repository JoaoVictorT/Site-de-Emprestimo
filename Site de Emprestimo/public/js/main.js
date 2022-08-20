var obterDados = () =>{
    var credor = document.getElementById("credor").value;
    var devedor = document.getElementById("devedor").value;

    var header = new Headers();
    var requestOptions = {
        header: header,
        method: 'GET',
        redirect: 'follow',
        mode: 'cors'
    };
  
    fetch(`sistema/obterEmprestimoEntre/${credor}/${devedor}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        document.getElementById("tabela").innerHTML ="";
        
        result.valores.forEach(valor => {
            let tr = document.createElement("tr");
            let radio = document.createElement("input")
            radio.type = "radio"
            radio.value = valor.id
            radio.name = "emprestimo"

            let selecao = document.createElement("td");
            let data = document.createElement("td");
            let valorOriginal = document.createElement("td");
            let valorCorrigido = document.createElement("td");
            data.innerText = valor.data
            valorOriginal.innerText = `R$ ${valor.valor}`
            valorCorrigido.innerText = `R$ ${valor.valorCorrigido}`

            selecao.appendChild(radio);
            tr.appendChild(selecao);
            tr.appendChild(data);
            tr.appendChild(valorOriginal);
            tr.appendChild(valorCorrigido);
            document.getElementById("tabela").appendChild(tr);
        });
        
    })
    .catch(error => console.log('error', error));
}

var quitarEmprestimo = () =>{
    var senha = document.getElementById("senha").value;
    var id = document.querySelector('input[name="emprestimo"]:checked').value;
    console.log(senha);
    console.log(id);

    var header = new Headers();
    var requestOptions = {
        header: header,
        method: 'DELETE',
        redirect: 'follow',
        mode: 'cors'
    };
  
    fetch(`sistema/quitarEmprestimo/${id}/${senha}`, requestOptions)
    .then(response => response.json())
    .then(result => {        
        console.log(result);        
    })
    .catch(error => console.log('error', error));
    obterDados();
}

document.getElementById("Pesquisar").addEventListener("click", obterDados)
document.getElementById("quitar").addEventListener("click", quitarEmprestimo)

