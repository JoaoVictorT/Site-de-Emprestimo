const Usuario = require("./Usuario")

class Emprestimo {
    data
    valor
    devedor
    credor
    id 
    
    constructor(id,data,valor,devedor = new Usuario(),credor = new Usuario()) {
      this.id = id;
      this.data = new Date(data);
      this.valor = valor;
      this.devedor = devedor;
      this.credor = credor;
    }
    /**
     * @description Calcular o valor do emprestimo corrigido até a data atual, apolicando a taxa de juros diariamente e a taxa de juros a cada 30 dias 
     */
    obterValorCorrigido(taxaJuros, taxaMulta30dias){
        let hoje = new Date();
        const diferencaDias = Math.ceil(Math.abs(hoje - this.data)/ (1000 * 60 * 60 * 24)); 
        let jurosCalculadoDia = this.valor * taxaJuros * diferencaDias;
        jurosCalculadoDia += diferencaDias > 30  ? this.valor * taxaMulta30dias * (diferencaDias/30) : 0;
        return jurosCalculadoDia + this.valor;
    }

}

module.exports = Emprestimo