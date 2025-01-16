const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const multerStorageCloudinary = require('multer-storage-cloudinary');

// Configuração do multer para usar o Cloudinary
const storage = multerStorageCloudinary({
    cloudinary: cloudinary,
    params: {
        folder: 'profilePictures', // Pasta onde as imagens serão armazenadas no Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png'],
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
