import React from 'react'
import './Sidebar.css'

function Sidebar () {
  return (
    <aside className="sidebar">
      <nav>
        <button>Главная</button>
        <button>Частным лицам</button>
        <button>Бизнесу</button>
        <button>О компании</button>
        <button>Заключить договор</button>
        <button>Доступные операторы</button>
        <button>Доступные перевозчики</button>
      </nav>
      <div className="footer">
        <button>Войти в аккаунт</button>
        <div className="lang">ru</div>
      </div>
    </aside>
  )
}

export default Sidebar
