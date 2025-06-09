const express = require ("express");
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended:true}));

const registros = [];

app.use(express.static(path.join(__dirname, 'structures')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'structures/form.html'));
});

app.post('/registrar', (req,res) => {
    console.log('Dados recebidos:', req.body);
    const{nome, email, telefone, idade, mensagem} = req.body;
    registros.push({nome, email, telefone, idade, mensagem});
    res.redirect('/lista');
});

app.get('/lista', (req, res) => {
    let html = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <title>Lista de Registros</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <div class="container">
          <h1>Dados Cadastrados</h1>
          <ul> `;

         registros.forEach(reg => {
           html += `<li>
            <strong>Nome:</strong> ${reg.nome}  <br/>
            <strong>Email:</strong> ${reg.email} <br/>
            <strong>Telefone:</strong> ${reg.telefone}  <br/>
            <strong>Idade:</strong> ${reg.idade} <br/>
            <em>Mensagem:</em> ${reg.mensagem}
           </li>`; 
           });
    
         html += `
          </ul>
          <a href="/">Voltar para o formulário</a>
          </div>
         </body>
        </html> 
         `;

      res.send(html);
});


const PORT= 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

