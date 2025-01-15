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

const getUsersByType = async (req, res) => {
    const {tipo} = req.params;

    const users = await usersModel.getUsersByType(tipo);
    return res.status(200).json(users);
}

const getUsersBySector = async (req, res) => {
    const {tagSetor} = req.params;

    const users = await usersModel.getUsersBySector(tagSetor);
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

const updateUserPicture = async (req, res) => {
    try {
        const { idUsuario } = req.params;
        const caminhoFotoPerfil = `/uploads/profilePictures/${req.file.filename}`;

        await usersModel.updateUserPicture(idUsuario, caminhoFotoPerfil);

        res.status(200).json({message: 'Foto de perfil atualizada com sucesso!', caminhoFotoPerfil});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao fazer upload da foto de perfil.' });
    }
}

module.exports = {
    getAll,
    getUser,
    getUsersByType,
    getUsersBySector,
    addUser,
    removeUser,
    editUser,
    updateUserPicture,
}