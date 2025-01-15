const demandModel = require('../models/demandModel');

const getAllDemands = async (req, res) => {
    const demands = await demandModel.getAllDemands();
    return res.status(200).json(demands);
}

const getDemand = async (req, res) => {
    const {tagDemanda} = req.params;
    const demand = await sectorModel.getSector(tagDemanda);
    return res.status(200).json(demand);
}

const addDemand = async (req, res) => {
    const newDemand = await usersModel.addDemand(req.body);
    return res.status(200).json(newDemand);
}

const getAllDemandUsers = async (req, res) => {
    const demandUsers = await demandModel.getDemandUsers();
    return res.status(200).json(demandUsers);
}

const getDemandUser = async (req, res) => {
    const {idUsuario} = req.params;
    const demandsUser = await demandModel.getDemandUser(idUsuario);
    return res.status(200).json(demandsUser);
}

const getUsersDemand = async (req, res) => {
    const {tagDemanda} = req.params;
    const usersDemand = await demandModel.getUsersDemand(tagDemanda);
    return res.status(200).json(usersDemand);
}

const addDemandUsers = async (req, res) => {
    await usersModel.addDemandUsers(req.body);
    return res.status(204).json({message: 'Usuário(s) registrado(s) com sucesso na demanda!'})
}

module.exports = {
    getAllDemands,
    getDemand,
    addDemand,
    getAllDemandUsers,
    getDemandUser,
    getUsersDemand,
    addDemandUsers,
};