var criarEmprestimo = () =>{
    document.getElementById("mensagem").children[0].innerHTML = "";
    var credor = document.getElementById("nomeCredor").value;
    var devedor = document.getElementById("nomeDevedor").value;
    var senhaDevedor = document.getElementById("senhaDevedor").value;
    var valor = document.getElementById("valor").value;
    
    if(credor != "" && devedor != "" && senhaDevedor != "" && valor != ""){
        var header = new Headers();
        var requestOptions = {
            header: header,
            method: 'POST',
            redirect: 'follow',
            mode: 'cors'
        };
    
        fetch(`sistema/criarEmprestimo/${valor}/${devedor}/${senhaDevedor}/${credor}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);

            result.mensagem.forEach(msg =>{
                criarMensagemErro(msg, result.status)

            })
            if(result.mensagem.length == 0){
                criarMensagemErro("Sucesso ao Cadastrar o empréstimo", result.status)
            }
        })
        .catch(error => console.log('error', error));
    }else{
        criarMensagemErro("Todos os campos precisam estar preenchidos", "erro");
        
    }

    
}


var criarMensagemErro = (texto, status) => {
    let msgElement = document.getElementById("mensagem");
    msgElement.classList.remove("sucesso")
    msgElement.classList.remove("erro")
    msgElement.classList.add(status == "success" ? "sucesso" : "erro");
    let element = document.createElement("li");
    element.innerText = texto;
    msgElement.children[0].appendChild(element);
}
document.getElementById("criarEmprestimo").addEventListener("click", criarEmprestimo)