const usersModel = require('../models/usersModel');

const getAll = async (req, res) => {
    const users = await usersModel.getAll();
    return res.status(200).json(users);
}

const getUser = async (req, res) => {
    const {idUsuario} = req.params;

    const user = await usersModel.getUser(idUsuario);
    return res.status(200).json(user);
}

const getUsersType = async (req, res) => {
    const {tipo} = req.params;

    const users = await usersModel.getUsersType(tipo);
    return res.status(200).json(users);
}

const addUser = async (req, res) => {
    await usersModel.addUser(req.body);
    return res.status(204).json({message: 'Usuário criado com sucesso'});
}

const removeUser = async (req, res) => { 
    const {idUsuario} = req.params;

    await usersModel.removeUser(idUsuario);
    return res.status(204).json({message: 'Usuário apagado com sucesso'});
}

const editUser = async (req, res) => {
    const {idUsuario} = req.params;

    const editedUser = await usersModel.editUser(idUsuario, req.body);
    return res.status(200).json(editedUser);
}

module.exports = {
    getAll,
    getUser,
    getUsersType,
    addUser,
    removeUser,
    editUser,
}