import React, { useEffect, useState } from "react"
import "./ReportPage.css"
import SideMenu from "../../components/Menu/SidebarMenu"
import InfoTop from "../../components/InfoTop/InfoTop"
import BotaoDemanda from "../../components/Botões/BotaoDemanda"
import { fetchDemandas, fetchUsuariosByDemanda } from "../../services/apiService";


const ReportPage = ({ }) => {
    const [demandas, setDemandas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadDemandas = async () => {
        try {
            setLoading(true);
            const demandasData = await fetchDemandas();

            const demandasWitchUsers = await Promise.all(
                demandasData.map(async (demanda) => {
                    const usuarios = await fetchUsuariosByDemanda(demanda.tagDemanda);
                    const envolvidos = usuarios.map((user) => user.nome).join(" | ");
                    return { ...demanda, envolvidos };
                })
            );

            setDemandas(demandasWitchUsers);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDemandas();
    }, []);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;

    return (
        <div className="container-inicio">
            <div className="menuLateral">
                <SideMenu />
            </div>

            <div className="info">
                <InfoTop />
                <div className="infosPrincipais">
                    <div className="BotaoDemandaa">
                        <BotaoDemanda onDemandCreated={loadDemandas} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportPage;