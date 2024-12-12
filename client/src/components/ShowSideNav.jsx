import { Sidenav, Nav } from 'rsuite'
import GroupIcon from '@rsuite/icons/legacy/Group'
import MemberIcon from '@rsuite/icons/Member'
import ExitIcon from '@rsuite/icons/Exit'
import IdMappingIcon from '@rsuite/icons/IdMapping'
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline'
import PeopleFolderIcon from '@rsuite/icons/PeopleFolder'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '..'

const ShowSideNav = () => {
  const { store } = useContext(Context)
  const [expanded, setExpanded] = React.useState(false)
  const [activeKey, setActiveKey] = React.useState('1')
  const navigate = useNavigate()

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
    <div style={{ height: '100vh', top: 0, left: 0, position: 'fixed', zIndex: 1000 }}>
      <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']} style={{ height: '100%' }}>
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Item as={Link} to="/" eventKey="1" icon={<CustomIcon url='/images/logo.png' />}>
              ReactExpress(Landing)
            </Nav.Item>
            {(store.isAuth)
              ? (<Nav.Item as={Link} to="/auth/personalaccount" eventKey="2" icon={<MemberIcon />}>
                Личный кабинет
              </Nav.Item>)
              : (<Nav.Item as={Link} to="/auth/login" eventKey="2" icon={<CustomIcon url='/images/login.png' />}>
                Войти/Зарегистрироваться
              </Nav.Item>)}
            {(store.isAuth)
              ? <Nav.Item as={Link} to="/order" eventKey="3" icon={<ExpandOutlineIcon />} >
                Сделать заказ
              </Nav.Item>
              : ''}
            <Nav.Item as={Link} to="/aboutthecompany" eventKey="4" icon={<PeopleFolderIcon />}>
              О компании
            </Nav.Item>
            {(store.isAuth)
              ? <Nav.Menu eventKey="5" title="Авторизованный пользователь" icon={<IdMappingIcon/>}>
            <Nav.Item icon={<IdMappingIcon/>} eventKey="5-1" >Пользователь: {username(store.user.email)}</Nav.Item>
            <Nav.Item onClick={handleLogout} eventKey="5-2" icon={<ExitIcon/>}>Выйти из аккаунта</Nav.Item>
            </Nav.Menu>
              : (null)}
          </Nav>
        </Sidenav.Body>
        <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)} />
      </Sidenav>
    </div>
  )
}
export default ShowSideNav
