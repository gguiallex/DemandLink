const connection = require('./connection');

const getAll = async () => {
    const [users] =  await connection.execute(' SELECT * FROM Usuarios');
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
    const [users] = await connection.execute('SELECT * FROM Usuarios WHERE tagSetor = ?'[tagSetor]);
    return users;
}

const addUser = async (idUsuario, newUsuario) => {
    const {tagSetor, nomeSistema, tipo, nome, email, senha} = newUsuario;

    const query = 'UPDATE Usuarios set tagSetor = ?, nomeSistema = ?, tipo = ?, nome = ?, email = ?, senha = ? WHERE idUsuario = ?';
    const [newUser] = await connection.execute(query, [tagSetor, nomeSistema, tipo, nome, email, senha, idUsuario]);
    return newUser;
}

const removeUser = async (idUsuario) => {
    const [removedUser] = await connection.execute('DELETE FROM Usuarios WHERE idUsuario = ?', [idUsuario]);
    return removedUser;
}

const editUser = async (idUsuario, Usuario) => {

    const {tagSetor, nomeSistema, tipo, nome, email, senha} = Usuario;

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