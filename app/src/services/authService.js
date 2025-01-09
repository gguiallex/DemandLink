import axios from 'axios';

const API_URL = 'http://localhost:4444';

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/autenticar`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Erro ao conectar à API';
    }
};
