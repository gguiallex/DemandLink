import React, { useEffect, useState } from "react"
import SideMenu from "../../../../components/Menu/SidebarMenu"
import InfoTop from "../../../../components/InfoTop/InfoTop"
import { fetchUsuariosByLider, deleteUsuario } from "../../../../services/apiService";
import { BiTrash, BiEdit } from "react-icons/bi";
import { SlReload } from "react-icons/sl";
import EditUserLiderModal from "../../../../components/Edits/EditUserLiderModal";

const LeadersPage = () => {
    const [idUser, setIdUser] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [filteredUsuarios, setFilteredUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("")
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedUsuario, setSelectedUsuario] = useState(null);

    useEffect(() => {
        const storedIdUser = localStorage.getItem("IdUsuario") || sessionStorage.getItem("IdUsuario");

        if (storedIdUser) setIdUser(storedIdUser);

        if (idUser) {
            loadUsuarios();  // Somente chama loadUsuarios após idUser ser definido
        }
    }, [idUser]);

    const loadUsuarios = async () => {
        try {
            setLoading(true);
            const usuariosData = await fetchUsuariosByLider(idUser);

            setUsuarios(usuariosData);
            setFilteredUsuarios(usuariosData);
        } catch (err) {
            console.error("Erro ao carregar usuarios:", err);
            setError(err);
        } finally {
            setLoading(false);
            console.log("Carregamento finalizado.");
        }
    };

        const handleDelete = async (idUsuario, nome) => {
            const confirmed = window.confirm(`Tem certeza que deseja excluir o usuário ${nome}?`);
    
            if (confirmed) {
                try {
                    await deleteUsuario(idUsuario); // Chama a API para deletar o usuário
                    loadUsuarios(); // Atualiza a lista de usuários
                    alert("Usuário deletado com sucesso!");
                } catch (err) {
                    console.error("Erro ao deletar usuário:", err);
                    alert("Erro ao deletar usuário. Tente novamente.");
                }
            }
        };

        const handleEdit = (usuario) => {
            setSelectedUsuario(usuario); // Define o usuário selecionado
            setEditModalOpen(true); // Abre o modal
        };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        // Filtrar os usuarios com base no termo digitado
        const filtered = usuarios.filter((usuario) =>
            usuario.tagSetor.toLowerCase().includes(term) ||
            usuario.nome.toLowerCase().includes(term)
        );

        setFilteredUsuarios(filtered);
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
                                    placeholder="Pesquisar por nome..."
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
                                <p>Erro: Não foi possível carregar os usuários.</p>
                                <p>Tente novamente mais tarde.</p>
                            </div>
                        ) : (
                            <div class="table-container">
                                <table class="custom-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome</th>
                                            <th>Setor</th>
                                            <th>Tipo</th>
                                            <th></th>
                                            <th>< SlReload style={{ cursor: "pointer" }}
                                                onClick={() => loadUsuarios()} /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsuarios.map((usuario) => (
                                            <tr>
                                                <td>{usuario.idUsuario}</td>
                                                <td>{usuario.nome}</td>
                                                <td>{usuario.tagSetor}</td>
                                                <td>{usuario.tipo}</td>
                                                <td><BiEdit style={{ cursor: "pointer", color: "blue" }}
                                                    onClick={() => handleEdit(usuario)} /></td>
                                                <td><BiTrash style={{ cursor: "pointer", color: "red" }}
                                                    onClick={() => handleDelete(usuario.idUsuario, usuario.nome)} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de Edição */}
            {editModalOpen && (
                <EditUserLiderModal
                    usuario={selectedUsuario}
                    onClose={() => setEditModalOpen(false)}
                />
            )}
        </div>
    )
}

export default LeadersPage;