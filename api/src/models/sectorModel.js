const connection = require('./connection');

const getAllSectors = async () => {
    const [sectors] = await connection.execute(' SELECT * FROM Setores');
    return sectors;
}

const getSector = async (tagSetor) => {
    const [sector] = await connection.execute('SELECT * FROM Setores where tagSetor = ?', [tagSetor]);
    return sector;
}

const addSector = async (newSector) => {
    const { tagSetor, nome } = newSector;

    const query = 'INSERT INTO Setores(tagSetor, nome) VALUES (?, ?)';
    const [novoSetor] = await connection.execute(query, [tagSetor, nome]);

    return novoSetor;
}

const removeSector = async (tagSetor) => {
    const [removedSector] = await connection.execute('DELETE FROM Setores WHERE tagSetor = ?', [tagSetor]);
    return removedSector;
}

const editSector = async (tagSetorAntigo, setor) => {
    const { tagSetor, nome } = setor;

    const query = 'UPDATE Setores set tagSetor = ?, nome = ? WHERE tagSetor = ?';
    const [editedSector] = await connection.execute(query, [tagSetor, nome, tagSetorAntigo]);
    return editedSector;
}

module.exports = {
    getAllSectors,
    getSector,
    addSector,
    removeSector,
    editSector
};