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

const getUsersBySector = async (tagSetor) => {
    const [users] = await connection.execute('SELECT * FROM Usuarios WHERE tagSetor = ?', [tagSetor]);
    return users;
}

const addUser = async (newUsuario) => {
    const { tagSetor, nomeSistema, tipo, nome, email, senha } = newUsuario;

    //verificar se o email já esta em uso
    const [existingUser] = await connection.execute('SELECT * FROM Usuarios WHERE email = ?', [email]);

    if (existingUser.length > 0) {
        throw new Error('Email já está em uso');
    }

    //verificar se o setor existe
    const [sectorExists] = await connection.execute('SELECT tagSetor FROM Setor WHERE tagSetor = ?', [tagSetor]);

    if (sectorExists.length === 0) {
        throw new Error('O setor fornecido não é válido.');
    }

    const query = 'INSERT INTO Usuarios(tagSetor, nomeSistema, tipo, nome, email, senha) VALUES (?, ?, ?, ?, ?, ?)';
    const [newUser] = await connection.execute(query, [tagSetor, nomeSistema, tipo, nome, email, senha]);
    return newUser;
}

const removeUser = async (idUsuario) => {
    const [removedUser] = await connection.execute('DELETE FROM Usuarios WHERE idUsuario = ?', [idUsuario]);
    return removedUser;
}

const editUser = async (idUsuario, Usuario) => {

    const { tagSetor, nomeSistema, tipo, nome, email, senha } = Usuario;

    const query = 'UPDATE Usuarios set tagSetor = ?, nomeSistema = ?, tipo = ?, nome = ?, email = ?, senha = ? WHERE idUsuario = ?';
    const [editedUser] = await connection.execute(query, [tagSetor, nomeSistema, tipo, nome, email, senha, idUsuario]);
    return editedUser;
}

module.exports = {
    getAll,
    getUser,
    getUsersByType,
    getUsersBySector,
    addUser,
    removeUser,
    editUser,
}