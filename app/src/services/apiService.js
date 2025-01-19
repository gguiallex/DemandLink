import axios from 'axios';
 
// const API_URL = 'https://demand-link-backend.vercel.app';
const API_URL = 'http://localhost:4444';

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

export const fetchTamanhoSetor = async (tagSetor) => {
    try {
        const response = await api.get(`/setor/${tagSetor}/quantidade`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Erro ao buscar a quantidade de usuários do setor';
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

// Função para buscar todas as demandas de um determinado usuário
export const fetchDemandasByUser = async (idUsuario) => {
    try {
        const response = await api.get(`/demandas/usuario/${idUsuario}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Erro ao buscar demandas do usuário';
    }
};

// Função para buscar todas as demandas de um determinado usuário
export const fetchDemandasByCreator = async (idUsuario) => {
    try {
        const response = await api.get(`/demandas/criador/${idUsuario}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Erro ao buscar demandas criadas pelo usuário';
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

// Função para buscar os usuários de um determinado tipo
export const fetchUsuariosByType = async (tipoUsuario) => {
    try {
        const response = await api.get(`/usuarios/${tipoUsuario}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Erro ao buscar usuários desse tipo';
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

// Função para criar uma nova demanda
export const createSetor = async (data) => {
    try {
        const response = await api.post('/setor', data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Erro ao criar setor';
    }
};

export const createUsuario = async (data) => {
    try {
        const response = await api.post('/usuario', data);
        return response; // Retorna os dados do novo usuario
    } catch (error) {
        throw error.response?.data?.message || 'Erro ao criar usuario';
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

// Função para atualizar informações do usuário
export const updateUserInfo = async (idUsuario, data) => {
    try{
        const response = await api.put(`/usuario/${idUsuario}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Erro ao atualizar informações do usuário';
    }
}

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

export const getDemandUrgency = async (idUsuario) => {
    try{
        const response = await api.get(`/demandas/urgente/${idUsuario}`)
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Erro ao buscar demandas urgentes';
    }
}

export const getDemandByWeek = async (idUsuario) => {   
    try{
        const semana = await api.get(`/calculoTempo`);
        const sunday = semana.data.sunday;  
        const saturday = semana.data.saturday;
        const response = await api.get(`/demandas/semana/${idUsuario}/${sunday}/${saturday}`)
        return response;
    } catch (error) {
        throw error.response?.data?.message || 'Erro ao buscar demandas da semana';
    }
}

export const getDemandByStatus = async (status) => {
    try{    
        const response = await api.get(`/demandas/${status}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Erro ao buscar demandas urgentes';
    }
}

export const getDemandByMonth = async (mes, idUsuario) => {
    try{
        const response = await api.get(`/demandas/mes/${mes}/${idUsuario}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Erro ao buscar demandas pelo mês';
    }
}

// Exportar o objeto axios caso precise fazer chamadas customizadas
export default api;
