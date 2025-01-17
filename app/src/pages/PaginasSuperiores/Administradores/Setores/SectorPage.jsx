import React, { useEffect, useState } from "react"
import SideMenu from "../../../../components/Menu/SidebarMenu"
import InfoTop from "../../../../components/InfoTop/InfoTop"
import BotaoSetor from "../../../../components/Botões/BotaoSetor"
import { fetchSetores, fetchTamanhoSetor } from "../../../../services/apiService";
import { BiTrash, BiEdit } from "react-icons/bi";

const SectorPage = () => {
    const [setores, setSetores] = useState([]);
    const [filteredSetores, setFilteredSetores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        loadSetores();
    }, []);

    const loadSetores = async () => {
        try {
            setLoading(true);
            console.log("Iniciando o carregamento dos setores...");
            const setoresData = await fetchSetores();
            console.log("Setores carregados:", setoresData);

            const setoresComQuantidade = await Promise.all(
                setoresData.map(async (setor) => {
                    try {
                        const tamanho = await fetchTamanhoSetor(setor.tagSetor);
                        console.log(`Tamanho para ${setor.tagSetor}:`, tamanho);
                        return { ...setor, tamanho };
                    } catch (error) {
                        console.error(`Erro ao carregar tamanho do setor ${setor.tagSetor}:`, error);
                        throw error;
                    }
                })
            );

            setSetores(setoresComQuantidade);
            setFilteredSetores(setoresComQuantidade);
            console.log("Setores com quantidade de membros:", setoresComQuantidade);
        } catch (err) {
            console.error("Erro ao carregar setores:", err);
            setError(err);
        } finally {
            setLoading(false);
            console.log("Carregamento finalizado.");
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        // Filtrar as demandas com base no termo digitado
        const filtered = setores.filter((setor) =>
            setor.tagSetor.toLowerCase().includes(term) ||
            setor.nome.toLowerCase().includes(term)
        );

        setFilteredSetores(filtered);
    };

    return (
        <div className="container-inicio">
            <div className="menuLateral">
                <SideMenu />
            </div>

            <div className="info">
                <InfoTop />
                <div div className="infosPrincipais">
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
                            <BotaoSetor onSectorCreated={loadSetores} />
                        </div>
                        {/* Verificação de carregamento ou erro */}
                        {loading ? (
                            <div className="loading-message">Carregando...</div>
                        ) : error ? (
                            <div className="error-message">
                                <p>Erro: Não foi possível carregar os setores.</p>
                                <p>Tente novamente mais tarde.</p>
                            </div>
                        ) : (
                            <div class="table-container">
                                <table class="custom-table">
                                    <thead>
                                        <tr>
                                            <th>Tag</th>
                                            <th>Setor</th>
                                            <th>Quantidade de Membros</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredSetores.map((setor) => (
                                            <tr>
                                                <td>{setor.tagSetor}</td>
                                                <td>{setor.nome}</td>
                                                <td>{setor.tamanho}</td>
                                                <td><BiEdit/></td>
                                                <td><BiTrash /></td>
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

export default SectorPage;