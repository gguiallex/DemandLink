import React, { useEffect, useState } from "react"
import "./DemandPage.css"
import SideMenu from "../../components/Menu/SidebarMenu"
import InfoTop from "../../components/InfoTop/InfoTop"
import { fetchDemandasByUser, fetchUsuariosByDemanda, updateDemandaStart, updateDemandaFinish } from "../../services/apiService";
import { SlReload } from "react-icons/sl";

const DemandPage = ({ }) => {
    const [demandas, setDemandas] = useState([]);
    const [idUser, setIdUser] = useState(""); // id usuario
    const [filteredDemandas, setFilteredDemandas] = useState([]);
    const [expandedDescription, setExpandedDescription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Carrega dados do LocalStorage/SessionStorage
    useEffect(() => {
        const storedIdUser = localStorage.getItem("IdUsuario") || sessionStorage.getItem("IdUsuario");

        if (storedIdUser) setIdUser(storedIdUser);

    }, []);

    const loadDemandas = async () => {
        try {
            setLoading(true);
            const demandasData = await fetchDemandasByUser(idUser);

            const demandasWitchUsers = await Promise.all(
                demandasData.map(async (demanda) => {
                    const usuarios = await fetchUsuariosByDemanda(demanda.tagDemanda);
                    const envolvidos = usuarios.map((user) => user.nome).join(" | ");
                    return { ...demanda, envolvidos };
                })
            );

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
            demanda.tagSetor.toLowerCase().includes(term) ||
            demanda.projeto.toLowerCase().includes(term) ||
            demanda.envolvidos.toLowerCase().includes(term) ||
            demanda.descricao.toLowerCase().includes(term)
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

    // Lógica para atualizar o status da demanda
    const handleStatusClick = async (demanda) => {
        try {
            if (demanda.status === "Não Iniciado") {
                const confirmStart = window.confirm("Você deseja iniciar esta demanda?");
                if (confirmStart) {
                    await updateDemandaStart(demanda.tagDemanda);
                    alert("Demanda iniciada com sucesso!");
                    loadDemandas(); // Recarregar demandas
                }
            } else if (demanda.status === "Em Andamento") {
                const confirmFinish = window.confirm("Você deseja finalizar esta demanda?");
                if (confirmFinish) {
                    await updateDemandaFinish(demanda.tagDemanda);
                    alert("Demanda finalizada com sucesso!");
                    loadDemandas(); // Recarregar demandas
                }
            }
        } catch (error) {
            alert(error.message || "Erro ao atualizar demanda!");
        }
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
                                            <tr key={index} className={`status-${demanda.status.replace(/\s/g, "").toLowerCase()}`}>
                                                <td>{demanda.tagDemanda}</td>
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
                                                <td><button class="status-btn"
                                                    onClick={() => handleStatusClick(demanda)}>{demanda.status}</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DemandPage;