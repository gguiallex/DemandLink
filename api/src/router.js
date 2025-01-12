const express = require('express'); 
const usersController =  require('./controllers/usersController');
const sectorController = require('./controllers/sectorController');
const demandController = require('./controllers/demandController');
const authController = require('./controllers/authController');

const router = express.Router();

// Rota básica de teste para verificar se o servidor está funcionando
router.get("/", (req, res) => {
    return res.json("hello world");
});

router.post('/autenticar', authController.autenticar);

// ====================== USUÁRIOS ======================
router.get('/usuarios', usersController.getAll); // exibir todos os usuários
router.get('/usuario/:idUsuario', usersController.getUser); // exibir usuário expecífico
router.get('/usuarios/:tipo', usersController.getUsersByType); // exibir todos os usuários de um tipo expecífico
router.get('/usuarios/:tagSetor', usersController.getUsersBySector); // exibir todos os usuários de um tipo expecífico
router.post('/usuario', usersController.addUser); // adicionar um novo usuário
router.put('/usuario/:idUsuario',usersController.editUser); // editar usuário expecífico
router.delete('/usuario/:idUsuario', usersController.removeUser); // remover usuário expecífico

// ====================== SETORES ======================
router.get('/setores', sectorController.getAllSectors); // exibir todos os setores
router.get('/setor/:tagSetor', sectorController.getSector); // exibir setor específico

// ====================== DEMANDAS ======================
router.get('/demandas', demandController.getAllDemands); // exibir todas as demandas
router.get('/demanda/:tagDemanda', demandController.getDemand); // exibir demanda específica

module.exports = router;