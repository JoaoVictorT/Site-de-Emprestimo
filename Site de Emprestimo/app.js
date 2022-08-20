const express = require("express")
const app = express()
const path = require("path")

const sistemaRouter = require("./routes/routeSistema")
const indexRouter = require("./routes/routeIndex")
const criarEmprestimoRouter = require("./routes/routeCriarEmprestimo")

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static(path.join(__dirname, "public")))
app.set("views", path.join(__dirname, "public"))
app.engine("html", require("ejs").renderFile)
app.set("view engine", "html")

app.use("/sistema", sistemaRouter)
app.use("/", indexRouter)
app.use("/CriarEmprestimo", criarEmprestimoRouter)




app.use((req,res,next) =>{
    const erro = new Error('Rota não encontrada');
    erro.status = 404;
    next(erro);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});



module.exports = app