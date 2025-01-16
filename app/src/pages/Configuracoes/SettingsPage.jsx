import React, { useState, useEffect } from "react"
import "./SettingsPage.css"
import SideMenu from "../../components/Menu/SidebarMenu"
import InfoTop from "../../components/InfoTop/InfoTop"
import { uploadProfilePicture } from "../../services/apiService";

const SettingsPage = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [idUser, setIdUser] = useState(""); // id usuario
    const [nameUser, setNameUser] = useState(""); //nome usuario
    const [typeUser, setTypeUser] = useState(""); // tipo usuario
    const [emailUser, setEmailUser] = useState(""); // email usuario
    const [passwordUser, setPasswordUser] = useState(""); // senha usuario
    const [perfilPictureUser, setPerfilPictureUser] = useState(null); // foto de perfil do usuario
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const API_URL = 'https://demand-link-backend.vercel.app';
    const DEFAULT_PROFILE_PICTURE = "/imgs/icone-padrao.png";

    // Carrega dados do LocalStorage/SessionStorage
    useEffect(() => {
        const storedIdUser = localStorage.getItem("IdUsuario") || sessionStorage.getItem("IdUsuario");
        const storedNameUser = localStorage.getItem("Nome") || sessionStorage.getItem("Nome");
        const storedTypeUser = localStorage.getItem("Tipo") || sessionStorage.getItem("Tipo");
        const storedEmailUser = localStorage.getItem("Email") || sessionStorage.getItem("Email");
        const storedPasswordUser = localStorage.getItem("Senha") || sessionStorage.getItem("Senha");
        const storedPerfilPictureUser = localStorage.getItem("FotoPerfil") || sessionStorage.getItem("FotoPerfil");

        if (storedIdUser) setIdUser(storedIdUser);
        if (storedNameUser) setNameUser(storedNameUser);
        if (storedTypeUser) setTypeUser(storedTypeUser);
        if (storedEmailUser) setEmailUser(storedEmailUser);
        if (storedPasswordUser) setPasswordUser(storedPasswordUser);

        // Verificando a foto de perfil
        if (storedPerfilPictureUser && storedPerfilPictureUser !== 'null' && storedPerfilPictureUser.trim() !== "") {
            // Corrigindo a URL da foto de perfil se não for 'null'
            const urlCompleta = storedPerfilPictureUser.startsWith("http")
                ? storedPerfilPictureUser
                : `${API_URL}${storedPerfilPictureUser.startsWith('/') ? '' : '/'}${storedPerfilPictureUser}`;
            console.log("URL completa da foto de perfil:", urlCompleta);
            setPerfilPictureUser(urlCompleta);
        } else {
            console.warn("Foto de perfil inválida ou não encontrada.");
            setPerfilPictureUser(DEFAULT_PROFILE_PICTURE); // Usando imagem padrão
        }
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUpload = async () => {
        if (!selectedFile) return alert('Selecione uma foto antes de enviar.');

        // Configuração para evitar múltiplos envios simultâneos
        setIsUploading(true);

        // Validação do tipo de arquivo
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(selectedFile.type)) {
            setMessage('Apenas imagens JPEG, PNG e JPG são permitidas.');
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        // Validação do tamanho do arquivo (limite de 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (selectedFile.size > maxSize) {
            setMessage('O arquivo não pode exceder 5MB.');
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        const formData = new FormData();
        formData.append('profilePicture', selectedFile);

        try {
            const response = await uploadProfilePicture(idUser, formData);

            setPerfilPictureUser(response.caminhoFotoPerfil);
            setMessage("Foto de perfil modificada com sucesso!");
            localStorage.setItem("FotoPerfil", response.caminhoFotoPerfil);

            // Limpar pré-visualização após sucesso
            setPreview(null);
            setSelectedFile(null);
        } catch (error) {
            setMessage("Erro ao enviar a foto de perfil. Tente novamente.");
            setTimeout(() => setMessage(""), 3000);
        } finally {
            setIsUploading(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
        setFormData({
            name: nameUser,
            email: emailUser,
            password: passwordUser,
        });
    };

    const handleSave = () => {
        setIsEditing(false);
        setNameUser(dormData.name);
        setEmailUser(formData.email);
        setPasswordUser(formData.password);
        setMessage("Informações atualizadas com sucesso!");
        setTimeout(() => setMessage(""), 3000);

        // Salvar as informações no LocalStorage
        localStorage.setItem("Nome", formData.name);
        localStorage.setItem("Email", formData.email);
        localStorage.setItem("Senha", formData.password);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({
            name: nameUser,
            email: emailUser,
            password: passwordUser,
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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
                            <button className="edit-photo-button" onClick={handleUpload}
                                disabled={isUploading || !selectedFile}>
                                {isUploading ? 'Enviando...' : 'Enviar Foto'}
                            </button>
                        )}
                    </div>
                    <div className="form-section">
                        {!isEditing ? (
                            <>
                                <div className="input-group">
                                    <label>Usuário</label>
                                    <p>{nameUser}</p>
                                </div>
                                <div className="input-group">
                                    <label>E-mail</label>
                                    <p>{emailUser}</p>
                                </div>
                                <div className="input-group">
                                    <label>Senha</label>
                                    <p>{'*'.repeat(passwordUser.length)}</p>
                                </div>
                                <button className="edit-photo-button" onClick={handleEdit}>Editar Informações</button>
                            </>
                        ) : (
                            <>
                                <div className="input-group">
                                    <label>Nome</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                                </div>
                                <div className="input-group">
                                    <label>E-mail</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                                </div>
                                <div className="input-group">
                                    <label>Nova Senha</label>
                                    <input type="password" name="password" onChange={handleChange} />
                                </div>
                                <div className="input-group">
                                    <label>Senha Atual</label>
                                    <input type="password" name="password" onChange={handleChange} />
                                </div>
                                <div className="button-forms-edit">
                                <button className="edit-photo-button" onClick={handleSave}>Salvar</button>
                                <button className="edit-photo-button" onClick={handleCancel}>Cancelar</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default SettingsPage;