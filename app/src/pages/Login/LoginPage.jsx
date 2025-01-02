import React from "react"
import "./LoginPage.css"

const LoginPage = ({}) => {
    
    return(
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
                <div className="login">
                    <h1 className="tituloSite">DemandLink</h1>
                </div>

            </form>
        </div>
    )
}

export default LoginPage
