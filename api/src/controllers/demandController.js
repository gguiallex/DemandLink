const demandModel = require('../models/demandModel');
const sectorModel = require('../models/sectorModel')

// retorna todas as demandas
const getAllDemands = async (req, res) => {
    const demands = await demandModel.getAllDemands();
    return res.status(200).json(demands);
}

// retorna uma demanda expecífica atravez de sua tag
const getDemand = async (req, res) => {
    const {tagDemanda} = req.params;
    const demand = await demandModel.getDemand(tagDemanda);
    return res.status(200).json(demand);
}

// adiciona nova demanda
const addDemand = async (req, res) => {
    const newDemand = await demandModel.addDemand(req.body);
    console.log(newDemand);
    return res.status(200).json(newDemand);
}

// apaga uma demanda
const removeDemand = async (req, res) => {
    const {tagDemanda} = req.params;

    await demandModel.removeDemand(tagDemanda);
    return res.status(204).json({message: 'Demanda apagada com sucesso!'});
}

// remove um usuário da demanda
const removeUserDemand = async (req, res) => {
    const {tagDemanda, idUsuario} = req.params;

    await demandModel.removeUserDemand(tagDemanda, idUsuario);
    return res.status(204).json({message: 'Usuario removido da demanda com sucesso!'});
}

const editDemand = async (req, res) => {
    const {tagDemanda} = req.params;

    const editedDemand = await demandModel.editDemand(tagDemanda, req.body);
    return res.status(200).json(editedDemand);
}

const startDemand = async (req, res) => {
    const {tagDemanda} = req.params;

    const editedDemand = await demandModel.startDemand(tagDemanda);
    return res.status(200).json(editedDemand);
}

const endDemand = async (req, res) => {
    const {tagDemanda} = req.params;

    const editedDemand = await demandModel.endDemand(tagDemanda);
    return res.status(200).json(editedDemand);
}

// retorna todos os usuários de todas as demandas
const getAllDemandUsers = async (req, res) => {
    const demandUsers = await demandModel.getAllDemandUsers();
    return res.status(200).json(demandUsers);
}

// retorna todas as Demandas do criador das demandas
const getAllDemandsCreated = async (req, res) => {
    const {idUsuario} = req.params;
    const demandsCreated = await demandModel.getAllDemandsCreated(idUsuario);
    return res.status(200).json(demandsCreated);
}

// retorna todas as demandas de um usuário
const getDemandUser = async (req, res) => {
    const {idUsuario} = req.params;
    const demandsUser = await demandModel.getDemandUser(idUsuario);
    return res.status(200).json(demandsUser);
}

// retorna todos os usuários de uma demanda
const getUsersDemand = async (req, res) => {
    const {tagDemanda} = req.params;
    const usersDemand = await demandModel.getUsersDemand(tagDemanda);
    return res.status(200).json(usersDemand);
}

// adiciona os usuários na demanda criada
const addDemandUsers = async (req, res) => {
    await demandModel.addDemandUsers(req.body);
    return res.status(204).json({message: 'Usuário(s) registrado(s) com sucesso na demanda!'})
}

const getDemandUrgency = async (req, res) => {
    const {idUsuario} = req.params;
    const demands = await demandModel.getDemandUrgency(idUsuario);
    return res.status(200).json(demands);
}

const getDemandByStatus = async (req, res) => {
    const {status} = req.params
    const demands = await demandModel.getDemandByStatus(status);
    return res.status(200).json(demands);
}

const getDemandByWeek = async (req, res) => {
    try {
        const { idUsuario, dom, sab } = req.params;

        // Obtém as demandas no intervalo de datas fornecido
        const demands = await demandModel.getDemandByWeek(idUsuario, dom, sab);

        return res.status(200).json({
            success: true,
            data: demands,
            message: `Demandas do usuário ${idUsuario} entre ${dom} e ${sab}`,
        });
    } catch (error) {
        console.error('Erro ao buscar demandas da semana:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro ao buscar demandas da semana',
        });
    }
};



const getDemandByMonth = async (req, res) => {
    try {
        const {mes, idUsuario} = req.params;
        const demands = await demandModel.getDemandByMonth(mes, idUsuario);
        return res.status(200).json({
            success: true,
            data: demands,
            message: `Demandas do usuário no mês ${mes}`,
        });
    } catch (error) {
        console.error('Erro ao buscar demandas desse mês:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro ao buscar demandas desse mês',
        });
    }
}


module.exports = {
    getAllDemands,
    getDemand,
    addDemand,
    removeDemand,
    removeUserDemand,
    getAllDemandUsers,
    getAllDemandsCreated,
    getDemandUser,
    getUsersDemand,
    addDemandUsers,
    editDemand,
    startDemand,
    endDemand
    getDemandUrgency,
    getDemandByStatus,
    getDemandByWeek,
    getDemandByMonth,
};