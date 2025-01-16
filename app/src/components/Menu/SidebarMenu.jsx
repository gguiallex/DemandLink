import React, { useState, useEffect } from "react";
import "./SidebarMenu.css";
import { useNavigate, useLocation } from "react-router-dom";
import { BiCategory, BiChevronsRight, BiChevronsLeft, BiFile, BiBarChartAlt2, BiCog, BiLogOut, BiClinic } from "react-icons/bi";

const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedState = localStorage.getItem("sidebarState");
    if (savedState !== null) {
      setIsOpen(savedState === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarState", isOpen.toString());
  }, [isOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Remove dados de autenticação
    localStorage.clear(); // Limpa todos os dados do localStorage
    sessionStorage.clear(); // Limpa todos os dados do sessionStorage
    // Redireciona para a página de login
    navigate("/");
  };

  // Verifica se a rota atual corresponde à rota do item
  const isActive = (path) => location.pathname === path;

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="header">
        {!isOpen && <h2>DL</h2> }
        {isOpen && <h2>DemandLink</h2>}
        <button className="toggle-button" onClick={toggleSidebar}>
          {isOpen ? <BiChevronsLeft /> : <BiChevronsRight/>}
        </button>
      </div>
      <div className="menu">
        <div className={`menu-item ${isActive("/Dashboard") ? "active" : ""}`} onClick={() => navigate("/Dashboard")}>
          <i className="icon"><BiCategory/></i>
          {isOpen && <span>Dashboard</span>}
        </div>
        <div className={`menu-item ${isActive("/Demandas") ? "active" : ""}`} onClick={() => navigate("/Demandas")}>
          <i className="icon"><BiFile/></i>
          {isOpen && <span>Minhas Demandas</span>}
        </div>
        <div className={`menu-item ${isActive("/Solicitacoes") ? "active" : ""}`} onClick={() => navigate("/Solicitacoes")}>
          <i className="icon"><BiBarChartAlt2/></i>
          {isOpen && <span>Solicitações</span>}
        </div>
        <div className={`menu-item ${isActive("/Configuracoes") ? "active" : ""}`} onClick={() => navigate("/Configuracoes")}>
          <i className="icon"><BiCog/></i>
          {isOpen && <span>Configurações</span>}
        </div>
        <div className="menu-item" onClick={handleLogout}>
          <i className="icon"><BiLogOut/></i>
          {isOpen && <span>Sair</span>}
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;