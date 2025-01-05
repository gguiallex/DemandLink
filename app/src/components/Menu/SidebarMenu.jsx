import React, { useState } from "react";
import "./SidebarMenu.css";
import { BiCategory, BiChevronsRight, BiChevronsLeft, BiFile, BiBarChartAlt2, BiCog, BiLogOut, BiClinic } from "react-icons/bi";

const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (event) => {
        
    event.preventDefault();

    //Caso deixar campos em branco

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
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="header">
        {!isOpen && <h2>DL.</h2> }
        {isOpen && <h2>DemandLink</h2>}
        <button className="toggle-button" onClick={toggleSidebar}>
          {isOpen ? <BiChevronsLeft /> : <BiChevronsRight/>}
        </button>
      </div>
      <div className="menu">
        <div className="menu-item">
          <i className="icon"><BiCategory/></i>
          {isOpen && <span>Dashboard</span>}
        </div>
        <div className="menu-item">
          <i className="icon"><BiFile/></i>
          {isOpen && <span>Minhas Demandas</span>}
        </div>
        <div className="menu-item">
          <i className="icon"><BiBarChartAlt2/></i>
          {isOpen && <span>Relatórios</span>}
        </div>
        <div className="menu-item">
          <i className="icon"><BiCog/></i>
          {isOpen && <span>Configurações</span>}
        </div>
        <div className="menu-item">
          <i className="icon"><BiLogOut/></i>
          {isOpen && <span>Sair</span>}
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;