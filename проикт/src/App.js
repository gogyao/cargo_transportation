import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Logo from './components/Logo'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Private from './pages/Private'
import Business from './pages/Business'
import About from './pages/About'
import Contract from './pages/Contract'
import Operators from './pages/Operators'
import Carriers from './pages/Carriers'
import Login from './pages/Login'
import Register from './pages/Register'
import i18n from './i18n'

function App () {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [language, setLanguage] = useState('ru')

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    i18n.changeLanguage(lang)
  }

  const handleLogin = () => setIsAuthenticated(true)
  const handleLogout = () => setIsAuthenticated(false)

  return (
    <Router>
      <div className="app">
        <Logo />
        <div className="container">
          <Sidebar
            isAuthenticated={isAuthenticated}
            handleLogout={handleLogout}
            language={language}
            handleLanguageChange={handleLanguageChange}
          />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/private" element={<Private />} />
              <Route path="/business" element={<Business />} />
              <Route path="/about" element={<About />} />
              <Route path="/contract" element={<Contract />} />
              <Route path="/operators" element={<Operators />} />
              <Route path="/carriers" element={<Carriers />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
