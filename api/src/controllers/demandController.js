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
    await usersModel.addDemand(req.body);
    return res.status(204).json({message: 'Demanda criada com sucesso'});
}

module.exports = {
    getAllDemands,
    getDemand,
    addDemand,
};