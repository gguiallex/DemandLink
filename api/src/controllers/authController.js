const authModel = require('../models/authModel');

const autenticar = async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Autentica o usuário no banco de dados
        const user = await authModel.autenticar(email, senha);

        if (user) {
            const { tagSetor, nomeSistema, tipo, nome } = user;
            // Gera um token JWT com as informações do usuário
            const token = jwt.sign({ 
                TagSetor: tagSetor,
                NomeSistema: nomeSistema,
                Nome: nome, 
                Tipo: tipo,
            }, jwtSecret, { expiresIn: rememberMe ? '7d' : '8h' });

            res.json({ 
                token,
                expiresIn: rememberMe ? '7d' : '8h',
                TagSetor: tagSetor,
                NomeSistema: nomeSistema,
                Nome: nome, 
                Tipo: tipo
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