import React from "react"
import "./DemandPage.css"
import SideMenu from "../../components/Menu/SidebarMenu"
import InfoTop from "../../components/InfoTop/InfoTop"
import BotaoDemanda from "../../components/Botões/BotaoDemanda"

const DemandPage = ({ }) => {
    return (
        <div className="container-base">
            <div className="menuLateral">
                <SideMenu />
            </div>

            <div className="info">
                <InfoTop />

                <div className="infosPrincipais">
                    <div className="NovaDemanda">
                        <BotaoDemanda />

                        <div class="table-container">
                            <table class="custom-table">
                                <thead>
                                    <tr>
                                        <th>Tag</th>
                                        <th>Setor</th>
                                        <th>Título</th>
                                        <th>Descrição</th>
                                        <th>Envolvidos</th>
                                        <th>Entrega</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>01.</td>
                                        <td>Marketing</td>
                                        <td>$40,500</td>
                                        <td>8 Months</td>
                                        <td>12%</td>
                                        <td>$2,000 / month</td>
                                        <td><button class="status-btn">Repay</button></td>
                                    </tr>
                                    <tr>
                                        <td>02.</td>
                                        <td>ESG</td>
                                        <td>$250,000</td>
                                        <td>36 Months</td>
                                        <td>10%</td>
                                        <td>$8,000 / month</td>
                                        <td><button class="status-btn">Repay</button></td>
                                    </tr>
                                    <tr>
                                        <td>03.</td>
                                        <td>Saúde e...</td>
                                        <td>$40,500</td>
                                        <td>12 Months</td>
                                        <td>12%</td>
                                        <td>$5,000 / month</td>
                                        <td><button class="status-btn">Repay</button></td>
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