const connection = require('./connection.js');

const autenticar = async (email, senha) => {
    // Consulta para autenticação de administradores
    const [userResult] = await connection.execute('SELECT tagSetor, nomeSistema, tipo, nome FROM Usuarios WHERE Email = ? AND Senha = ?', [email, senha]);

    if (adminResult.length > 0) {
        return adminResult[0];
    }
    // Retorna `null` se nenhuma consulta encontrar correspondência
    return null;
};

module.exports = { autenticar };