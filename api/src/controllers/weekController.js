const weekModel = require('../models/weekModel');

const getWeek = (req, res) => {
    try {
        // Obtém as datas de segunda e sexta da semana atual
        const { sunday, saturday } = weekModel.getWeek(new Date());
    
        return res.status(200).json({ 
            sunday,
            saturday,
        });
    } catch (error) {
        console.error('Erro ao calcular a semana:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro ao calcular o intervalo da semana',
        });
    }
};

module.exports = {
    getWeek,
};
