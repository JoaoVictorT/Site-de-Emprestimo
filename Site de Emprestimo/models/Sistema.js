const Usuario = require("./Usuario")
const Emprestimo = require("./Emprestimo")
const fs = require("fs"); 
const path = require("path");
const caminhoDatabase = path.resolve(__dirname, "../database/database.json")
const caminhoUserDB = path.resolve(__dirname, "../database/user.json")
const dadosLidos = fs.readFileSync(caminhoDatabase);
const usuariosLidos = fs.readFileSync(caminhoUserDB);
const db = JSON.parse(dadosLidos);
const dbUser = JSON.parse(usuariosLidos);

class Sistema{


    emprestimos = []
    taxaJuro
    taxaMulta30Dias
    usuarios = []

    constructor(){

        this.emprestimos = db.map((emprestimo)=>{
            return new Emprestimo(emprestimo.id,emprestimo.data, emprestimo.valor, 
                new Usuario(emprestimo.devedor.nome,emprestimo.devedor.senha),new Usuario(emprestimo.credor.nome,emprestimo.credor.senha))
        })
        this.carregarUsuarios();

     
    }

    obterEmprestimoEntre(nomeCredor,nomeDevedor){ 
        
        const emprestimosRetornados = this.emprestimos.map((emprestimo)=>{
            console.log(`${emprestimo.credor.nome} ${emprestimo.devedor.nome}`)
            if(emprestimo.credor.nome == nomeCredor && emprestimo.devedor.nome == nomeDevedor){
                
                return {
                    data: emprestimo.data,
                    value: emprestimo.valor,
                    newValue: emprestimo.obterValorCorrigido(this.taxaJuro, this.taxaMulta30Dias),
                    id: emprestimo.id
                };
            }
        }).filter(curr => !!curr)
        
        return emprestimosRetornados 
    }

    carregarUsuarios(){
        this.usuarios = dbUser.map((usuario)=>{
            return new Usuario(usuario.nome, usuario.senha)
        })
    }

    quitarEmprestimo(id,senhaCredor){

        this.emprestimos.map((emprestimo,index)=>{

            if(emprestimo.id == id && emprestimo.credor.senha == senhaCredor){

                this.emprestimos.splice(index,1)
             
            }
        })
     

        this.atualizarBanco();
       
    

        
    }

        informaTaxaJuro(taxa){
        this.taxaJuro = taxa
    }

    informaTaxaMulta(taxa){
        this.taxaMulta30Dias = taxa
    }


    criarEmprestimo(credor, devedor, senhaDevedor, valorEmprestimo){

        let emprestimo = new Emprestimo(null, Date.now(), valorEmprestimo, new Usuario(devedor, senhaDevedor), new Usuario(credor, ""))
        emprestimo.id = this.emprestimos[this.emprestimos.length -1].id +1;
        let msg = [];
        let quantidadeEmprestimos = this.emprestimos.length;
        let devedorValidado = false;
        let credorValidado = false;
        this.usuarios.forEach(usuario =>{
            if(usuario.nome == emprestimo.devedor.nome){
                if(usuario.senha == emprestimo.devedor.senha){
                    devedorValidado = true;
                }else{
                    msg.push("Senha inválida do devedor");
                }
            }
            if(usuario.nome == emprestimo.credor.nome){
                emprestimo.credor = usuario;
                credorValidado = true;
            }
        })

        if(devedorValidado && credorValidado){
            this.emprestimos.push(emprestimo);
            this.atualizarBanco();
        }

        !devedorValidado ? ( msg.length == 0 ?  msg.push("Devedor não encontrado") : msg.push("Devedor inválido")) : "";
        !credorValidado ? msg.push("Credor não encontrado") : "";

        console.log(this.emprestimos);
        return msg;
    }

    atualizarBanco(){
        fs.writeFile(caminhoDatabase, JSON.stringify(this.emprestimos), err => {
            if (err) throw err; 
            
        });
    }
}

module.exports = Sistema