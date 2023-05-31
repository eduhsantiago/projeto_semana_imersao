const express = require('express');
const cors = require('cors');
const app = express();

const home = require('./models/home');
const mensagem = require('./models/mensagem');


app.use(express.json());


app.use((req, res, next) => {
    res.header('Access-Control-allow-Origin', "*"); 
    res.header('Access-Control-allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-allow-Headers', 'X-PINGOTHER, Content-Type, Authorization');
    app.use(cors());
    next();
})



app.get('/',  async (req, res) => { 
    await home.findOne()
    .then((datahome) =>  {
        return res.json({
            error: false,
            datahome
        })
    }).catch(() => {
        return res.status(404).json({
            error: true,
            mensagem: 'erro: nenhum registro encontrado para a pag home'
        });
    })
});

app.post('/cadastrar', async (req, res) => {

    /*await sleep(3000);

    function sleep(ms){
        return new Promise((resolve, reject) => {
        
        })
    }*/

   await home.create(req.body)
    .then(() => {
        return res.json({
            erro: false,
            mensagem : 'dados para a pagina home cad com sucesso'
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: 'erro: dados para a pagina home nao cad com sucesso'
        });
    });
})
app.post('/cadastrar-mensagem', async (req, res) => {
    await mensagem.create(req.body)
    .then(() => {
        return res.json({
            erro: false,
            mensagem : 'contato feito com sucesso'
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: 'erro: não foi possivel efetuar seu contato conosco'
        });
    });
})

app.listen(8080, () => {
    console.log("servidor iniciado na porta 8080")    
});