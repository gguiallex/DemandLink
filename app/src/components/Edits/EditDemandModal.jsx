import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { updateDemanda } from "../../services/apiService";

const EditDemandModal = ({ demanda, setores, onClose }) => {
    const [formData, setFormData] = useState({
        tagDemanda: "",
        tagSetor: "",
        projeto: "",
        titulo: "",
        descricao: "",
        urgencia: "",
        dataFim: ""
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (demanda) {
            console.log(demanda);
            setFormData({
                tagSetor: demanda.tagSetor || "",
                projeto: demanda.projeto || "",
                titulo: demanda.titulo || "",
                descricao: demanda.descricao || "",
                urgencia: demanda.urgencia || "Média",
                dataFim: demanda.dataFim ? demanda.dataFim.split("T")[0] : ""
            });
        }
    }, [demanda]);

    const validateFields = () => {
        const newErrors = {};
        if (!formData.tagSetor.trim()) newErrors.tagSetor = "Informe o setor.";
        if (!formData.projeto.trim()) newErrors.projeto = "Informe o projeto.";
        if (!formData.titulo.trim()) newErrors.titulo = "Informe o título da demanda.";
        if (!formData.descricao.trim()) newErrors.descricao = "Informe a descrição da demanda.";
        if (!formData.urgencia) newErrors.urgencia = "Selecione a urgência.";
        if (!formData.dataFim) newErrors.status = "Selecione a data.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateFields()) return;

        const updatedDemanda = {
            tagSetor: formData.tagSetor,
            projeto: formData.projeto,
            titulo: formData.titulo,
            descricao: formData.descricao,
            urgencia: formData.urgencia,
            dataFim: formData.dataFim.split("T")[0]
        }

        try {
            setLoading(true);
            await updateDemanda(demanda.tagDemanda, updatedDemanda);
            Swal.fire("Sucesso!", "Demanda atualizada com sucesso.", "success");
            onClose(); // Fecha o modal
        } catch (error) {
            console.error("Erro ao atualizar demanda:", error);
            Swal.fire("Erro!", "Não foi possível atualizar a demanda.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modalOverlay" onClick={(e) => e.target.classList.contains("modalOverlay") && onClose()}>
            <div className="modalContent">
                <p className="IniciacaoTexto">
                    Atualize as informações da demanda abaixo. Certifique-se de revisar os dados antes de salvar as alterações. 😊
                </p>
                <form>
                    <div>
                        <label>
                            Setor:
                            <select
                                value={formData.tagSetor}
                                onChange={(e) => setFormData({ ...formData, tagSetor: e.target.value })}
                                className={`selectField ${errors.tagSetor ? "error" : ""}`}
                            >
                                <option value="">Selecione</option>
                                {setores.map((setor) => (
                                    <option key={setor.tagSetor} value={setor.tagSetor}>
                                        {setor.nome}
                                    </option>
                                ))}
                            </select>
                            {errors.tagSetor && <p className="errorText">{errors.tagSetor}</p>}
                        </label>
                    </div>

                    <div>
                        <label>
                            Projeto:
                            <input
                                type="text"
                                value={formData.projeto}
                                onChange={(e) => setFormData({ ...formData, projeto: e.target.value })}
                                className={errors.projeto ? "error" : ""}
                            />
                            {errors.projeto && <p className="errorText">{errors.projeto}</p>}
                        </label>
                    </div>

                    <div>
                        <label>
                            Título:
                            <input
                                type="text"
                                value={formData.titulo}
                                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                                className={errors.titulo ? "error" : ""}
                            />
                            {errors.titulo && <p className="errorText">{errors.titulo}</p>}
                        </label>
                    </div>

                    <div>
                        <label>
                            Descrição:
                            <textarea
                                value={formData.descricao}
                                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                                className={errors.descricao ? "error" : ""}
                            />
                            {errors.descricao && <p className="errorText">{errors.descricao}</p>}
                        </label>
                    </div>

                    <div>
                        <label>
                            Urgência:
                            <select
                                value={formData.urgencia}
                                onChange={(e) => setFormData({ ...formData, urgencia: e.target.value })}
                                className={`selectField ${errors.urgencia ? "error" : ""}`}
                            >
                                <option value="">Selecione</option>
                                <option value="baixa">Baixa</option>
                                <option value="media">Média</option>
                                <option value="alta">Alta</option>
                            </select>
                            {errors.urgencia && <p className="errorText">{errors.urgencia}</p>}
                        </label>
                    </div>

                    <div>
                        <label>
                            Data de Entrega:
                            <input
                            type="date"
                                value={formData.dataFim}
                                onChange={(e) => setFormData({ ...formData, dataFim: e.target.value })}
                                className={`selectField ${errors.dataFim ? "error" : ""}`}
                            >
                            </input>
                            {errors.status && <p className="errorText">{errors.status}</p>}
                        </label>
                    </div>

                    <br />

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

export default EditDemandModal;