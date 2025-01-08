const express = require('express'); 
const usersController =  require('./controllers/usersController');

const router = express.Router();

// Rota básica de teste para verificar se o servidor está funcionando
router.get("/", (req, res) => {
    return res.json("hello world");
});

router.get('/usuarios', usersController.getAll);

router.get('/estagiarios', usersController.getEstagiarios);

router.get('/administradores', usersController.getAdministradores);

router.get('/lideres', usersController.getLideres);

router.get('/comuns', usersController.getComuns);

module.exports = router;