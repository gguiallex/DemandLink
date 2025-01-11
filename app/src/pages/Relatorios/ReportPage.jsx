import React from "react"
import "./ReportPage.css"
import SideMenu from "../../components/Menu/SidebarMenu"
import InfoTop from "../../components/InfoTop/InfoTop"


const ReportPage = ({ }) => {
    return(
        <div className="container-base">
            <div className="menuLateral">
                <SideMenu />
            </div> 

            <div className="info">
                <InfoTop />
                <div className="infosPrincipais">
                </div>
            </div>
        </div>
    )
}

export default ReportPage;