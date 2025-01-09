import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import './App.css'

import LoginPage from './pages/Login/LoginPage'
import FirstPage from './pages/Home/FirstPage'

function App() {

  /*const navigate = useNavigate(); // hook para navegar para outras páginas

  useEffect(() => {
    // Verificar se o token existe no localStorage ou sessionStorage
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

    // Se o token existir, redireciona para a página inicial
    if (token) {
      navigate('/inicio');
    } else {
      // Caso contrário, redireciona para a página de login
      navigate('/');
    }
  }, [navigate]); */

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/inicio' element={<FirstPage/>}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
