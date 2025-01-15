require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

const authModel = require('../models/authModel');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const autenticar = async (req, res) => {
    const { email, password, rememberMe } = req.body;
    try {
        // Autentica o usuário no banco de dados
        const user = await authModel.autenticar(email, password);

        if (user) {
            const { idUsuario, tagSetor, fotoPerfil, nomeSistema, tipo, nome, email, senha } = user;
            
            // Gera um token JWT com as informações do usuário
            const token = jwt.sign({
                IdUsuario: idUsuario, 
                TagSetor: tagSetor,
                FotoPerfil: fotoPerfil,
                NomeSistema: nomeSistema,
                Nome: nome, 
                Tipo: tipo,
                Email: email,
                Senha: senha,
            }, jwtSecret, { expiresIn: rememberMe ? '7d' : '8h' });

            res.json({ 
                token,
                expiresIn: rememberMe ? '7d' : '8h',
                IdUsuario: idUsuario,
                TagSetor: tagSetor,
                FotoPerfil: fotoPerfil,
                NomeSistema: nomeSistema,
                Nome: nome, 
                Tipo: tipo,
                Email: email,
                Senha: senha
            });
        } else {
            res.status(401).json({ message: 'Credenciais inválidas' });
        }
    } catch (error) {
        console.error('Erro ao autenticar:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

module.exports = { autenticar };