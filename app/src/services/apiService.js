import axios from 'axios';

const API_URL = 'https://demand-link-backend.vercel.app';

// Instância do axios com configuração base
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Função para buscar todos os setores
export const fetchAreas = async () => {
    try {
        const response = await api.get('/setores');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Erro ao buscar setores';
    }
};

// Função para buscar todos os usuários
export const fetchEnvolvidos = async () => {
    try {
        const response = await api.get('/usuarios');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Erro ao buscar usuarios';
    }
};

// Função para buscar os usuários de um determinado setor
export const fetchEnvolvidosBySetor = async (tagSetor) => {
    try {
        const response = await api.get(`/usuarios/setor/${tagSetor}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Erro ao buscar usuários do setor';
    }
};

// Exportar o objeto axios caso precise fazer chamadas customizadas
export default api;
