import { Sidenav, Nav } from 'rsuite'
import GroupIcon from '@rsuite/icons/legacy/Group'
import MagicIcon from '@rsuite/icons/legacy/Magic'
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle'
import React from 'react'

const ShowSideNav = () => {
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
            <Nav.Item eventKey="1" icon={<CustomIcon url='https://w7.pngwing.com/pngs/474/248/png-transparent-bird-computer-icons-accipitridae-bald-eagle-bird-animals-hand-bald-eagle.png' />}>
              ReactExpress
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<GroupIcon />}>
              Личный кабинет
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<GroupIcon />}>
              Сделать заказ
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<GroupIcon />}>
              О компании
            </Nav.Item>
            <Nav.Menu placement="rightStart" eventKey="3" title="Advanced" icon={<MagicIcon />}>
              <Nav.Item eventKey="3-1">Geo</Nav.Item>
              <Nav.Item eventKey="3-2">Devices</Nav.Item>
              <Nav.Item eventKey="3-3">Loyalty</Nav.Item>
              <Nav.Item eventKey="3-4">Visit Depth</Nav.Item>
            </Nav.Menu>
            <Nav.Menu
              placement="rightStart"
              eventKey="4"
              title="Settings"
              icon={<GearCircleIcon />}
            >
              <Nav.Item eventKey="4-1">Applications</Nav.Item>
              <Nav.Item eventKey="4-2">Channels</Nav.Item>
              <Nav.Item eventKey="4-3">Versions</Nav.Item>
              <Nav.Menu eventKey="4-5" title="Custom Action">
                <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
                <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
              </Nav.Menu>
            </Nav.Menu>
          </Nav>
        </Sidenav.Body>
        <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)} />
      </Sidenav>
    </div>
  )
}
export default ShowSideNav
