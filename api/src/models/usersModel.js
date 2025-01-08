const connection = require('./connection');

const getAll = async () => {
    const [users] =  await connection.execute(' SELECT * FROM Usuarios');
    return users;
};

// ====================== ESTAGIÁRIOS ======================

const getEstagiarios = async () => {
    const [estagiarios] = await connection.execute('SELECT * FROM Usuarios WHERE tipo = Estagiario');
    return estagiarios;
}

// ====================== ADMINISTRADORES ======================

const getAdministradores = async () => {
    const [administradores] = await connection.execute('SELECT * FROM Usuarios WHERE tipo = Administrador');
    return administradores;
}

// ====================== LÍDERES ======================

const getLideres = async () => {
    const [lideres] = await connection.execute('SELECT * FROM Usuarios WHERE tipo = Lider');
    return lideres;
}

// ====================== USUÁRIOS COMUNS ======================

const getComuns = async () => {
    const [comuns] = await connection.execute('SELECT * FROM Usuarios WHERE tipo = Comum');
    return comuns;
}

module.exports = {
    getAll,
    getEstagiarios,
    getAdministradores,
    getLideres,
    getComuns,
}