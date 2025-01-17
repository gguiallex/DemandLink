import React, { useEffect, useState } from "react"
import "./ReportPage.css"
import SideMenu from "../../components/Menu/SidebarMenu"
import InfoTop from "../../components/InfoTop/InfoTop"
import BotaoDemanda from "../../components/Botões/BotaoDemanda"
import { fetchUsuariosByDemanda, fetchDemandasByCreator } from "../../services/apiService";


const ReportPage = ({ }) => {
    const [demandas, setDemandas] = useState([]);
    const [idUser, setIdUser] = useState(""); // id usuario
    const [filteredDemandas, setFilteredDemandas] = useState([]);
    const [expandedDescription, setExpandedDescription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const storedIdUser = localStorage.getItem("IdUsuario") || sessionStorage.getItem("IdUsuario");

        if (storedIdUser) setIdUser(storedIdUser);

    }, []);

    const loadDemandas = async () => {
        try {
            setLoading(true);
            const demandasData = await fetchDemandasByCreator(idUser);

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
            demanda.descricao.toLowerCase().includes(term) // Opcional: busca também na descrição
        );

        setFilteredDemandas(filtered);
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
                                <button className="filter-button">
                                    <span className="filter-icon">🔍</span> Filter
                                </button>
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
                                            <th>Descrição</th>
                                            <th>Envolvidos</th>
                                            <th>Entrega</th>
                                            <th>Urgência</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredDemandas.map((demanda, index) => (
                                            <tr key={index}>
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
                                                <td><button class="status-btn">{demanda.status}</button></td>
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

export default ReportPage;