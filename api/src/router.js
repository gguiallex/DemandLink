const express = require('express'); 
const upload = require('./middlewares/upload');
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
router.get('/usuarios/setor/:tagSetor', usersController.getUsersBySector); // exibir todos os usuários de um setor expecífico
router.post('/usuario', usersController.addUser); // adicionar um novo usuário
router.put('/usuario/:idUsuario',usersController.editUser); // editar usuário expecífico
router.post('/:idUsuario/atualizarFotoPerfil', upload.single('profilePicture'), usersController.updateUserPicture); // upload da foto de perfil
router.delete('/usuario/:idUsuario', usersController.removeUser); // remover usuário expecífico

// ====================== SETORES ======================
router.get('/setores', sectorController.getAllSectors); // exibir todos os setores
router.get('/setor/:tagSetor', sectorController.getSector); // exibir setor específico

// ====================== DEMANDAS ======================
router.get('/demandas', demandController.getAllDemands); // exibir todas as demandas
router.get('/demanda/:tagDemanda', demandController.getDemand); // exibir demanda específica
router.get('/demandas/usuarios', demandController.getAllDemandUsers); // exibir todas as demandas e seus usuários
router.get('/demandas/:idUsuario', demandController.getDemandUser); // exibir todas as demandas de um usuário expecífico
router.get('/usuarios/demanda/:tagDemanda', demandController.getUsersDemand); // exibir todos os usuários de uma demanda específica
router.post('/demanda', demandController.addDemand); // adicionar uma nova demanda
router.post('/demanda/usuario', demandController.addDemandUsers); // adicionar usuário a uma demanda 

module.exports = router;