const connection = require('./connection');

const getAllDemands = async () => {
    const [demands] =  await connection.execute(' SELECT * FROM Demandas');
    return demands;
}

const getDemand = async (tagDemanda) => {
    const [demand] = await connection.execute('SELECT * FROM Demandas where tagDemanda = ?', [tagDemanda]);
    return demand;
}

module.exports = {
    getAllDemands,
    getDemand,
};