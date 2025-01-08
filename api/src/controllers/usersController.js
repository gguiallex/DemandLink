const usersModel = require('../models/usersModel');

// ====================== TODOS USUÁRIOS ======================

const getAll = async (req, res) => {
    const users = await usersModel.getAll();
    return res.status(200).json(users);
}

// ====================== ESTAGIÁRIOS ======================

const getEstagiarios = async (req, res) => {
    const estagiarios = await usersModel.getEstagiarios();
    return res.status(200).json(estagiarios);
}

// ====================== ADMINISTRADORES ======================

const getAdministradores = async (req, res) => {
    const administradores = await usersModel.getAdministradores();
    return res.status(200).json(administradores);
}

// ====================== LÍDERES ======================

const getLideres = async (req, res) => {
    const lideres = await usersModel.getLideres();
    return res.status(200).json(lideres);
}

// ====================== USUÁRIOS COMUNS ======================

const getComuns = async (req, res) => {
    const comuns = await usersModel.getComuns();
    return res.status(200).json(comuns);
}

module.exports = {
    getAll,
    getEstagiarios,
    getAdministradores,
    getLideres,
    getComuns,
}