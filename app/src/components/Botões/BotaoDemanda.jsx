import React, { useState, useEffect } from "react"
import "./Botoes.css"
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { BiSolidCheckCircle } from "react-icons/bi"
import { fetchSetores, fetchUsuarios, createDemanda, createEnvolvidoDemanda } from '../../services/apiService';

const BotaoDemanda = ({ onDemandCreated }) => {
    const [showModal, setShowModal] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const [idUser, setIdUser] = useState(""); // id usuario

    const [setores, setSetores] = useState([]); // Para armazenar opções de setores
    const [Usuarios, setUsuarios] = useState([]); // Usuários filtrados pelo setor
    const [selectedSetor, setSelectedSetor] = useState(""); // setor selecionada
    const [selectedEnvolvidos, setSelectedEnvolvidos] = useState([]); // Usuários selecionados

    const [projeto, setProjeto] = useState("");
    const [tituloDemanda, setTituloDemanda] = useState("");
    const [descricaoDemanda, setDescricaoDemanda] = useState("");
    const [urgencia, setUrgencia] = useState("");
    const [prazo, setPrazo] = useState("");

    const [errors, setErrors] = useState({});
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);

    const animatedComponents = makeAnimated();

    // Carrega dados do LocalStorage/SessionStorage
    useEffect(() => {
        const storedIdUser = localStorage.getItem("IdUsuario") || sessionStorage.getItem("IdUsuario");

        if (storedIdUser) setIdUser(storedIdUser);

    }, []);

    const handleOpenModal = () => setShowModal(true);

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentStep(1); // Resetar para a primeira etapa ao fechar
        setSelectedSetor(""); // Resetar setor
        setSelectedEnvolvidos([]); // Resetar usuários selecionados
        setProjeto("");
        setTituloDemanda("");
        setDescricaoDemanda("");
        setUrgencia("");
        setPrazo("");
        setErrors({});
        setAttemptedSubmit(false);
    };

    const nextStep = () => {
        setAttemptedSubmit(true); // Marca que o usuário tentou submeter
        if (validateFields(currentStep)) {
            setCurrentStep((prevStep) => Math.min(prevStep + 1, 3));
            setErrors({}); // Limpa os erros ao avançar
            setAttemptedSubmit(false); // Reseta a tentativa de submissão
        }
    };
    const prevStep = () => setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));

    const handleOverlayClick = (e) => {
        // Fecha o modal se o clique for na área escura
        if (e.target.classList.contains("modalOverlay")) {
            handleCloseModal();
        }
    };

    useEffect(() => {
        if (showModal) {
            const loadData = async () => {
                try {
                    const setoresData = await fetchSetores();
                    setSetores(setoresData);
                } catch (error) {
                    console.error("Erro ao carregar setores:", error);
                }

                try {
                    const usuariosData = await fetchUsuarios();
                    setUsuarios(usuariosData);
                } catch (error) {
                    console.error("Erro ao carregar usuários:", error);
                }
            };

            loadData();
        }
    }, [showModal]);

    // Validação dos campos obrigatórios
    const validateFields = (step) => {
        const newErrors = {};

        if (currentStep === 1 || step === "all") {
            if (!selectedSetor) {
                newErrors.selectedSetor = "Selecione uma área.";
            }

            if (selectedEnvolvidos.length === 0) {
                newErrors.selectedEnvolvidos = "Selecione pelo menos um usuário.";
            }
        }

        if (currentStep === 2 || step === "all") {
            if (!projeto.trim()) {
                newErrors.projeto = "Informe o tipo do projeto.";
            }

            if (!tituloDemanda.trim()) {
                newErrors.tituloDemanda = "Informe o nome do projeto.";
            }

            if (!descricaoDemanda.trim()) {
                newErrors.descricaoDemanda = "Descreva detalhadamente a demanda.";
            }
        }

        if (currentStep === 3 || step === "all") {
            if (!prazo) {
                newErrors.prazo = "Informe um prazo de entrega.";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const criarDemanda = async () => {
        try {
            // Cria a nova demanda
            const newDemanda = {
                tagSetor: selectedSetor,
                idUsuario: idUser,
                projeto,
                titulo: tituloDemanda,
                descricao: descricaoDemanda,
                urgencia: urgencia,
                dataFim: prazo, // Enviar a data de entrega como prazo
            };

            const createdDemanda = await createDemanda(newDemanda); // API retorna o `tagDemanda`

            console.log(createdDemanda);

            const tagDemanda = createdDemanda.tagDemanda;

            console.log(tagDemanda);

            // Adiciona os envolvidos na tabela `EnvolvidosDemanda`
            const envolvidosPromises = selectedEnvolvidos.map((envolvido) =>
                createEnvolvidoDemanda({ tagDemanda, tagSetor: selectedSetor, idUsuario: envolvido.value })
            );

            await Promise.all(envolvidosPromises); // Espera a criação de todos os envolvidos

            alert("Demanda criada com sucesso!");
            handleCloseModal(); // Fecha o modal

            // Chama a função de recarregamento da `DemandPage`
            if (onDemandCreated) {
                onDemandCreated();
            }
        } catch (error) {
            console.error("Erro ao criar demanda e/ou envolvidos:", error);
            alert("Erro ao criar a demanda. Tente novamente.");
        }
    };

    return (
        <div className="botoesInferiores">
            <button onClick={handleOpenModal}>Solicitar Demanda</button>

            {showModal && (
                <div className="modalOverlay" onClick={handleOverlayClick}>
                    <div className="modalContent">
                        {/* Cabeçalho com as etapas */}
                        <div className="modalSteps">
                            <span className={`step ${currentStep > 1 ? "completed" : ""} ${currentStep === 1 ? "active" : ""}`}>
                                {currentStep > 1 ? <BiSolidCheckCircle /> : "1 - "} Sobre Você
                            </span>
                            <span className={`step ${currentStep > 2 ? "completed" : ""} ${currentStep === 2 ? "active" : ""}`}>
                                {currentStep > 2 ? <BiSolidCheckCircle /> : "2 - "} Sobre a Demanda
                            </span>
                            <span className={`step ${currentStep === 3 ? "active" : ""}`}>
                                3 - Prazos
                            </span>
                        </div>

                        {/* Conteúdo das etapas */}
                        {currentStep === 1 && (
                            <div>
                                <p className="IniciacaoTexto">
                                    Precisa de uma mãozinha do Time de Design? Preencha o formulário abaixo
                                    contando um pouquinho sobre sua demanda. 😊
                                </p>
                                <form>
                                    <div className="AreaSolicitacao">
                                        <label className="perguntaTexto">
                                            Para qual área será sua solicitação?
                                            <select className={`selectSetor ${attemptedSubmit && errors.selectedSetor ? "error" : ""}`}
                                                value={selectedSetor}
                                                onChange={(e) => setSelectedSetor(e.target.value)}
                                            >
                                                <option value="">Selecione uma área</option>
                                                {setores.map((setor) => (
                                                    <option key={setor.tagSetor} value={setor.tagSetor}>
                                                        {setor.tagSetor} - {setor.nome}
                                                    </option>
                                                ))}
                                            </select>
                                            {attemptedSubmit && errors.selectedSetor && (
                                                <p className="errorText">{errors.selectedSetor}</p>
                                            )}
                                        </label>
                                    </div>

                                    <div className="EnvolvidosSolicitacao">
                                        <label className="perguntaTexto">
                                            Quem serão os envolvidos na sua solicitação?
                                            <Select className={`selectEnvolvidos ${attemptedSubmit && errors.selectedEnvolvidos ? "error" : ""}`}
                                                components={animatedComponents}
                                                isMulti
                                                options={Usuarios.map((usuario) => ({
                                                    value: usuario.idUsuario,
                                                    label: usuario.nome,
                                                }))}
                                                value={selectedEnvolvidos}
                                                onChange={setSelectedEnvolvidos}
                                                placeholder="Informe o nome dos usuários"
                                            />
                                            {attemptedSubmit && errors.selectedEnvolvidos && (
                                                <p className="errorText">{errors.selectedEnvolvidos}</p>
                                            )}
                                        </label>
                                    </div>
                                </form>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div>
                                <form>
                                    <label className="perguntaTexto">
                                        Tipo do Projeto
                                        <input
                                            className={attemptedSubmit && errors.projeto ? "error" : ""}
                                            type="text" placeholder="Projeto ao qual a demanda está relacionada"
                                            value={projeto}
                                            onChange={(e) => setProjeto(e.target.value)} />
                                        {attemptedSubmit && errors.projeto && (
                                            <p className="errorText">{errors.projeto}</p>
                                        )}
                                    </label>
                                    <label className="perguntaTexto">
                                        Nome do Projeto
                                        <input
                                            className={attemptedSubmit && errors.tituloDemanda ? "error" : ""}
                                            type="text" placeholder="Nome ao qual a demanda será chamada"
                                            value={tituloDemanda}
                                            onChange={(e) => setTituloDemanda(e.target.value)} />
                                        {attemptedSubmit && errors.tituloDemanda && (
                                            <p className="errorText">{errors.tituloDemanda}</p>
                                        )}
                                    </label>
                                    <label className="perguntaTexto">
                                        Descreva detalhadamente a sua demanda.
                                        <textarea
                                            className={attemptedSubmit && errors.descricaoDemanda ? "error" : ""}
                                            placeholder="Inclua o tipo de material a ser produzido, o objetivo do projeto e, se possível, adicione links de referência ou exemplos que possam complementar as informações e ajudar no desenvolvimento. Quanto mais detalhes, melhor será o atendimento à sua solicitação!"
                                            value={descricaoDemanda}
                                            onChange={(e) => setDescricaoDemanda(e.target.value)}
                                        />
                                        {attemptedSubmit && errors.descricaoDemanda && (
                                            <p className="errorText">{errors.descricaoDemanda}</p>
                                        )}
                                    </label>
                                    <label className="perguntaTexto">
                                        Nivel de urgencia
                                        <select
                                            className={attemptedSubmit && errors.urgencia ? "error" : ""}
                                            value={urgencia}
                                            onChange={(e) => setUrgencia(e.target.value)}
                                        >
                                            <option value="">Selecione o nível de urgência</option>
                                            <option value="alta">Alta</option>
                                            <option value="media">Média</option>
                                            <option value="baixa">Baixa</option>
                                        </select>
                                        {attemptedSubmit && errors.urgencia && (
                                            <p className="errorText">{errors.urgencia}</p>
                                        )}
                                    </label>
                                </form>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div>
                                <form>
                                    <label className="perguntaTexto">
                                        Prazo de entrega.
                                        <p className="perguntaInfo">Informe a data limite para a entrega da demanda, garantindo que tenhamos tempo suficiente para atender suas necessidades com qualidade.</p>
                                        <input
                                            className={attemptedSubmit && errors.prazo ? "error" : ""}
                                            type="date"
                                            value={prazo}
                                            onChange={(e) => setPrazo(e.target.value)} placeholder="dd/mm/aaaa" />
                                        {attemptedSubmit && errors.prazo && (
                                            <p className="errorText">{errors.prazo}</p>
                                        )}
                                    </label>
                                </form>
                            </div>
                        )}

                        {/* Botões de navegação */}
                        <div className="modalActions">
                            {currentStep > 1 && (
                                <button className="botaoVoltar" type="button" onClick={prevStep}>
                                    Voltar
                                </button>
                            )}
                            {currentStep < 3 && (
                                <button type="next" onClick={nextStep}>
                                    Continuar
                                </button>
                            )}
                            {currentStep === 3 && (
                                <button type="submit" onClick={async () => {
                                    setAttemptedSubmit(true);
                                    if (validateFields("all")) {
                                        await criarDemanda(); // Cria a demanda e os envolvidos
                                    }
                                }}>
                                    Finalizar
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BotaoDemanda;