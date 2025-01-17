import React, { useState, useEffect } from "react"
import "./InfoTop.css"
import { BiCalendarAlt, BiUser, BiBell } from "react-icons/bi"

const InfoTop = () => {

      const [date, setDate] = useState(new Date());
      const [userName, setUserName] = useState("");
      const [userType, setUserType] = useState('');
      const [sistemName, setSystemName] = useState('');
    
      useEffect(() => {
        const storedUserName =
            localStorage.getItem("Nome") || sessionStorage.getItem("Nome");
        const storedUserType =
            localStorage.getItem("Tipo") || sessionStorage.getItem("Tipo");
        const storedSystemName =
            localStorage.getItem("NomeSistema") || sessionStorage.getItem("NomeSistema");
    
        if (storedUserName) {
            setUserName(storedUserName);
        }
        if (storedUserType) {
            setUserType(storedUserType); // Exemplo: setar um estado com o tipo do usuário
        }
        if (storedSystemName) {
            setSystemName(storedSystemName); // Exemplo: setar um estado com o nome do sistema
        }
    }, []);

    const dataFormatada = date.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
      });

    return (
        <div className="infosTop">
          <div className="TopEsquerda">
                <BiCalendarAlt />
                <p>{dataFormatada}</p>
          </div>

          <div className="TopDireita">
            <div className="botoesTop">
              <button><BiUser /></button>
            </div>
              <p>{userName || "Usuário"}</p>
            </div>
          </div>
    )
};

export default InfoTop;