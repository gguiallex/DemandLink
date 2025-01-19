const connection = require('./connection');

const getAllDemands = async () => {
    const [demands] = await connection.execute(' SELECT * FROM Demandas');
    return demands;
}

const getDemand = async (tagDemanda) => {
    const [demand] = await connection.execute('SELECT * FROM Demandas where tagDemanda = ?', [tagDemanda]);
    return demand;
}

const getAllDemandsCreated = async (idUsuario) => {
    const [demands] = await connection.execute('SELECT * FROM Demandas where idUsuario = ?', [idUsuario]);
    return demands;
};

const addDemand = async (newDemand) => {
    const { tagSetor, idUsuario, projeto, titulo, descricao, urgencia, dataFim } = newDemand;

    //verificar se o setor existe
    const [sectorExists] = await connection.execute('SELECT 1 FROM Setores WHERE tagSetor = ?', [tagSetor]);

    if (sectorExists.length === 0) {
        throw new Error('O setor fornecido não é válido.');
    }

    const [idSize] = await connection.execute('SELECT * FROM Demandas WHERE tagSetor = ?', [tagSetor]);

    const tagDemanda = `${idSize.length + 1}${tagSetor}`;

    const query = 'INSERT INTO Demandas(tagDemanda, tagSetor, idUsuario, projeto, titulo, descricao, urgencia, status, DataPedido, dataFim) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)';
    await connection.execute(query, [tagDemanda, tagSetor, idUsuario, projeto, titulo, descricao, urgencia, 'Não Iniciado', dataFim]);

    const [newDemanda] = await getDemand(tagDemanda);

    return newDemanda;
}

const removeDemand = async (tagDemanda) => {
    const [removedDemand] = await connection.execute('DELETE FROM Demandas WHERE tagDemanda = ?', [tagDemanda]);
    return removedDemand;
}

const removeUserDemand = async (idUsuario, tagDemanda) => {
    const [removedUserDemand] = await connection.execute('DELETE FROM Demandas WHERE tagDemanda = ? AND idUsuario = ?', [tagDemanda, idUsuario]);
    return removedUserDemand;
}

const getAllDemandUsers = async () => {
    const [demandUsers] = await connection.execute(' SELECT * FROM EnvolvidosDemanda');
    return demandUsers;
}

const getDemandUser = async (idUsuario) => {
    const [demandUser] = await connection.execute(
        'SELECT tagDemanda FROM EnvolvidosDemanda WHERE idUsuario = ?',
        [idUsuario]
    );

    // Extraia as tags de demanda
    const tagsDemanda = demandUser.map((row) => row.tagDemanda);

    if (tagsDemanda.length === 0) {
        return []; // Retorna uma lista vazia se o usuário não estiver envolvido em nenhuma demanda
    }

    // Busque as informações detalhadas das demandas com base nas tags
    const [demands] = await connection.execute(
        `SELECT * FROM Demandas WHERE tagDemanda IN (${tagsDemanda.map(() => '?').join(',')})`,
        tagsDemanda
    );
    return demands;
}

const getUsersDemand = async (tagDemanda) => {
    const [UsersDemand] = await connection.execute(
        `SELECT u.nome, e.tagDemanda, e.tagSetor
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

const getDemandUrgency = async (idUsuario) => {
    const [demandasfiltradas] = await connection.execute(`SELECT * FROM EnvolvidosDemanda WHERE idUsuario = ?`, [idUsuario]);
    const idsDemandas = demandasfiltradas.map((demanda) => demanda.tagDemanda);
    if (idsDemandas.length === 0) {
        // Se não houver demandas associadas ao usuário, retorne 0
        return { total_demandas: 0 };
    }
    const [demand] = await connection.execute(
        `SELECT COUNT(*) AS total_demandas 
        FROM demandas 
        WHERE tagDemanda IN (${idsDemandas.map(() => '?').join(', ')})
        AND dataFim BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 2 DAY)`,
        idsDemandas
    );
    return demand[0];
}

const getDemandByStatus = async (statusDemanda) => {
    const [demand] = await connection.execute(`SELECT * FROM demandas WHERE status = ?`, [statusDemanda]);
    return demand;
}

const getDemandByWeek = async (idUsuario, sunday, saturday) => {
    const [demandasfiltradas] = await connection.execute(`SELECT * FROM EnvolvidosDemanda WHERE idUsuario = ?`, [idUsuario]);
    const idsDemandas = demandasfiltradas.map((demanda) => demanda.tagDemanda);
    if (idsDemandas.length === 0) {
        return [];
    }

    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0'); // Adiciona 0 à esquerda se for menor que 10
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const sundayFormatted = formatDate(sunday);
    const saturdayFormatted = formatDate(saturday);

    const [demandas] = await connection.execute(`
        SELECT *
        FROM Demandas
        WHERE tagDemanda IN (${idsDemandas.map(() => '?').join(', ')})
        AND dataFim BETWEEN ? AND ?
    `, [...idsDemandas, sundayFormatted, saturdayFormatted]);
    return demandas;
};

const getDemandByMonth = async (mes, idUsuario) => {
    const anoAtual = new Date().getUTCFullYear();
    
    const inicioMes = new Date(anoAtual, mes - 1, 1).toISOString(); // Início do mês em ISO
    const fimMes = new Date(anoAtual, mes, 0, 23, 59, 59, 999).toISOString(); // inicio do mes em iso
    
    const [demandasfiltradas] = await connection.execute(`SELECT * FROM EnvolvidosDemanda WHERE idUsuario = ?`, [idUsuario]);
    const idsDemandas = demandasfiltradas.map((demanda) => demanda.tagDemanda);

    if (idsDemandas.length === 0) {
        // Se não houver demandas associadas ao usuário, retorne 0
        return { total_demandas: 0 };
    }

    const [demand] = await connection.execute(`
        SELECT * 
        FROM demandas 
        WHERE tagDemanda IN (${idsDemandas.map(() => '?').join(', ')}) 
            AND dataPedido >= ? 
            AND dataPedido <= ?;    
    `, [...idsDemandas, inicioMes, fimMes]);

    return demand;
}

const editDemand = async (tagDemanda, Demanda) => {

    const { tagSetor, projeto, titulo, descricao, urgencia, dataFim } = Demanda;

    const query = 'UPDATE Demandas set tagSetor = ?, projeto = ?, titulo = ?, descricao = ?, urgencia = ?, dataFim = ? WHERE tagDemanda = ?';
    const [editedDemand] = await connection.execute(query, [ tagSetor, projeto, titulo, descricao, urgencia, dataFim, tagDemanda]);
    return editedDemand;
}

const startDemand = async (tagDemanda) => {
    const query = 'UPDATE Demandas set DataInicio = NOW(), status = ? WHERE tagDemanda = ?';
    const [progressDemand] = await connection.execute(query, ["Em Andamento", tagDemanda]);
    return progressDemand;
}

const endDemand = async (tagDemanda) => {
    const query = 'UPDATE Demandas set DataEntrega = NOW(), status = ? WHERE tagDemanda = ?';
    const [finalizedDemand] = await connection.execute(query, ["Concluído", tagDemanda]);
    return finalizedDemand;
}

module.exports = {
    getAllDemands,
    getDemand,
    addDemand,
    removeDemand,
    removeUserDemand,
    getAllDemandUsers,
    getAllDemandsCreated,
    getDemandUser,
    getUsersDemand,
    addDemandUsers,
    getDemandUrgency,
    getDemandByStatus,
    getDemandByWeek,
    getDemandByMonth,
    editDemand,
    startDemand,
    endDemand
};