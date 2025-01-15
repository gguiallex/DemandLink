const connection = require('./connection.js');

const autenticar = async (email, senha) => {
    // Consulta para autenticação de administradores
    const [userResult] = await connection.execute('SELECT * FROM Usuarios WHERE Email = ? AND Senha = ?', [email, senha]);

    if (userResult.length > 0) {
        return userResult[0];
    }
    // Retorna `null` se nenhuma consulta encontrar correspondência
    return null;
};

module.exports = { autenticar };