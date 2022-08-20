const Sistema = require("../models/Sistema")
const Emprestimo = require("../models/Emprestimo")
const Usuario = require("../models/Usuario")
const sistema = new Sistema()
sistema.informaTaxaJuro(0.03);
sistema.informaTaxaMulta(0.1);

exports.obterEmprestimoEntre = async (req,res)=>{
    const values = sistema.obterEmprestimoEntre(req.params.credor, req.params.devedor)
    if(values.length != 0){ 
        let allValues = values.map((curr)=>{
            return {"data": curr.data, "valor": curr.value, "valorCorrigido": curr.newValue,"id": curr.id}
        })
        return res.status(200).send({"valores": allValues})
    }

    return res.status(200).send({"mensagem": "Nenhum valor encontrado"})
    
}

exports.quitarEmprestimo = async (req,res)=>{
    sistema.quitarEmprestimo(req.params.id, req.params.senha)
    return res.status(200).send({"mensagem": "Item Excluido"})
}

exports.criarEmprestimo = async (req,res)=>{
    let retorno = sistema.criarEmprestimo(req.params.credor, req.params.devedor, req.params.senhaDevedor, req.params.valor);
    return res.status(200).send({"status": retorno.length == 0 ? "success" : "error", "mensagem": retorno})
}