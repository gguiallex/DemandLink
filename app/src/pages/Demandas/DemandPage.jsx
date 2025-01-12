import React from "react"
import "./DemandPage.css"
import SideMenu from "../../components/Menu/SidebarMenu"
import InfoTop from "../../components/InfoTop/InfoTop"
import BotaoDemanda from "../../components/Botões/BotaoDemanda"

const DemandPage = ({ }) => {
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
                            <BotaoDemanda/>
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
                                    <tr>
                                        <td>01.</td>
                                        <td>Marketing</td>
                                        <td>Digital</td>
                                        <td>Dia Das Mães</td>
                                        <td>Maria Luiza|Guilherme Alexandre</td>
                                        <td>11/05</td>
                                        <td>Urgente</td>
                                        <td><button class="status-btn">Pendente</button></td>
                                    </tr>
                                    <tr>
                                        <td>02.</td>
                                        <td>ESG</td>
                                        <td>ODS</td>
                                        <td>Cronograma</td>
                                        <td>João Pedro|Sofia Teixeira</td>
                                        <td>16/01</td>
                                        <td>Muito Urgente</td>
                                        <td><button class="status-btn">Em And...</button></td>
                                    </tr>
                                    <tr>
                                        <td>03.</td>
                                        <td>Saúde e...</td>
                                        <td>AD</td>
                                        <td>Banner Lançamento</td>
                                        <td>Sofia|Maria Luiza</td>
                                        <td>30/01</td>
                                        <td>Pouco Urgente</td>
                                        <td><button class="status-btn">Concluído</button></td>
                                    </tr>
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