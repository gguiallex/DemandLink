const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configurando o Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, // Substitua pelo seu cloud_name
    api_key: process.env.API_KEY,       // Substitua pelo seu api_key
    api_secret: process.env.API_SECRET, // Substitua pelo seu api_secret
});

// Configuração do armazenamento no Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary, // Certifique-se de que esta variável foi configurada corretamente
    params: {
        folder: 'profilePictures', // Pasta no Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png'], // Formatos permitidos
        transformation: [{ width: 500, height: 500, crop: 'limit' }], // Limitar tamanho
    },
});

// Configuração do multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limite de 5 MB
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Tipo de arquivo não suportado. Apenas JPG, JPEG e PNG são permitidos.'));
        }
        cb(null, true);
    },
});

module.exports = upload;
