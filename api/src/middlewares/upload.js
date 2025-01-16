const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

require('dotenv').config();

// Configurando o Cloudinary com as credenciais
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });


// Configuração do multer para usar o Cloudinary
const storage = CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'profilePictures', // Pasta onde as imagens serão armazenadas no Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png'], // Tipos de arquivos permitidos
        transformation: [{ width: 500, height: 500, crop: 'limit' }], // Opcional: Limitar o tamanho das imagens
    }
});

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
