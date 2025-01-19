import React, { useEffect, useState } from "react"
import SideMenu from "../../../../components/Menu/SidebarMenu"
import InfoTop from "../../../../components/InfoTop/InfoTop"
import BotaoSetor from "../../../../components/Botões/BotaoSetor"
import EditSectorModal from "../../../../components/Edits/EditSectorModal"
import { fetchSetores, fetchTamanhoSetor, deleteSetor } from "../../../../services/apiService";
import { BiTrash, BiEdit } from "react-icons/bi";
import { SlReload } from "react-icons/sl";

const SectorPage = () => {
    const [setores, setSetores] = useState([]);
    const [selectedSector, setSelectedSector] = useState([]);
    const [filteredSetores, setFilteredSetores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

    const handleEdit = (setor) => {
        setSelectedSector(setor); // Define o usuário selecionado
        setIsEditModalOpen(true); // Abre o modal
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

    const handleDelete = async (tagSetor, setor, tamanho) => {
        if (tamanho > 0) {
            alert(`O setor ${setor} não pode ser excluído porque ainda possui ${tamanho} membro(s).`);
            return;
        }
    
        const confirmed = window.confirm(`Tem certeza que deseja excluir o setor ${setor}?`);
    
        if (confirmed) {
            try {
                await deleteSetor(tagSetor); // Chama a API para deletar o setor
                loadSetores(); // Atualiza a lista de setores
                alert("Setor deletado com sucesso!");
            } catch (err) {
                console.error("Erro ao deletar setor:", err);
                alert("Erro ao deletar setor. Tente novamente.");
            }
        }
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
                                    placeholder="Pesquisar por tag ou setor..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className="search-input"
                                />
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
                                            <th>< SlReload style={{ cursor: "pointer" }}
                                            onClick={() => loadSetores()}/></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredSetores.map((setor) => (
                                            <tr>
                                                <td>{setor.tagSetor}</td>
                                                <td>{setor.nome}</td>
                                                <td>{setor.tamanho}</td>
                                                <td><BiEdit style={{ cursor: "pointer", color: "blue" }}
                                                        onClick={() => handleEdit(setor)}/></td>
                                                <td><BiTrash style={{ cursor: "pointer", color: "red" }}
                                                        onClick={() => handleDelete(setor.tagSetor, setor.nome, setor.tamanho)}/></td>
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
                <EditSectorModal
                    setor={selectedSector}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}
        </div>
    )
}

export default SectorPage;