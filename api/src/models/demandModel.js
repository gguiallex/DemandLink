const connection = require('./connection');

const getAllDemands = async () => {
    const [demands] =  await connection.execute(' SELECT * FROM Demandas');
    return demands;
}

const getDemand = async (tagDemanda) => {
    const [demand] = await connection.execute('SELECT * FROM Demandas where tagDemanda = ?', [tagDemanda]);
    return demand;
}

const addDemand = async (newDemand) => {
    const { tagSetor, projeto, descricao, urgencia, status, dataFim } = newDemand;

    //verificar se o setor existe
    const [sectorExists] = await connection.execute('SELECT 1 FROM Setores WHERE tagSetor = ?', [tagSetor]);

    if (sectorExists.length === 0) {
        throw new Error('O setor fornecido não é válido.');
    }

    const [idSize] = await connection.execute('SELECT * FROM Demandas WHERE tagSetor = ?', [tagSetor]);

    const tagDemanda = `${idSize.length + 1}${tagSetor}` ;

    const query = 'INSERT INTO Demandas(tagDemanda, tagSetor, projeto, descricao, urgencia, status, DataPedido, dataFim) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?)';
    const [newDemanda] = await connection.execute(query, [tagDemanda, tagSetor, projeto, descricao, urgencia, status, dataFim]);
    return newDemanda;
}

const getAllDemandUsers = async () => {
    const [demandUsers] =  await connection.execute(' SELECT * FROM EnvolvidosDemanda');
    return demandUsers;
}

const getDemandUser = async (idUsuario) => {
    const [demandUser] =  await connection.execute(' SELECT * FROM EnvolvidosDemanda WHERE idUsuario = ?', [idUsuario]);
    return demandUser;
}

const getUsersDemand = async (tagDemanda) => {
    const [UsersDemand] =  await connection.execute(' SELECT * FROM EnvolvidosDemanda WHERE tagDemanda = ?', [tagDemanda]);
    return UsersDemand;
}

const addDemandUsers = async (newDemandUsers) => {
    const {idUsuario, tagDemanda, tagSetor} = newDemandUsers;

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

    const query = 'INSERT INTO EnvolvidosDemanda(idUsuario, tagDemanda, tagSetor) VALUES (?, ?, ?)';
    const [demandaComUsuario] = await connection.execute(query, [idUsuario, tagDemanda, tagSetor]);
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