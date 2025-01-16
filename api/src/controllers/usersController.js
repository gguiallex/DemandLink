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
const uploadToCloudinary = async (fileBuffer, fileName) => {
    try {
        const result = await cloudinary.uploader.upload_stream(
            {
                folder: 'profile_pictures', // Pasta no Cloudinary
                public_id: fileName,
            },
            (error, result) => {
                if (error) {
                    throw new Error('Erro ao fazer upload para o Cloudinary: ' + error.message);
                }
                return result;
            }
        ).end(fileBuffer); // Envia o buffer diretamente
        return result.secure_url; // Retorna a URL da imagem
    } catch (error) {
        throw new Error('Erro ao fazer upload para o Cloudinary: ' + error.message);
    }
};

// Controlador para atualizar a foto de perfil
const updateUserPicture = async (req, res) => {
    try {
      const { idUsuario } = req.params;
      const file = req.file; // O arquivo enviado via multer
  
      if (!file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
      }
  
      const fileName = `${idUsuario}_${Date.now()}`; // Nome único com base no ID e data
      const caminhoFotoPerfil = await uploadToCloudinary(file.buffer, fileName);
  
      // Atualiza o caminho da foto no banco de dados
      await usersModel.updateUserPicture(idUsuario, caminhoFotoPerfil);
  
      res.status(200).json({ message: 'Foto de perfil atualizada com sucesso!', caminhoFotoPerfil });
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