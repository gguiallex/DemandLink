import axios from 'axios';

export const API_URL = 'https://demand-link.vercel.app';

// Instância do axios com configuração base
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Função para buscar todos os setores
export const fetchSetores = async () => {
    try {
        const response = await api.get('/setores');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Erro ao buscar setores';
    }
};

// Função para buscar todos os usuários
export const fetchUsuarios = async () => {
    try {
        const response = await api.get('/usuarios');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Erro ao buscar usuarios';
    }
};

// Função para buscar todas as demandas
export const fetchDemandas = async () => {
    try {
        const response = await api.get('/demandas');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Erro ao buscar demandas';
    }
};

// Função para buscar todos os usuarios de uma demanda
export const fetchUsuariosByDemanda = async (tagDemanda) => {
    try {
        const response = await api.get(`/usuarios/demanda/${tagDemanda}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Erro ao buscar usuários vinculados à demanda';
    }
};

// Função para buscar os usuários de um determinado setor
export const fetchUsuariosBySetor = async (tagSetor) => {
    try {
        const response = await api.get(`/usuarios/setor/${tagSetor}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Erro ao buscar usuários do setor';
    }
};

// Função para criar uma nova demanda
export const createDemanda = async (data) => {
    try {
        const response = await api.post('/demanda', data);
        return response.data; // Retorna os dados da nova demanda (incluindo o `tagDemanda`)
    } catch (error) {
        throw error.response?.data?.message || 'Erro ao criar demanda';
    }
};

// Função para adicionar usuarios na nova demanda
export const createEnvolvidoDemanda = async (data) => {
    try {
        const response = await api.post('/demanda/usuario', data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Erro ao adicionar usuario à demanda';
    }
};

// Função para atualizar a foto de perfil de um determinado usuario
export const uploadProfilePicture = async (idUsuario, formData) => {
    try {
      const response = await api.post(
        `/${idUsuario}/atualizarFotoPerfil`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao fazer upload da foto de perfil:", error);
      throw error;
    }
  };

// Exportar o objeto axios caso precise fazer chamadas customizadas
export default api;
