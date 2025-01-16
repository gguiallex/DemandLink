import React, { useState, useEffect } from "react"
import "./SettingsPage.css"
import SideMenu from "../../components/Menu/SidebarMenu"
import InfoTop from "../../components/InfoTop/InfoTop"
import { uploadProfilePicture } from "../../services/apiService";

const SettingsPage = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [idUser, setIdUser] = useState(""); // id usuario
    const [typeUser, setTypeUser] = useState(""); // tipo usuario
    const [emailUser, setEmailUser] = useState(""); // email usuario
    const [passwordUser, setPasswordUser] = useState(""); // senha usuario
    const [perfilPictureUser, setPerfilPictureUser] = useState(null); // foto de perfil do usuario
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState("");


    const API_URL = 'https://demand-link-backend.vercel.app';
    const DEFAULT_PROFILE_PICTURE = "/imgs/icone-padrao.png";

    // Carrega dados do LocalStorage/SessionStorage
    useEffect(() => {
        const storedIdUser = localStorage.getItem("IdUsuario") || sessionStorage.getItem("IdUsuario");
        const storedTypeUser = localStorage.getItem("Tipo") || sessionStorage.getItem("Tipo");
        const storedEmailUser = localStorage.getItem("Email") || sessionStorage.getItem("Email");
        const storedPasswordUser = localStorage.getItem("Senha") || sessionStorage.getItem("Senha");
        const storedPerfilPictureUser = localStorage.getItem("FotoPerfil") || sessionStorage.getItem("FotoPerfil");

        if (storedIdUser) setIdUser(storedIdUser);
        if (storedTypeUser) setTypeUser(storedTypeUser);
        if (storedEmailUser) setEmailUser(storedEmailUser);
        if (storedPasswordUser) setPasswordUser(storedPasswordUser);
        
        // Verificando se storedPerfilPictureUser não é null nem vazio
        if (storedPerfilPictureUser && storedPerfilPictureUser.trim() !== "") {
            const urlCompleta = `${API_URL}${storedPerfilPictureUser}`;
            setPerfilPictureUser(urlCompleta);
        } else {
            console.warn("Nenhuma foto de perfil encontrada no armazenamento.");
            setPerfilPictureUser(DEFAULT_PROFILE_PICTURE);
        }

    }, [])

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUpload = async () => {
        if (!selectedFile) return alert('Selecione uma foto antes de enviar.');

        // Validação do tipo de arquivo
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(selectedFile.type)) {
            return alert('Apenas imagens JPEG, PNG e JPG são permitidas.');
        }

        // Validação do tamanho do arquivo (limite de 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (selectedFile.size > maxSize) {
            return alert('O arquivo não pode exceder 5MB.');
        }
        const formData = new FormData();
        formData.append('profilePicture', selectedFile);

        try {
            const response = await uploadProfilePicture(idUser, formData);
            setMessage("Foto de perfil modificada com sucesso!");
            setProfilePicture(response.caminhoFotoPerfil);
            localStorage.setItem("FotoPerfil", response.caminhoFotoPerfil);
        } catch (error) {
            setMessage("Erro ao enviar a foto de perfil.");
        }
    };

    // Limpa o URL da pré-visualização para evitar vazamento de memória
    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    return (
        <div className="container-inicio">
            <div className="menuLateral">
                <SideMenu />
            </div>

            <div className="info">
                <InfoTop />
                <div className="infosPrincipaisSettings">
                    <div className="profile-section">
                        <div className="profile-photo">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    style={{
                                        width: '250px',
                                        height: '250px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                    }}
                                />
                            ) : (
                                <img
                                    src={perfilPictureUser || DEFAULT_PROFILE_PICTURE}
                                    alt="Foto de Perfil"
                                    style={{
                                        width: "250px",
                                        height: "250px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                    }}
                                />
                            )}
                        </div>
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            id="profile-photo-input"
                            onChange={handleFileChange}
                        />
                        <button className="edit-photo-button" onClick={() => document.getElementById('profile-photo-input').click()}>Editar foto de Perfil</button>
                        {selectedFile && (
                            <button className="edit-photo-button" onClick={handleUpload}>
                                Enviar Foto
                            </button>
                        )}
                    </div>
                    <div className="form-section">
                        <div className="input-group">
                            <label>Usuário</label>
                            <input type="text" placeholder="Placeholder" />
                        </div>
                        <div className="input-group">
                            <label>E-mail</label>
                            <input type="email" placeholder="Placeholder" />
                        </div>
                        <div className="input-group">
                            <label>Senha</label>
                            <input type="password" placeholder="Digite sua senha atual..." />
                        </div>
                        <div className="input-group">
                            <label>Nova Senha</label>
                            <input type="password" placeholder="Digite sua nova senha..." />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage;