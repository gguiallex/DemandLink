const express = require('express'); 
const upload = require('./middlewares/upload');
const usersController =  require('./controllers/usersController');
const sectorController = require('./controllers/sectorController');
const demandController = require('./controllers/demandController');
const authController = require('./controllers/authController');
const weekController = require('./controllers/weekController');

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
router.get('/usuarios/lider/:idUsuario', usersController.getUsersByLider); // exibir todos os usuários de um lider específico
router.get('/lideres/:tagSetor', usersController.getLidersBySector); // exibir todos os líderes de um setor específico
router.post('/usuario', usersController.addUser); // adicionar um novo usuário
router.put('/usuario/:idUsuario',usersController.editUser); // editar usuário expecífico
router.post('/:idUsuario/atualizarFotoPerfil', upload.single('profilePicture'), usersController.updateUserPicture); // upload da foto de perfil
router.delete('/usuario/:idUsuario', usersController.removeUser); // remover usuário expecífico

// ====================== SETORES ======================
router.get('/setores', sectorController.getAllSectors); // exibir todos os setores
router.get('/setor/:tagSetor', sectorController.getSector); // exibir setor específico
router.get('/setor/:tagSetor/quantidade', sectorController.getSizeSector); //exibir o total de pessoas do setor
router.post('/setor', sectorController.addSector); // adicionar novo setor
router.put('/setor/:tagSetor', sectorController.editSector)// editar um setor específico
router.delete('/setor/:tagSetor', sectorController.removeSector); // remover um setor

// ====================== DEMANDAS ======================
router.get('/demandas', demandController.getAllDemands); // exibir todas as demandas
router.get('/demanda/:tagDemanda', demandController.getDemand); // exibir demanda específica
router.get('/demandas/usuarios', demandController.getAllDemandUsers); // exibir todas as demandas e seus usuários
router.get('/demandas/usuario/:idUsuario', demandController.getDemandUser); // exibir todas as demandas de um usuário atribuído
router.get('/demandas/criador/:idUsuario', demandController.getAllDemandsCreated); // exibir todas as demandas criadas pelo usuário
router.get('/usuarios/demanda/:tagDemanda', demandController.getUsersDemand); // exibir todos os usuários de uma demanda específica
router.post('/demanda', demandController.addDemand); // adicionar uma nova demanda
router.post('/demanda/usuario', demandController.addDemandUsers); // adicionar usuário a uma demanda
router.delete('/demanda/:tagDemanda', demandController.removeDemand); //  apaga uma demanda
router.delete('/demanda/:tagDemanda/usuario/:idUsuario', demandController.removeUserDemand); // apaga um usuário da demanda
router.put('/demanda/:tagDemanda/editar', demandController.editDemand); // altera a demanda como finalizada
router.put('/demanda/:tagDemanda/finalizar', demandController.endDemand); // altera a demanda como finalizada
router.put('/demanda/:tagDemanda/comecar', demandController.startDemand); // altera a demanda para em andamento
router.get('/demandas/urgente/:idUsuario', demandController.getDemandUrgency);
router.get('/demandas/:status', demandController.getDemandByStatus);
router.get('/demandas/semana/:idUsuario/:dom/:sab', demandController.getDemandByWeek);
router.get('/demandas/mes/:mes/:idUsuario', demandController.getDemandByMonth);

// ================ Controle de semana =================
router.get('/calculoTempo', weekController.getWeek);

module.exports = router;