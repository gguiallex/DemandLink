const connection = require('./connection');

const getAllSectors = async () => {
    const [sectors] =  await connection.execute(' SELECT * FROM Setores');
    return sectors;
}

const getSector = async (tagSetor) => {
    const [sector] = await connection.execute('SELECT * FROM Setores where tagSetor = ?', [tagSetor]);
    return sector;
}

const addSector = async (newSector) => {
    const { tagSetor, nome } = newSector;

    const query = 'INSERT INTO Setor(tagSetor, nome) VALUES (?, ?)';
    const [newSector] = await connection.execute(query, [tagSetor, nome]);

    return newSector;
}

module.exports = {
    getAllSectors,
    getSector,
    addSector,
};