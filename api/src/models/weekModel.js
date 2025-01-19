const getWeek = (date) => {
    const sunday = new Date(date);
    const day = sunday.getDay();
    const diffSunday = (day === 0 ? 0 : -day); // Ajuste para domingo
    sunday.setDate(sunday.getDate() + diffSunday);
    
    
    const saturday = new Date(sunday);
    saturday.setDate(sunday.getDate() + 6); // Adiciona 6 dias para chegar no sábado

    return { sunday, saturday };
};

module.exports = {
    getWeek,
}
