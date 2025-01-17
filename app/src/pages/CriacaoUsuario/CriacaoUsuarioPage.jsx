import React, { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import "./CriacaoUsuarioPage.css"
import SideMenu from "../../components/Menu/SidebarMenu"
import InfoTop from "../../components/InfoTop/InfoTop"
import { fetchSetores, fetchUsuariosByType, createUsuario } from '../../services/apiService';

const CriacaoUsuarioPage = () => {

    const [setores, setSetores] = useState([]); // Para armazenar opções de setores
    const [lideres, setLideres] = useState([]);
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
    });
    const [selectedSetor, setSelectedSetor] = useState("");
    const [selectedTipoUsuario, setSelectedTipoUsuario] = useState("");
    const [selectedLiderUsuario, setSelectedLiderUsuario] = useState(null);

    // Carrega dados do LocalStorage/SessionStorage
    useEffect( () => {
        const loadSetores = async () => {
            try {
                const setoresData = await fetchSetores();
                setSetores(setoresData);
            } catch (error) {
                console.error("Erro ao carregar setores:", error);
            }
        }

        const loadUsuariosLideres = async () => {
            try {
                const lideresData = await fetchUsuariosByType("Lider");
                setLideres(lideresData);
            } catch (error) {
                console.error("Erro ao carregar os líderes:", error);
            }
        }

        loadSetores();
        loadUsuariosLideres();
        
    }, []);

    const handleSave = async () => {
        const usuarioNovo = {
            ...formData, 
            idLider: selectedLiderUsuario, 
            tagSetor: selectedSetor, 
            tipo: selectedTipoUsuario,
            fotoPerfil: null
        }
        try {
            const response = await createUsuario(usuarioNovo);
            limparForm();       
            Swal.fire({
                title: response.data.message,
                icon: "success",
            });
        } catch (error) {
            Swal.fire({
              icon: "error",
              title: error,
            });
        }  
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const limparForm = () => {
        setFormData({
            nome: "",
            email: "",
            senha: "",
        });

        setSelectedLiderUsuario(null);
        setSelectedSetor("");
        setSelectedTipoUsuario("");
    }

    return (
        <div className="container-inicio">
            <div className="menuLateral">
                <SideMenu />
            </div>

            <div className="info">
                <InfoTop />
                <div className="infosPrincipaisSettings">
                    <div className="form-section">
                        <div className="input-group">
                            <label>Selecione o setor do usuário</label>
                            <select className={`selectSetor`}
                                value={selectedSetor}
                                onChange={(e) => setSelectedSetor(e.target.value)}
                            >
                                <option value="">Selecione um setor</option>
                                {setores.map((setor) => (
                                    <option key={setor.tagSetor} value={setor.tagSetor}>
                                        {setor.tagSetor} - {setor.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Selecione o tipo do usuário</label>
                            <select className={`selectSetor`}
                                value={selectedTipoUsuario}
                                onChange={(e) => setSelectedTipoUsuario(e.target.value)}
                            >
                                <option value="">Selecione um tipo</option>
                                <option value="Administrador">Administrador</option>
                                <option value="Lider">Líder</option>
                                <option value="Comum">Usuário comum</option>
                                <option value="Estagiario">Estagiário</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Nome</label>
                            <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label>E-mail</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label>Senha</label>
                            <input type="password" name="senha" value={formData.senha} onChange={handleChange} />
                        </div>
                        { selectedTipoUsuario == "Estagiario" &&
                           (
                            <div className="input-group">
                                <label>Selecione o líder do usuário</label>
                                <select className={`selectSetor`}
                                    value={selectedLiderUsuario}
                                    onChange={(e) => setSelectedLiderUsuario(e.target.value)}
                                >
                                    <option value="">Selecione um líder</option>
                                    {lideres.map((lider) => (
                                        <option key={lider.idUsuario} value={lider.idUsuario}>
                                            {lider.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                           )
                        }
                        <button className="edit-photo-button" onClick={handleSave}>Cadastrar</button>
                    </div>
                </div>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default CriacaoUsuarioPage;