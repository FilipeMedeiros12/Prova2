require('dotenv').config();


const app = require('./src/app');
// criar uma variável e adicionar a ela o arquivo app.js

// criar app.listen(porta)
app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
})