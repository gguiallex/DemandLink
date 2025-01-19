import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { fetchLideresBysetor, updateUserInfo } from "../../services/apiService";

const EditUserLiderModal = ({ usuario, onClose }) => {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: ""
    });
    const [selectedSetor, setSelectedSetor] = useState("");
    const [selectedTipoUsuario, setSelectedTipoUsuario] = useState("");
    const [selectedLiderUsuario, setSelectedLiderUsuario] = useState(null);
    const [filteredLideres, setFilteredLideres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (usuario) {
            setFormData({
                nome: usuario.nome || "",
                email: usuario.email || "",
                senha: usuario.senha || ""
            });
            setSelectedSetor(usuario.tagSetor || "");
            setSelectedTipoUsuario(usuario.tipo || "");
            setSelectedLiderUsuario(usuario.idLider || null);
        }
    }, [usuario]);

    useEffect(() => {
        const fetchFilteredLideres = async () => {
            if (selectedSetor && selectedTipoUsuario === "Estagiario") {
                try {
                    const lideres = await fetchLideresBysetor(selectedSetor);
                    setFilteredLideres(lideres);

                    // Se já existe um líder selecionado no usuário, valida e seleciona
                    if (usuario && usuario.idLider) {
                        const liderJaSelecionado = lideres.find((lider) => lider.id === usuario.idLider);
                        setSelectedLiderUsuario(liderJaSelecionado ? liderJaSelecionado.id : null);
                    } else {
                        setSelectedLiderUsuario(null);
                    }
                } catch (error) {
                    console.error("Erro ao buscar líderes do setor:", error);
                }
            } else {
                setFilteredLideres([]);
                setSelectedLiderUsuario(null);
            }
        };

        fetchFilteredLideres();
    }, [selectedSetor, selectedTipoUsuario, usuario]);

    const validateFields = () => {
        const newErrors = {};
        if (!formData.nome.trim()) newErrors.nome = "Informe o nome do usuário.";
        if (!formData.email.trim()) newErrors.email = "Informe o e-mail do usuário.";
        if (!formData.senha.trim()) newErrors.senha = "Informe a senha do usuário.";
        if (!selectedTipoUsuario) newErrors.selectedTipoUsuario = "Selecione o tipo do usuário.";
        if (selectedTipoUsuario === "Estagiario" && !selectedLiderUsuario) {
            newErrors.selectedLiderUsuario = "Selecione um líder para o estagiário.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateFields()) return;

        const updatedUsuario = {
            idUsuario: usuario.idUsuario,
            tagSetor: usuario.tagSetor,
            tipo: selectedTipoUsuario,
            idLider: selectedTipoUsuario === "Estagiario" ? selectedLiderUsuario : null,
            nome: formData.nome,
            email: formData.email,
            senha: formData.senha
        };

        console.log(updatedUsuario);

        try {
            setLoading(true);
            await updateUserInfo(usuario.idUsuario, updatedUsuario); // Chamada da API
            Swal.fire("Sucesso!", "Usuário atualizado com sucesso.", "success");
            onClose(); // Fecha o modal
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            Swal.fire("Erro!", "Não foi possível atualizar o usuário.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modalOverlay" onClick={(e) => e.target.classList.contains("modalOverlay") && onClose()}>
            <div className="modalContent">
                <p className="IniciacaoTexto">
                    Atualize as informações do usuário abaixo. Certifique-se de revisar os dados antes de salvar as alterações. 😊
                </p>
                <form>
                    <div>
                        <label>
                            Tipo:
                            <select
                                value={selectedTipoUsuario}
                                onChange={(e) => setSelectedTipoUsuario(e.target.value)}
                                className={`selectField ${errors.selectedTipoUsuario ? "error" : ""}`}
                            >
                                <option value="">Selecione</option>
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
                                    className={`selectField ${errors.selectedLiderUsuario ? "error" : ""}`}
                                >
                                    <option value="">Selecione</option>
                                    {filteredLideres.map((lider) => (
                                        <option key={lider.idUsuario} value={lider.idUsuario}>
                                            {lider.nome}
                                        </option>
                                    ))}
                                </select>
                                {errors.selectedLiderUsuario && (
                                    <p className="errorText">{errors.selectedLiderUsuario}</p>
                                )}
                            </label>
                        </div>
                    )}

                    <br></br>

                    <div className="botoesEditar">
                        <button className="funcionaBotao" type="button" onClick={handleSave} disabled={loading}>
                            {loading ? "Salvando..." : "Salvar Alterações"}
                        </button>
                        <button className="funcionaBotao" type="button" onClick={onClose} style={{ marginLeft: "10px" }}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserLiderModal;
