import React, { useState, useEffect } from "react"
import "./Botoes.css"
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { BiSolidCheckCircle } from "react-icons/bi"
import { fetchAreas, fetchEnvolvidosBySetor } from '../../services/apiService';

const BotaoDemanda = () => {
    const [showModal, setShowModal] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const [areas, setAreas] = useState([]); // Para armazenar opções de setores
    const [filteredEnvolvidos, setFilteredEnvolvidos] = useState([]); // Usuários filtrados pelo setor
    const [selectedArea, setSelectedArea] = useState(""); // setor selecionada
    const [selectedEnvolvidos, setSelectedEnvolvidos] = useState([]); // Usuários selecionados

    const animatedComponents = makeAnimated();

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentStep(1); // Resetar para a primeira etapa ao fechar
        setSelectedArea(""); // Resetar setor
        setSelectedEnvolvidos([]); // Resetar usuários selecionados
        setFilteredEnvolvidos([]); // Resetar a lista de usuários filtrados
    };

    const nextStep = () => setCurrentStep((prevStep) => Math.min(prevStep + 1, 3));
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
                    const areasData = await fetchAreas();
                    setAreas(areasData);
                } catch (error) {
                    console.error("Erro ao carregar setores:", error);
                }
            };

            loadData();
        }
    }, [showModal]);

    const handleSelectArea = async (event) => {
        const setorTag = event.target.value;
        setSelectedArea(setorTag);
    
        try {
          const envolvidos = await fetchEnvolvidosBySetor(setorTag);
          const formattedEnvolvidos = envolvidos.map((envolvido) => ({
            value: envolvido.idUsuario,
            label: envolvido.nome,
          }));
          setFilteredEnvolvidos(formattedEnvolvidos);
        } catch (error) {
          console.error("Erro ao carregar usuários do setor:", error);
          setFilteredEnvolvidos([]);
        }
    
        setSelectedEnvolvidos([]);
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
                                            <select className="selectSetor"
                                                value={selectedArea}
                                                onChange={handleSelectArea}
                                            >
                                                <option value="">Selecione uma área</option>
                                                {areas.map((setor) => (
                                                    <option key={setor.tagSetor} value={setor.tagSetor}>
                                                      {setor.tagSetor} - {setor.nome}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>
                                    </div>

                                    {selectedArea && (
                                        <div className="EnvolvidosSolicitacao">
                                            <label className="perguntaTexto">
                                                Quem serão os envolvidos na sua solicitação?
                                                <Select className="selectEnvolvidos"
                                                    components={animatedComponents}
                                                    isMulti
                                                    options={filteredEnvolvidos}
                                                    value={selectedEnvolvidos}
                                                    onChange={setSelectedEnvolvidos}
                                                    placeholder="Informe o nome dos usuários"
                                                />
                                            </label>
                                        </div>
                                    )}
                                </form>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div>
                                <form>
                                    <label className="perguntaTexto">
                                        Nome do Projeto
                                        <input type="text" placeholder="Projeto ao qual a demanda está relacionada" />
                                    </label>
                                    <label className="perguntaTexto">
                                        Descreva detalhadamente a sua demanda.
                                        <textarea
                                            placeholder="Inclua o tipo de material a ser produzido, o objetivo do projeto e, se possível, adicione links de referência ou exemplos que possam complementar as informações e ajudar no desenvolvimento. Quanto mais detalhes, melhor será o atendimento à sua solicitação!"
                                        />
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
                                        <input type="date" placeholder="dd/mm/aaaa" />
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
                                <button type="submit" onClick={handleCloseModal}>
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