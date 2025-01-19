const mysql = require('mysql2/promise');

require('dotenv').config();

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    waitForConnections: true, // Configuração para aguardar por novas conexões se todas estiverem ocupadas
    connectionLimit: 10, // Limite máximo de conexões simultâneas permitidas no pool
    queueLimit: 0,  // Limite de solicitações em fila quando o pool atinge o máximo de conexões (0 = sem limite)
    //ssl: { rejectUnauthorized: false }, // Configuração para ignorar validação de certificado SSL (útil para ambientes de desenvolvimento)
    ssl: false  
});

module.exports = connection;