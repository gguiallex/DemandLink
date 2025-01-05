import React, { useState } from "react";
import "./SidebarMenu.css";

const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="header">
        <h2>DemandLink</h2>
        <button className="toggle-button" onClick={toggleSidebar}>
          {isOpen ? "<<" : ">>"}
        </button>
      </div>
      <div className="menu">
        <div className="menu-item">
          <i className="icon">🏠</i>
          {isOpen && <span>Dashboard</span>}
        </div>
        <div className="menu-item">
          <i className="icon">📄</i>
          {isOpen && <span>Minhas Demandas</span>}
        </div>
        <div className="menu-item">
          <i className="icon">📊</i>
          {isOpen && <span>Relatórios</span>}
        </div>
        <div className="menu-item">
          <i className="icon">⚙️</i>
          {isOpen && <span>Configurações</span>}
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;