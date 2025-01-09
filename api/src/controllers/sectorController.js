const sectorModel = require('../models/sectorModel');

const getAllSectors = async (req, res) => {
    const sectors = await sectorModel.getAllSectors();
    return res.status(200).json(sectors);
}

const getSector = async (req, res) => {
    const {tagSetor} = req.params;
    const sector = await sectorModel.getSector(tagSetor);
    return res.status(200).json(sector);
}

module.exports = {
    getAllSectors,
    getSector,
};