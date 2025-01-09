const connection = require('./connection');

const getAllSectors = async () => {
    const [sectors] =  await connection.execute(' SELECT * FROM Setores');
    return sectors;
}

const getSector = async (tagSetor) => {
    const [sector] = await connection.execute('SELECT * FROM Setores where tagSetor = ?', [tagSetor]);
    return sector;
}

module.exports = {
    getAllSectors,
    getSector,
};