import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import './App.css'

import LoginPage from './pages/Login/LoginPage'
import FirstPage from './pages/Home/FirstPage'
import DemandPage from './pages/Demandas/DemandPage'
import ReportPage from './pages/Relatorios/ReportPage'
import SettingsPage from './pages/Configuracoes/SettingsPage'
import SectorPage from './pages/PaginasSuperiores/Administradores/Setores/SectorPage'
import CriacaoUsuarioPage from './pages/CriacaoUsuario/CriacaoUsuarioPage'

function App() {

  return (

    <BrowserRouter>

      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/Dashboard' element={<FirstPage/>}/>
        <Route path='/Demandas' element={<DemandPage/>}/>
        <Route path='/Solicitacoes' element={<ReportPage/>}/>
        <Route path='/Configuracoes' element={<SettingsPage/>}/>
        <Route path='/Usuarios' element={<CriacaoUsuarioPage/>}/>
        <Route path='/Setores' element={<SectorPage/>}/>
      </Routes>

    </BrowserRouter>

  )
}

export default App
