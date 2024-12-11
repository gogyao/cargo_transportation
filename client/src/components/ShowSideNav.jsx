import { Sidenav, Nav } from 'rsuite'
import GroupIcon from '@rsuite/icons/legacy/Group'
import MagicIcon from '@rsuite/icons/legacy/Magic'
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '..'

const ShowSideNav = () => {
  const { store } = useContext(Context)
  const [expanded, setExpanded] = React.useState(false)
  const [activeKey, setActiveKey] = React.useState('1')

  const CustomIcon = ({ url }) => (
    <img
      src={url}
      className="rs-icon"
      alt="Custom Icon"
    />
  )
  return (
    <div style={{ height: '100vh', top: 0, left: 0, position: 'fixed', zIndex: 1000 }}>
      <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']} style={{ height: '100%' }}>
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Item as={Link} to="/" eventKey="1" icon={<CustomIcon url='https://w7.pngwing.com/pngs/474/248/png-transparent-bird-computer-icons-accipitridae-bald-eagle-bird-animals-hand-bald-eagle.png' />}>
              ReactExpress(Landing)
            </Nav.Item>
            {(store.isAuth)
              ? (<Nav.Item as={Link} to="/auth/personalaccount" eventKey="2" icon={<GroupIcon />}>
                Личный кабинет
              </Nav.Item>)
              : (<Nav.Item as={Link} to="/auth/login" eventKey="2" icon={<GroupIcon />}>
                Войти/Зарегистрироваться
              </Nav.Item>)}
            <Nav.Item eventKey="21" icon={<GroupIcon />}>
              Сделать заказ
            </Nav.Item>
            <Nav.Item eventKey="22" icon={<GroupIcon />}>
              О компании
            </Nav.Item>
            <Nav.Menu placement="rightStart" eventKey="3" title="Advanced" icon={<MagicIcon />}>
              <Nav.Item eventKey="3-1">Geo</Nav.Item>
              <Nav.Item eventKey="3-2">Devices</Nav.Item>
              <Nav.Item eventKey="3-3">Loyalty</Nav.Item>
              <Nav.Item eventKey="3-4">Visit Depth</Nav.Item>
            </Nav.Menu>
            {(store.isAuth) ? (<Nav.Item onClick={() => store.logout()} eventKey="10">Выйти из аккаунта</Nav.Item>) : (null)}
          </Nav>
        </Sidenav.Body>
        <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)} />
      </Sidenav>
    </div>
  )
}
export default ShowSideNav
