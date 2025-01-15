const multer = require('multer');
const path = require('path');

// Configuração do armazenamento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/')); // Define a pasta de destino
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName); // Define o nome único do arquivo
    }
});

const upload = multer({ storage });

module.exports = upload;
