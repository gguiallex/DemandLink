import React, { useState, useEffect } from "react"
import "./SettingsPage.css"
import axios from 'axios';
import SideMenu from "../../components/Menu/SidebarMenu"
import InfoTop from "../../components/InfoTop/InfoTop"
import { uploadProfilePicture } from "../../services/apiService";

const SettingsPage = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [idUser, setIdUser] = useState("");
    const [typeUser, setTypeUser] = useState("");
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const storedIdUser = localStorage.getItem("idUsuario") || sessionStorage.getItem("idUsuario");
        const storedTypeUser = localStorage.getItem("tipo") || sessionStorage.getItem("tipo");

        if (storedIdUser) setIdUser(storedIdUser);
        if (storedTypeUser) setTypeUser(storedTypeUser);
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
            console.log("Caminho da nova foto:", response.caminhoFotoPerfil);
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
                                        width: '150px',
                                        height: '150px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                    }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: '150px',
                                        height: '150px',
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
                            <input type="password" placeholder="Placeholder" />
                        </div>
                        <div className="input-group">
                            <label>Nova Senha</label>
                            <input type="password" placeholder="Placeholder" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage;