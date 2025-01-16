const usersModel = require('../models/usersModel');
const cloudinary = require('cloudinary').v2;

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

// Função para fazer o upload no Cloudinary
const uploadToCloudinary = (fileBuffer, fileName) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder: 'profile_pictures', // Pasta no Cloudinary
                public_id: fileName,
            },
            (error, result) => {
                if (error) {
                    reject(new Error('Erro ao fazer upload para o Cloudinary: ' + error.message));
                } else {
                    resolve(result); // Resolve a Promise com o resultado
                }
            }
        ).end(fileBuffer); // Envia o buffer diretamente
    });
};

// Controlador para atualizar a foto de perfil
const updateUserPicture = async (req, res) => {
    try {
        const { idUsuario } = req.params;
        const file = req.file; // Arquivo processado pelo multer-storage-cloudinary

        if (!file) {
            return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
        }

        const caminhoFotoPerfil = file.path; // URL segura da imagem (retorno do multer-storage-cloudinary)

        // Atualiza o caminho da foto no banco de dados
        await usersModel.updateUserPicture(idUsuario, caminhoFotoPerfil);

        res.status(200).json({
            message: 'Foto de perfil atualizada com sucesso!',
            caminhoFotoPerfil,
        });
    } catch (error) {
        console.error('Erro ao atualizar foto de perfil:', error);
        res.status(500).json({ error: 'Erro ao atualizar foto de perfil.' });
    }
};

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