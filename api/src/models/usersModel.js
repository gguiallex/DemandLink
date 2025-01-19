const connection = require('./connection');

const getAll = async () => {
    const [users] = await connection.execute(' SELECT * FROM Usuarios');
    return users;
}

const getUser = async (idUsuario) => {
    const [user] = await connection.execute('SELECT * FROM Usuarios where idUsuario = ?', [idUsuario]);
    return user;
}

const getUsersByType = async (tipo) => {
    const [users] = await connection.execute('SELECT * FROM Usuarios WHERE tipo = ?', [tipo]);
    return users;
}

const getLidersBySector = async (tagSetor) => {
    const [lideres] = await connection.execute('SELECT * FROM Usuarios WHERE tagSetor = ? tipo = ?', [tagSetor, "Lider"]);
    return lideres;
}

const getUsersBySector = async (tagSetor) => {
    const [users] = await connection.execute('SELECT * FROM Usuarios WHERE tagSetor = ?', [tagSetor]);
    return users;
}

const getUsersByLider = async (idLider) => {
    const [users] = await connection.execute('SELECT * FROM Usuarios WHERE idLider = ?', [idLider]);
    return users;
}

const addUser = async (newUsuario) => {
    const { tagSetor, fotoPerfil, tipo, nome, email, senha, idLider } = newUsuario;

    //verificar se o email já esta em uso
    const [existingUser] = await connection.execute('SELECT * FROM Usuarios WHERE email = ?', [email]);

    if (existingUser.length > 0) {
        throw new Error('Email já está em uso');
    }

    //verificar se o setor existe
    const [sectorExists] = await connection.execute('SELECT tagSetor FROM Setores WHERE tagSetor = ?', [tagSetor]);

    if (sectorExists.length === 0) {
        throw new Error('O setor fornecido não é válido.');
    }

    const [rowsIdUsuario] = await connection.execute('SELECT idUsuario + 1 AS idUsuario FROM Usuarios ORDER BY idUsuario DESC LIMIT 1;')
    const idUsuario = rowsIdUsuario[0].idUsuario;
    
    const query = 'INSERT INTO Usuarios(idUsuario, tagSetor, fotoPerfil, tipo, nome, email, senha, idLider) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const [newUser] = await connection.execute(query, [idUsuario, tagSetor, fotoPerfil, tipo, nome, email, senha, idLider]);
    return newUser;
}

const removeUser = async (idUsuario) => {
    const [removedUser] = await connection.execute('DELETE FROM Usuarios WHERE idUsuario = ?', [idUsuario]);
    return removedUser;
}

const editUser = async (idUsuario, Usuario) => {

    const { tagSetor, fotoPerfil, tipo, nome, email, senha, idLider } = Usuario;

    const query = 'UPDATE Usuarios set tagSetor = ?, fotoPerfil = ?, tipo = ?, nome = ?, email = ?, senha = ?, idLider = ? WHERE idUsuario = ?';
    const [editedUser] = await connection.execute(query, [tagSetor, fotoPerfil, tipo, nome, email, senha, idLider, idUsuario]);
    return editedUser;
}

const updateUserPicture = async (idUsuario, caminhoFotoPerfil) => {
    const query = 'UPDATE Usuarios SET fotoPerfil = ? WHERE idUsuario = ?';
    await connection.execute(query, [caminhoFotoPerfil, idUsuario]);
}

module.exports = {
    getAll,
    getUser,
    getUsersByType,
    getUsersBySector,
    getUsersByLider,
    addUser,
    removeUser,
    editUser,
    updateUserPicture,
    getLidersBySector,
}