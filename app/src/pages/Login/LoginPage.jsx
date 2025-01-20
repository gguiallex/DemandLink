import React from "react"
import "./LoginPage.css"
import { login } from '../../services/authService';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BiEnvelope, BiHide } from "react-icons/bi";

const LoginPage = ({ }) => {

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        
        event.preventDefault();

        //Caso deixar campos em branco
        if (!email || !password) {
            alert('Preencha todos os campos.');
            return;
        }

        try {
            setLoading(true)

            // Faz a requisição para a API
            const response = await login(email, password, rememberMe);

            const { token, IdUsuario, Nome, Tipo, TagSetor, FotoPerfil, Email, Senha, IdLider } = response // Supondo que a API retorne um token

            const storage = rememberMe ? localStorage : sessionStorage;
            // Armazenando os dados no armazenamento local ou de sessão
            storage.setItem("authToken", token);
            storage.setItem("IdUsuario", IdUsuario);
            storage.setItem("Nome", Nome);
            storage.setItem("Tipo", Tipo);
            storage.setItem("TagSetor", TagSetor);
            storage.setItem("FotoPerfil", FotoPerfil);
            storage.setItem("Email", Email);
            storage.setItem("Senha", Senha);
            storage.setItem("IdLider", IdLider);

            setTimeout(() => {
                alert('login bem-sucedido!');
                setLoading(false);
                navigate('/Dashboard');
            }, 1000);
        } catch (err) {
            alert('algo deu errado: ' + err);
            setLoading(false);
        }
    };

    return (
        <div className="fundo">
            <div className="container">

                <div className="containerCentral">

                    <div className="centralDireito">
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="login">
                                <h1 className="tituloSite">Bem Vindo</h1>
                                <p className="subtituloSite" >Faça login para entrar!</p>
                                <div className="inputEmail">
                                    <BiEnvelope /><input type='email' placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="inputSenha">
                                    <BiHide /><input type='password' placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <br></br>
                                <div className="conectadoSenha">
                                    <label className="checkbox-container">
                                        <input 
                                        type="checkbox" 
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}/>
                                        <span className="custom-checkbox"></span>
                                        Manter-me Conectado
                                    </label>
                                </div>

                                <button className='entrar' type='submit'>Entrar</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LoginPage
