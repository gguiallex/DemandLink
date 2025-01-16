const demandModel = require('../models/demandModel');

// retorna todas as demandas
const getAllDemands = async (req, res) => {
    const demands = await demandModel.getAllDemands();
    return res.status(200).json(demands);
}

// retorna uma demanda expecífica atravez de sua tag
const getDemand = async (req, res) => {
    const {tagDemanda} = req.params;
    const demand = await sectorModel.getSector(tagDemanda);
    return res.status(200).json(demand);
}

// adiciona nova demanda
const addDemand = async (req, res) => {
    const newDemand = await demandModel.addDemand(req.body);
    console.log(newDemand);
    return res.status(200).json(newDemand);
}

// retorna todos os usuários de todas as demandas
const getAllDemandUsers = async (req, res) => {
    const demandUsers = await demandModel.getAllDemandUsers();
    return res.status(200).json(demandUsers);
}

// retorna todas as Demandas do criador das demandas
const getAllDemandsCreated = async (req, res) => {
    const demandsCreated = await demandModel.getAllDemandsCreated();
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

module.exports = {
    getAllDemands,
    getDemand,
    addDemand,
    getAllDemandUsers,
    getAllDemandsCreated,
    getDemandUser,
    getUsersDemand,
    addDemandUsers,
};