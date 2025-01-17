const sectorModel = require('../models/sectorModel');

const getAllSectors = async (req, res) => {
    const sectors = await sectorModel.getAllSectors();
    return res.status(200).json(sectors);
}

const getSector = async (req, res) => {
    const { tagSetor } = req.params;
    const sector = await sectorModel.getSector(tagSetor);
    return res.status(200).json(sector);
}

const addSector = async (req, res) => {
    const newSector = await sectorModel.addSector(req.body);
    console.log(newSector);
    return res.status(200).json(newSector);
}

const editSector = async (req, res) => {
    const { tagSetor } = req.params;

    const editedSector = await usersModel.editSector(tagSetor, req.body);
    return res.status(200).json(editedSector);
}

const removeSector = async (req, res) => {
    const { tagSetor } = req.params;

    await sectorModel.removeSector(tagSetor);
    return res.status(204).json({ message: 'Setor apagado com sucesso' });
}

module.exports = {
    getAllSectors,
    getSector,
    addSector,
    editSector,
    removeSector
};