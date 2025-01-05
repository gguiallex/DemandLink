import React from "react"
import "./LoginPage.css"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BiEnvelope, BiHide } from "react-icons/bi";

const LoginPage = ({ }) => {

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        
        event.preventDefault();

        //Caso deixar campos em branco
        if (!email || !password) {
            alert('Preencha todos os campos.');
            return;
        }

        //verifica o vetor se há uma conta com as credenciais informadas
        //const contaExiste = contas.find(conta => conta.email === email && conta.password === password);

        //caso não existir
        /* if(!contaExiste){
           alert('Usuário ou senha incorretos.')
           return;
         }*/

        try {
            setLoading(true)
            setTimeout(() => {
                alert('login bem sucedido');
                setLoading(false);
                //Armazena o email utilizado no login
                //setEmailLogado(email);
                navigate('/');
            }, 1000);
        } catch (err) {
            alert('algo deu errado: ' + err);
            setLoading(false);
        }

    }

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
                                <div className="conectadoSenha">
                                    <label className="checkbox-container">
                                        <input type="checkbox" />
                                        <span className="custom-checkbox"></span>
                                        Manter-me Conectado
                                    </label>
                                    <a href="/" className="esqueceuSenha">Esqueci a senha!</a>
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
