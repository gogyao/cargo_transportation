import { Sidenav, Nav, Button } from 'rsuite'
import MemberIcon from '@rsuite/icons/Member'
import ExitIcon from '@rsuite/icons/Exit'
import IdMappingIcon from '@rsuite/icons/IdMapping'
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline'
import PeopleFolderIcon from '@rsuite/icons/PeopleFolder'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '..'
import { useTranslation } from 'react-i18next'

const ShowSideNav = () => {
  const { store } = useContext(Context)
  const [expanded, setExpanded] = React.useState(false)
  const [activeKey, setActiveKey] = React.useState('1')
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    console.log(`Language changed to: ${lang}`)
  }

  const CustomIcon = ({ url }) => (
    <img
      src={url}
      className="rs-icon"
      alt="Custom Icon"
    />
  )
  const username = (email) => email.split('@')[0].split('.')[0]

  const handleLogout = async () => {
    const response = await store.logout()
    if (!store.isAuth) {
      navigate('/')
    }
  }

  return (
    <div style={{ height: '100vh', top: 0, left: 0, position: 'fixed', zIndex: 1500 }}>
      <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']} style={{ height: '100%' }}>
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Item as={Link} to="/" eventKey="1" icon={<CustomIcon url='/images/logo.png' />}>
              ReactExpress(Landing)
            </Nav.Item>
            {(store.isAuth)
              ? (<Nav.Item as={Link} to="/auth/personalaccount" eventKey="2" icon={<MemberIcon />}>
                {t('account')}
              </Nav.Item>)
              : (<Nav.Item as={Link} to="/auth/login" eventKey="2" icon={<CustomIcon url='/images/login.png' />}>
                {t('login')}
              </Nav.Item>)}
            {(store.isAuth)
              ? <Nav.Item as={Link} to="/order" eventKey="3" icon={<ExpandOutlineIcon />} >
                {t('makeOrder')}
              </Nav.Item>
              : ''}
            <Nav.Item as={Link} to="/aboutthecompany" eventKey="4" icon={<PeopleFolderIcon />}>
            {t('about')}
            </Nav.Item>
            {(store.isAuth)
              ? <Nav.Menu eventKey="5" title={t('authorized')} icon={<IdMappingIcon />}>
                <Nav.Item icon={<IdMappingIcon />} eventKey="5-1">{t('user')} {username(store.user.email)}</Nav.Item>
                <Nav.Item onClick={handleLogout} eventKey="5-2" icon={<ExitIcon />}>{t('logout')}</Nav.Item>
              </Nav.Menu>
              : (null)}
          </Nav>
        </Sidenav.Body>
        {expanded && (
          <div
            style={{
              position: 'absolute',
              bottom: '10%',
              right: '5%',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <Button onClick={() => changeLanguage('en')} size="sm">
              EN
            </Button>
            <Button onClick={() => changeLanguage('ru')} size="sm">
              RU
            </Button>
            <Button onClick={() => changeLanguage('kz')} size="sm">
              KZ
            </Button>
          </div>
        )}
        <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)} />
      </Sidenav>
    </div>
  )
}

export default ShowSideNav
