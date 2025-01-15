import React, { useState, useEffect } from "react"
import "./SettingsPage.css"
import axios from 'axios';
import SideMenu from "../../components/Menu/SidebarMenu"
import InfoTop from "../../components/InfoTop/InfoTop"
import { API_URL, uploadProfilePicture } from "../../services/apiService";

const SettingsPage = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [idUser, setIdUser] = useState(""); // id usuario
    const [typeUser, setTypeUser] = useState(""); // tipo usuario
    const [emailUser, setEmailUser] = useState(""); // email usuario
    const [passwordUser, setPasswordUser] = useState(""); // senha usuario
    const [perfilPictureUser, setPerfilPictureUser] = useState(null); // foto de perfil do usuario
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState("");

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
        if (storedPerfilPictureUser) {
            const urlCompleta = `${API_URL}${storedPerfilPictureUser}`;
            setPerfilPictureUser(urlCompleta);
        } else {
            console.warn("Nenhuma foto de perfil encontrada no armazenamento.");
        }

    }, [])

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUpload = async () => {
        if (!selectedFile) return alert('Selecione uma foto antes de enviar.');

        const formData = new FormData();
        formData.append('profilePicture', selectedFile);

        try {
            const response = await uploadProfilePicture(idUser, formData);
            setMessage(response.message);
            setProfilePicture(response.caminhoFotoPerfil);
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
                            ) : perfilPictureUser ? (
                                <img
                                  src={perfilPictureUser}
                                  alt="Foto de Perfil"
                                  style={{
                                    width: "250px",
                                    height: "250px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                  }}
                                />
                              ) : (
                                <div
                                    style={{
                                        width: '250px',
                                        height: '250px',
                                        borderRadius: '50%',
                                        backgroundColor: '#ccc',
                                    }}
                                ></div>
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