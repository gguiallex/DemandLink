import React, { useEffect, useState } from "react"
import "./DemandPage.css"
import SideMenu from "../../components/Menu/SidebarMenu"
import InfoTop from "../../components/InfoTop/InfoTop"
import BotaoDemanda from "../../components/Botões/BotaoDemanda"

import { fetchDemandas, fetchUsuariosByDemanda } from "../../services/apiService";

const DemandPage = ({ }) => {
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
            console.log(demandasWitchUsers);

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

    const formatDate = (date) => {
        const options = {
            day: "2-digit",
            month: "2-digit",
        };
        return new Intl.DateTimeFormat('pt-BR', options).format(new Date(date));
    };

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
                    <div className="NovaDemanda">
                        <div className="BotaoDemandaa">
                            <BotaoDemanda onDemandCreated={loadDemandas}/>
                        </div>

                        <div class="table-container">
                            <table class="custom-table">
                                <thead>
                                    <tr>
                                        <th>Tag</th>
                                        <th>Setor</th>
                                        <th>Projeto</th>
                                        <th>Descrição</th>
                                        <th>Envolvidos</th>
                                        <th>Entrega</th>
                                        <th>Urgência</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {demandas.map((demanda, index) => (
                                    <tr key={index}>
                                        <td>{demanda.tagDemanda}</td>
                                        <td>{demanda.tagSetor}</td>
                                        <td>{demanda.projeto}</td>
                                        <td>{demanda.descricao}</td>
                                        <td>{demanda.envolvidos}</td>
                                        <td>{formatDate(demanda.dataFim)}</td>
                                        <td>{demanda.urgencia}</td>
                                        <td><button class="status-btn">{demanda.status}</button></td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DemandPage;