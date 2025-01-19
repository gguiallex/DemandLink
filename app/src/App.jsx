import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import './App.css'

import LoginPage from './pages/Login/LoginPage'
import FirstPage from './pages/Home/FirstPage'
import DemandPage from './pages/Demandas/DemandPage'
import ReportPage from './pages/Relatorios/ReportPage'
import SettingsPage from './pages/Configuracoes/SettingsPage'
import SectorPage from './pages/PaginasSuperiores/Administradores/Setores/SectorPage'
import UsersPage from './pages/PaginasSuperiores/Administradores/Usuarios/UsersPage'
import LeadersPage from './pages/PaginasSuperiores/Liders/Liderados/LeadersPage'

function App() {

  return (

    <BrowserRouter>

      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/Dashboard' element={<FirstPage/>}/>
        <Route path='/Demandas' element={<DemandPage/>}/>
        <Route path='/Solicitacoes' element={<ReportPage/>}/>
        <Route path='/Configuracoes' element={<SettingsPage/>}/>
        <Route path='/Usuarios' element={<UsersPage/>}/>
        <Route path='/Setores' element={<SectorPage/>}/>
        <Route path='/Liderados' element={<LeadersPage/>}/>
      </Routes>

    </BrowserRouter>

  )
}

export default App
