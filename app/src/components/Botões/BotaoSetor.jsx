import React, { useState } from "react"
import "./Botoes.css"
import { fetchSetores, createSetor, } from '../../services/apiService';

const BotaoSetor = (onSectorCreated) => {
    const [showModal, setShowModal] = useState(false);
    const [tag, setTag] = useState("");
    const [nomeSetor, setNomeSetor] = useState("");
    const [errors, setErrors] = useState({});
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);

    const handleOpenModal = () => setShowModal(true);

    const handleCloseModal = () => {
        setShowModal(false);
        setNomeSetor("");
        setTag("");
        setErrors({});
        setAttemptedSubmit(false);
    };

    // Validação dos campos obrigatórios
    const validateFields = async () => {
        const newErrors = {};
        if (!tag.trim()) {
            newErrors.projeto = "Informe a tag do setor.";
        } else {
            // Verifica se a tag já existe
            try {
                const setores = await fetchSetores();
                const tagExists = setores.some((setor) => setor.tagSetor.toLowerCase() === tag.toLowerCase());
                if (tagExists) {
                    newErrors.tag = "Essa tag já existe. Por favor, escolha uma diferente.";
                }
            } catch (error) {
                console.error("Erro ao verificar tags existentes:", error);
                newErrors.tag = "Erro ao verificar a tag. Tente novamente.";
            }
        }

        if (!nomeSetor.trim()) {
            newErrors.tituloDemanda = "Informe o nome do setor.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const criarSetor = async () => {
        try {
            // Cria a novo setor
            const newSetor = {
                tagSetor: tag,
                nome: nomeSetor
            };

            await createSetor(newSetor);

            alert("Setor criado com sucesso!");
            handleCloseModal(); // Fecha o modal

            // Chama a função de recarregamento do `SectorPage`
            onSectorCreated();
        } catch (error) {
            console.error("Erro ao criar setor:", error);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("modalOverlay")) handleCloseModal();
    };

    return (
        <div className="botoesInferiores">
            <button onClick={handleOpenModal}>Cadastrar Novo Setor</button>

            {showModal && (
                <div className="modalOverlay" onClick={handleOverlayClick}>
                    <div className="modalContent">
                        <div>
                            <p className="IniciacaoTexto">
                                Cadastre um novo setor preenchendo as informações solicitadas abaixo. Certifique-se de que os dados estão corretos antes de concluir. 😊
                            </p>
                            <form>
                                <div className="AreaSolicitacao">
                                    <label className="perguntaTexto">
                                        Insira a tag do setor:
                                        <input
                                            className={attemptedSubmit && errors.tag ? "error" : ""}
                                            type="text" placeholder="Tag que será o identificador do setor"
                                            value={tag}
                                            onChange={(e) => {
                                                if (e.target.value.length <= 8) { // Limita o tamanho a 8 caracteres
                                                    setTag(e.target.value);
                                                }
                                            }}
                                            maxLength={8} />
                                        {attemptedSubmit && errors.tag && (
                                            <p className="errorText">{errors.tag}</p>
                                        )}
                                    </label>
                                </div>

                                <div className="EnvolvidosSolicitacao">
                                    <label className="perguntaTexto">
                                        Insira o nome do setor:
                                        <input
                                            className={attemptedSubmit && errors.nomeSetor ? "error" : ""}
                                            type="text" placeholder="Nome no qual o setor irá ser chamado"
                                            value={nomeSetor}
                                            onChange={(e) => setNomeSetor(e.target.value)} />
                                        {attemptedSubmit && errors.nomeSetor && (
                                            <p className="errorText">{errors.nomeSetor}</p>
                                        )}
                                    </label>
                                </div>

                                <div className="modalActions">
                                    <button name="cadastrarSetorLogo" type="submit" onClick={(e) => {
                                        e.preventDefault();
                                        setAttemptedSubmit(true);
                                        if (validateFields()) criarSetor();
                                    }}>
                                        Cadastrar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BotaoSetor;