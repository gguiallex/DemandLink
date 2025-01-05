import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import LoginPage from './pages/Login/LoginPage'
import FirstPage from './pages/Home/FirstPage'

function App() {

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
