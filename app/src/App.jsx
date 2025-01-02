import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

import LoginPage from './pages/Login/LoginPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route patch='/' element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
