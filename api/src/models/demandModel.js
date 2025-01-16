const connection = require('./connection');

const getAllDemands = async () => {
    const [demands] = await connection.execute(' SELECT * FROM Demandas');
    return demands;
}

const getDemand = async (tagDemanda) => {
    const [demand] = await connection.execute('SELECT * FROM Demandas where tagDemanda = ?', [tagDemanda]);
    return demand;
}

const addDemand = async (newDemand) => {
    const { tagSetor, projeto, descricao, urgencia, dataFim } = newDemand;

    console.log(tagSetor, projeto, descricao, urgencia, dataFim);

    //verificar se o setor existe
    const [sectorExists] = await connection.execute('SELECT 1 FROM Setores WHERE tagSetor = ?', [tagSetor]);

    if (sectorExists.length === 0) {
        throw new Error('O setor fornecido não é válido.');
    }

    const [idSize] = await connection.execute('SELECT * FROM Demandas WHERE tagSetor = ?', [tagSetor]);

    const tagDemanda = `${idSize.length + 1}${tagSetor}`;

    const query = 'INSERT INTO Demandas(tagDemanda, tagSetor, projeto, descricao, urgencia, status, DataPedido, dataFim) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?)';
    await connection.execute(query, [tagDemanda, tagSetor, projeto, descricao, urgencia, 'Não Iniciado', dataFim]);

    const [newDemanda] = await getDemand(tagDemanda);

    return newDemanda;
}

const getAllDemandUsers = async () => {
    const [demandUsers] = await connection.execute(' SELECT * FROM EnvolvidosDemanda');
    return demandUsers;
}

const getDemandUser = async (idUsuario) => {
    const [demandUser] = await connection.execute(' SELECT * FROM EnvolvidosDemanda WHERE idUsuario = ?', [idUsuario]);
    return demandUser;
}

const getUsersDemand = async (tagDemanda) => {
    const [UsersDemand] = await connection.execute
    (`SELECT u.nome, e.tagDemanda, e.tagSetor
        FROM EnvolvidosDemanda e
        JOIN Usuarios u ON e.idUsuario = u.idUsuario
        WHERE e.tagDemanda = ?`, [tagDemanda]
    );
    return UsersDemand;
}

const addDemandUsers = async (newDemandUsers) => {
    const { idUsuario, tagDemanda, tagSetor, } = newDemandUsers;

    //verificar se o setor existe
    const [sectorExists] = await connection.execute('SELECT 1 FROM Setores WHERE tagSetor = ?', [tagSetor]);

    if (sectorExists.length === 0) {
        throw new Error('O setor fornecido não é válido.');
    }

    //verificar se o setor existe
    const [demandExists] = await connection.execute('SELECT 1 FROM Demandas WHERE tagDemanda = ?', [tagDemanda]);

    if (demandExists.length === 0) {
        throw new Error('A demanda fornecida não é válida.');
    }

    // Obter o setor do usuário
    const [setorUsuarioResult] = await connection.execute('SELECT tagSetor FROM Usuarios WHERE idUsuario = ?', [idUsuario]);

    if (setorUsuarioResult.length === 0) {
        throw new Error('O usuário fornecido não é válido.');
    }

    const setorUsuario = setorUsuarioResult[0].tagSetor;

    const query = 'INSERT INTO EnvolvidosDemanda(idUsuario, tagDemanda, tagSetor, setorUsuario) VALUES (?, ?, ?, ?)';
    const [demandaComUsuario] = await connection.execute(query, [idUsuario, tagDemanda, tagSetor, setorUsuario]);
    return demandaComUsuario;
}

module.exports = {
    getAllDemands,
    getDemand,
    addDemand,
    getAllDemandUsers,
    getDemandUser,
    getUsersDemand,
    addDemandUsers,
};