import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { updateSetor } from "../../services/apiService";

const EditSectorModal = ({ setor, onClose }) => {
    const [formData, setFormData] = useState({
        tagSetor: "",
        nome: ""
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (setor) {
            console.log(setor);
            setFormData({
                tagSetor: setor.tagSetor || "",
                nome: setor.nome || ""
            });
        }
    }, [setor]);

    const validateFields = () => {
        const newErrors = {};
        if (!formData.tagSetor.trim()) newErrors.tagSetor = "Informe a tag do setor.";
        if (!formData.nome.trim()) newErrors.setor = "Informe o nome do setor.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateFields()) return;

        const updatedSetor = {
            tagSetor: formData.tagSetor,
            nome: formData.nome
        }

        try {
            setLoading(true);
            await updateSetor(setor.tagSetor, updatedSetor);
            Swal.fire("Sucesso!", "Setor atualizado com sucesso.", "success");
            onClose(); // Fecha o modal
        } catch (error) {
            console.error("Erro ao atualizar setor:", error);
            Swal.fire("Erro!", "Não foi possível atualizar o setor.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modalOverlay" onClick={(e) => e.target.classList.contains("modalOverlay") && onClose()}>
            <div className="modalContent">
                <p className="IniciacaoTexto">
                    Atualize as informações do setor abaixo. Certifique-se de revisar os dados antes de salvar as alterações. 😊
                </p>
                <form>
                    <div>
                        <label>
                            Tag do Setor:
                            <input
                                type="text"
                                value={formData.tagSetor}
                                onChange={(e) => setFormData({ ...formData, tagSetor: e.target.value })}
                                className={errors.tagSetor ? "error" : ""}
                            />
                            {errors.tagSetor && <p className="errorText">{errors.tagSetor}</p>}
                        </label>
                    </div>

                    <div>
                        <label>
                            Nome do Setor:
                            <input
                                type="text"
                                value={formData.nome}
                                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                className={errors.nome ? "error" : ""}
                            />
                            {errors.nome && <p className="errorText">{errors.nome}</p>}
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

export default EditSectorModal;