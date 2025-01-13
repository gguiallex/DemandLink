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
    const [sectorExists] = await connection.execute('SELECT 1 FROM Setor WHERE tagSetor = ?', [tagSetor]);

    if (sectorExists.length === 0) {
        throw new Error('O setor fornecido não é válido.');
    }

    const [idSize] = await connection.execute('SELECT * FROM Demandas WHERE tagSetor = ?', [tagSetor]);

    const tagDemanda = `${idSize.length + 1}${tagSetor}` ;

    const query = 'INSERT INTO Demandas(tagDemanda, tagSetor, projeto, descricao, urgencia, status, DataPedido, dataFim) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?)';
    const [newSector] = await connection.execute(query, [tagDemanda, tagSetor, projeto, descricao, urgencia, status, dataFim]);
    return newSector;
}

module.exports = {
    getAllDemands,
    getDemand,
    addDemand,
};