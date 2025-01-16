const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuração do armazenamento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { idUsuario } = req.params; // Obtém o ID do usuário a partir da rota
        const folder = 'profilePictures'; // A pasta base para as fotos de perfil

        // Define o caminho de upload com a subpasta baseada no ID do usuário
        const uploadPath = path.join(process.cwd(), 'src/uploads', folder, idUsuario); // `process.cwd()` garante compatibilidade com produção

        // Verifica se a pasta existe; se não, cria
        fs.mkdir(uploadPath, { recursive: true }, (err) => {
            if (err) {
                console.error(`Erro ao criar a subpasta '${uploadPath}':`, err);
                return cb(new Error('Falha ao criar diretório para upload.')); // Retorna erro no callback
            }
            console.log(`Pasta de upload criada ou já existente: ${uploadPath}`); // Log para depuração
            cb(null, uploadPath); // Define o caminho de destino
        });
    },
    filename: (req, file, cb) => {
        // Gera um nome único para o arquivo
        const uniqueName = `${Date.now()}-${file.originalname}`;
        console.log(`Arquivo será salvo como: ${uniqueName}`); // Log para depuração
        cb(null, uniqueName);
    }
});

// Instância do multer com configurações adicionais para validação
const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Limita o tamanho do arquivo (2MB neste exemplo)
    fileFilter: (req, file, cb) => {
        // Aceita apenas imagens (jpeg, png, etc.)
        const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            console.error(`Tipo de arquivo inválido: ${file.mimetype}`); // Log para depuração
            cb(new Error('Tipo de arquivo não permitido. Apenas imagens são aceitas.'));
        }
    }
});

module.exports = upload;
