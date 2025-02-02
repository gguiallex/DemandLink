import React, { useState, useEffect } from "react";
import "./Botoes.css";
import { fetchSetores, fetchUsuariosByType, createUsuario, fetchLideresBysetor } from '../../services/apiService';
import Swal from 'sweetalert2';

const BotaoUsuario = ({ onUsuarioCreated }) => {
    const [setores, setSetores] = useState([]);
    const [lideresFiltrados, setLideresFiltrados] = useState([]);
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
    });
    const [selectedSetor, setSelectedSetor] = useState("");
    const [selectedTipoUsuario, setSelectedTipoUsuario] = useState("");
    const [selectedLiderUsuario, setSelectedLiderUsuario] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);

    // Carregar setores e líderes
    useEffect(() => {
        const loadData = async () => {
            try {
                const setoresData = await fetchSetores();
                setSetores(setoresData);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        const loadLideresBySetor = async () => {
            if (selectedSetor && selectedTipoUsuario === "Estagiario") {
                try {
                    const lideresData = await fetchLideresBysetor(selectedSetor);
                    setLideresFiltrados(lideresData);
                } catch (error) {
                    console.error("Erro ao carregar líderes por setor:", error);
                    setLideresFiltrados([]); // Limpa a lista em caso de erro
                }
            } else {
                setLideresFiltrados([]); // Limpa a lista se o setor não estiver selecionado ou o tipo não for estagiário
            }
        };
    
        loadLideresBySetor();
    }, [selectedSetor, selectedTipoUsuario]);

    const validateFields = () => {
        const newErrors = {};
        if (!formData.nome.trim()) newErrors.nome = "Informe o nome do usuário.";
        if (!formData.email.trim()) newErrors.email = "Informe o e-mail do usuário.";
        if (!formData.senha.trim()) newErrors.senha = "Informe a senha do usuário.";
        if (!selectedSetor) newErrors.selectedSetor = "Selecione um setor.";
        if (!selectedTipoUsuario) newErrors.selectedTipoUsuario = "Selecione o tipo do usuário.";
        if (selectedTipoUsuario === "Estagiario" && !selectedLiderUsuario) {
            newErrors.selectedLiderUsuario = "Selecione um líder para o estagiário.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateFields()) return;

        const usuarioNovo = {
            tagSetor: selectedSetor,
            fotoPerfil: null,
            tipo: selectedTipoUsuario,
            idLider: selectedTipoUsuario === "Estagiario" ? selectedLiderUsuario : null,
            nome: formData.nome,
            email: formData.email,
            senha: formData.senha
        };

        console.log(usuarioNovo);

        try {
            await createUsuario(usuarioNovo);
            Swal.fire({
                title: "Usuário cadastrado com sucesso!",
                icon: "success",
            });
            handleCloseModal();
            if (onUsuarioCreated) onUsuarioCreated();
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            Swal.fire({
                title: "Erro ao criar usuário.",
                text: error.message,
                icon: "error",
            });
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({ nome: "", email: "", senha: "" });
        setSelectedSetor("");
        setSelectedTipoUsuario("");
        setSelectedLiderUsuario(null);
        setErrors({});
        setAttemptedSubmit(false);
    };

    return (
        <div className="botoesInferiores">
            <button onClick={() => setShowModal(true)}>Cadastrar Novo Usuário</button>

            {showModal && (
                <div className="modalOverlay" onClick={(e) => e.target.classList.contains("modalOverlay") && handleCloseModal()}>
                    <div className="modalContent">
                        <p className="IniciacaoTexto">
                            Adicione um novo usuário preenchendo as informações abaixo. Lembre-se de revisar os dados antes de salvar. 😊
                        </p>
                        <form>
                            <div>
                                <label>
                                    Selecione o setor:
                                    <select
                                        value={selectedSetor}
                                        onChange={(e) => setSelectedSetor(e.target.value)}
                                        className={`selectField ${errors.setor ? "error" : ""}`}
                                    >
                                        <option value="">Selecione</option>
                                        {setores.map((setor) => (
                                            <option key={setor.tagSetor} value={setor.tagSetor}>
                                                {setor.nome}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.selectedSetor && <p className="errorText">{errors.selectedSetor}</p>}
                                </label>
                            </div>

                            <div>
                                <label>
                                    Tipo de usuário:
                                    <select
                                        value={selectedTipoUsuario}
                                        onChange={(e) => setSelectedTipoUsuario(e.target.value)}
                                        className={`selectField ${errors.setor ? "error" : ""}`}
                                    >
                                        <option value="">Selecione</option>
                                        <option value="Administrador">Administrador</option>
                                        <option value="Lider">Líder</option>
                                        <option value="Comum">Usuário Comum</option>
                                        <option value="Estagiario">Estagiário</option>
                                    </select>
                                    {errors.selectedTipoUsuario && <p className="errorText">{errors.selectedTipoUsuario}</p>}
                                </label>
                            </div>

                            <div>
                                <label>
                                    Nome do usuário:
                                    <input
                                        name="NovoUsuario"
                                        type="text"
                                        value={formData.nome}
                                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                        className={errors.nome ? "error" : ""}
                                    />
                                    {errors.nome && <p className="errorText">{errors.nome}</p>}
                                </label>
                            </div>

                            <div>
                                <label>
                                    E-mail:
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className={errors.email ? "error" : ""}
                                    />
                                    {errors.email && <p className="errorText">{errors.email}</p>}
                                </label>
                            </div>

                            <div>
                                <label>
                                    Senha:
                                    <input
                                        type="password"
                                        value={formData.senha}
                                        onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                                        className={errors.senha ? "error" : ""}
                                    />
                                    {errors.senha && <p className="errorText">{errors.senha}</p>}
                                </label>
                            </div>

                            {selectedTipoUsuario === "Estagiario" && (
                                <div>
                                    <label>
                                        Selecione o líder:
                                        <select
                                            value={selectedLiderUsuario}
                                            onChange={(e) => setSelectedLiderUsuario(e.target.value)}
                                            className={`selectField ${errors.setor ? "error" : ""}`}
                                        >
                                            <option value="">Selecione</option>
                                            {lideresFiltrados.map((lider) => (
                                                <option key={lider.idUsuario} value={lider.idUsuario}>
                                                    {lider.nome}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.selectedLiderUsuario && <p className="errorText">{errors.selectedLiderUsuario}</p>}
                                    </label>
                                </div>
                            )}

                            <br></br>

                            <button name="cadastrarUsuarioLogo" type="button" onClick={handleSave}>
                                Cadastrar
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BotaoUsuario;
