import React, { useEffect, useState } from "react"
import "./ReportPage.css"
import SideMenu from "../../components/Menu/SidebarMenu"
import InfoTop from "../../components/InfoTop/InfoTop"
import BotaoDemanda from "../../components/Botões/BotaoDemanda"
import EditDemandModal from "../../components/Edits/EditDemandModal";
import { fetchUsuariosByDemanda, fetchDemandasByCreator, deleteDemanda, fetchSetores } from "../../services/apiService";
import Swal from "sweetalert2";
import { SlReload } from "react-icons/sl";

const ReportPage = ({ }) => {
    const [demandas, setDemandas] = useState([]);
    const [setores, setSetores] = useState([]);
    const [idUser, setIdUser] = useState(""); // id usuario
    const [filteredDemandas, setFilteredDemandas] = useState([]);
    const [expandedDescription, setExpandedDescription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDemanda, setSelectedDemanda] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        const storedIdUser = localStorage.getItem("IdUsuario") || sessionStorage.getItem("IdUsuario");

        if (storedIdUser) setIdUser(storedIdUser);

    }, []);

    const loadDemandas = async () => {
        try {
            setLoading(true);
            const demandasData = await fetchDemandasByCreator(idUser);
            const setoresData = await fetchSetores();

            const demandasWitchUsers = await Promise.all(
                demandasData.map(async (demanda) => {
                    const usuarios = await fetchUsuariosByDemanda(demanda.tagDemanda);
                    const envolvidos = usuarios.map((user) => user.nome).join(" | ");
                    return { ...demanda, envolvidos };
                })
            );

            setSetores(setoresData);
            setDemandas(demandasWitchUsers);
            setFilteredDemandas(demandasWitchUsers);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (idUser) {
            loadDemandas();
        }
    }, [idUser]);

    const handleDeleteDemanda = async (tagDemanda) => {
        try {
            await deleteDemanda(tagDemanda);
            Swal.fire("Sucesso!", "Demanda apagada com sucesso.", "success");
            loadDemandas();
        } catch (error) {
            console.error("Erro ao apagar demanda:", error);
            Swal.fire("Erro!", "Não foi possível apagar a demanda.", "error");
        }
    };

    const formatDate = (date) => {
        const options = {
            day: "2-digit",
            month: "2-digit",
        };
        return new Intl.DateTimeFormat('pt-BR', options).format(new Date(date));
    };

    const toggleDescription = (tagDemanda) => {
        setExpandedDescription((prev) => (prev === tagDemanda ? null : tagDemanda));
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        // Filtrar as demandas com base no termo digitado
        const filtered = demandas.filter((demanda) =>
            demanda.tagDemanda.toLowerCase().includes(term) ||
            demanda.tagSetor.toLowerCase().includes(term) ||
            demanda.projeto.toLowerCase().includes(term) ||
            demanda.envolvidos.toLowerCase().includes(term) ||
            demanda.descricao.toLowerCase().includes(term) // Opcional: busca também na descrição
        );

        setFilteredDemandas(filtered);
    };

    const sortedDemandas = [...filteredDemandas].sort((a, b) => {
        const statusPriority = {
            "Em Atraso": 0, // Maior prioridade (fica no topo)
            "Não Iniciado": 1,
            "Em Andamento": 2,
            "Concluído": 3, // Menor prioridade (fica no final)
        };

        return statusPriority[a.status] - statusPriority[b.status];
    });

    const handleTagClick = (demanda) => {
        Swal.fire({
            title: "O que deseja fazer?",
            showCancelButton: true,
            showDenyButton: true,
            showConfirmButton: true,
            confirmButtonText: "Editar",
            denyButtonText: "Apagar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                setSelectedDemanda(demanda);
                setIsEditModalOpen(true);
            } else if (result.isDenied) {
                handleDeleteDemanda(demanda.tagDemanda);
            }
        });
    };

    return (
        <div className="container-inicio">
            <div className="menuLateral">
                <SideMenu />
            </div>

            <div className="info">
                <InfoTop />
                <div className="infosPrincipais">
                    <div className="NovaDemanda">
                        <div className="search-bar-container">
                            <div className="search-bar">
                                <input
                                    type="text"
                                    placeholder="Pesquisar por setor, projeto, envolvidos..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className="search-input"
                                />
                            </div>
                            <BotaoDemanda onDemandCreated={loadDemandas} />
                        </div>

                        {/* Verificação de carregamento ou erro */}
                        {loading ? (
                            <div className="loading-message">Carregando...</div>
                        ) : error ? (
                            <div className="error-message">
                                <p>Erro: Não foi possível carregar as demandas.</p>
                                <p>Tente novamente mais tarde.</p>
                            </div>
                        ) : (
                            <div class="table-container">
                                <table class="custom-table">
                                    <thead>
                                        <tr>
                                            <th>Tag</th>
                                            <th>Setor</th>
                                            <th>Projeto</th>
                                            <th>Nome</th>
                                            <th>Descrição</th>
                                            <th>Envolvidos</th>
                                            <th>Entrega</th>
                                            <th>Urgência</th>
                                            <th>Status</th>
                                            <th>< SlReload style={{ cursor: "pointer" }}
                                                onClick={() => loadDemandas()} /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedDemandas.map((demanda, index) => (
                                            <tr key={index}>
                                                <td><button className="status-btn"
                                                    onClick={() => handleTagClick(demanda)}>
                                                    {demanda.tagDemanda}</button></td>
                                                <td>{demanda.tagSetor}</td>
                                                <td>{demanda.projeto}</td>
                                                <td>{demanda.titulo}</td>
                                                <td onClick={() => toggleDescription(demanda.tagDemanda)}>
                                                    {expandedDescription === demanda.tagDemanda
                                                        ? demanda.descricao
                                                        : `${demanda.descricao.substring(0, 50)}...`}
                                                </td>
                                                <td>{demanda.envolvidos}</td>
                                                <td>{formatDate(demanda.dataFim)}</td>
                                                <td>{demanda.urgencia}</td>
                                                <td>{demanda.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isEditModalOpen && (
                <EditDemandModal
                    demanda={selectedDemanda}
                    setores={setores}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}
        </div>
    )
}

export default ReportPage;