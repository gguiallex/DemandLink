import React, { useEffect, useState } from "react"
import SideMenu from "../../../../components/Menu/SidebarMenu"
import InfoTop from "../../../../components/InfoTop/InfoTop"
import BotaoUsuario from "../../../../components/Botões/BotaoUsuario"
import { fetchUsuarios, fetchSetores, deleteUsuario, updateUserInfo } from "../../../../services/apiService";
import { BiTrash, BiEdit } from "react-icons/bi";
import EditUserModal from "../../../../components/Edits/EditUserModal";
import { SlReload } from "react-icons/sl";

const UsersPage = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [setores, setSetores] = useState([]);
    const [lideres, setLideres] = useState([]);
    const [filteredUsuarios, setFilteredUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedUsuario, setSelectedUsuario] = useState(null);

    useEffect(() => {
        loadUsuarios();
    }, []);

    const loadUsuarios = async () => {
        try {
            setLoading(true);

            // Fetch usuários e setores em paralelo
            const [usuariosData, setoresData] = await Promise.all([
                fetchUsuarios(),
                fetchSetores(),
            ]);

            // Criar um mapeamento de idUsuario -> nome do lider
            const usuariosMap = usuariosData.reduce((acc, usuario) => {
                if (usuario.idUsuario) {
                    acc[usuario.idUsuario] = usuario.nome; // Mapeia o idUsuario para o nome
                }
                return acc;
            }, {});

            // Mapear usuários para adicionar o nome do líder diretamente da lista de usuários
            const usuariosComNomeLider = usuariosData.map((usuario) => {
                const nomeLider = usuario.idLider ? usuariosMap[usuario.idLider] : ""; // Procura pelo nome do líder
                return { ...usuario, nomeLider };
            });

            // Atualiza o estado com os dados carregados
            setSetores(setoresData);
            setUsuarios(usuariosComNomeLider);
            setFilteredUsuarios(usuariosComNomeLider);
        } catch (err) {
            console.error("Erro ao carregar usuários:", err);
            setError(err); // Atualiza o estado de erro para exibir um feedback na interface
        } finally {
            setLoading(false); // Finaliza o estado de carregamento
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

        // Filtrar as demandas com base no termo digitado
        const filtered = usuarios.filter((usuario) =>
            usuario.tagSetor.toLowerCase().includes(term) ||
            usuario.nome.toLowerCase().includes(term) ||
            usuario.tipo.toLowerCase().includes(term) ||
            usuario.nomeLider.toLowerCase().includes(term)
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
                                    placeholder="Pesquisar por setor, nome, tipo..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className="search-input"
                                />
                            </div>
                            <BotaoUsuario onSectorCreated={loadUsuarios} />
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
                                            <th>Lider</th>
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
                                                <td>{usuario.nomeLider}</td>
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
                <EditUserModal
                    usuario={selectedUsuario}
                    setores={setores}
                    lideres={lideres}
                    onClose={() => setEditModalOpen(false)}
                />
            )}
        </div>
    )
}

export default UsersPage;