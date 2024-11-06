import React from 'react'
import './App.css'
import Logo from './components/Logo'
import Sidebar from './components/Sidebar'
import Content from './components/Content'

function App () {
  return (
    <div className="app">
      <Logo />
      <div className="container">
        <Sidebar />
        <Content />
      </div>
    </div>
  )
}

export default App
