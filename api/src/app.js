const express = require('express'); // Importa o módulo Express para criar e configurar o servidor
const router = require('./router'); // Importa as rotas definidas no arquivo 'router.js'
const cors = require('cors'); // Importa o middleware CORS para permitir o acesso de diferentes origens
const path = require('path');

const app = express(); // Cria uma instância do Express

app.use(cors()); // Aplica o middleware CORS para habilitar o compartilhamento de recursos entre origens diferentes
app.use(express.json()); // Configura o Express para interpretar requisições com corpo no formato JSON
app.use(router);// Aplica as rotas definidas no arquivo 'router.js' ao aplicativo
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));

// Rota dinâmica para servir arquivos específicos com base no nome
router.get('/uploads/:folder/:idUser/:fileName', (req, res) => {
    const { folder, idUser, fileName } = req.params;
    const filePath = path.join(__dirname, 'uploads', folder, idUser, fileName); // Garantir que o caminho do arquivo esteja correto

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(404).send('Arquivo não encontrado.');
        }
    });
});

module.exports = app;