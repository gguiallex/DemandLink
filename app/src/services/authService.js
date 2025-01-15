import axios from 'axios';
import {API_URL} from './apiService'

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/autenticar`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Erro ao conectar à API';
    }
};
