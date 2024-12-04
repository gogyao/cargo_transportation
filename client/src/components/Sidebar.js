import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Sidebar.css'

function Sidebar ({ isAuthenticated, handleLogout, language, handleLanguageChange }) {
  const { t } = useTranslation()

  return (
    <aside className="sidebar">
      <nav>
        <Link to="/"><button>{t('home')}</button></Link>
        <Link to="/private"><button>{t('private')}</button></Link>
        <Link to="/business"><button>{t('business')}</button></Link>
        <Link to="/about"><button>{t('about')}</button></Link>
        <Link to="/contract"><button>{t('contract')}</button></Link>
        <Link to="/operators"><button>{t('operators')}</button></Link>
        <Link to="/carriers"><button>{t('carriers')}</button></Link>
      </nav>
      <div className="footer">
        {isAuthenticated
          ? (
          <button onClick={handleLogout}>{t('logout')}</button>
            )
          : (
          <>
            <Link to="/login"><button>{t('login')}</button></Link>
            <Link to="/register"><button>{t('register')}</button></Link>
          </>
            )}
        <div className="lang-switch">
          <button onClick={() => handleLanguageChange('en')} disabled={language === 'en'}>EN</button>
          <button onClick={() => handleLanguageChange('ru')} disabled={language === 'ru'}>RU</button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
