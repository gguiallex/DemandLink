import React from "react"
import "./SettingsPage.css"
import SideMenu from "../../components/Menu/SidebarMenu"
import InfoTop from "../../components/InfoTop/InfoTop"

const SettingsPage = ({ }) => {
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

export default SettingsPage;