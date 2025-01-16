const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const multerStorageCloudinary = require('multer-storage-cloudinary');
//const path = require('path');
//const fs = require('fs');

// Configuração do armazenamento
/*const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { idUsuario } = req.params; // Obtém o ID do usuário a partir da rota
        const folder = 'profilePictures'; // A pasta base para as fotos de perfil

        // Define o caminho de upload com a subpasta baseada no ID do usuário
        const uploadPath = path.join(__dirname, '../uploads', folder, idUsuario);

        // Verifica se a pasta existe; se não, cria
        fs.mkdir(uploadPath, { recursive: true }, (err) => {
            if (err) {
                console.error('Erro ao criar a subpasta:', err);
                return cb(err); // Retorna o erro no callback
            }
            cb(null, uploadPath); // Define o caminho de destino
        });
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`; // Gera um nome único para o arquivo
        cb(null, uniqueName);
    }
});*/

// Configuração do multer para usar o Cloudinary
const storage = multerStorageCloudinary({
    cloudinary: cloudinary,
    params: {
        folder: 'profilePictures', // Pasta onde as imagens serão armazenadas no Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }], // Opcional: Limitar o tamanho das imagens
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
