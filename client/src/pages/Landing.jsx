import { Heading, HeadingGroup, Text } from 'rsuite'
import ShowSideNav from '../components/ShowSideNav'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { Context } from '..'

const Landing = () => {
  const { store } = useContext(Context)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [store])

  if (store.isLoading) {
    return <div>Загрузка...</div>
  }
  return (
    <div className="mainLandingDiv">
       { (store.isAuth && <ShowSideNav/>) || <ShowSideNav/>}
      <div className="banner" style={{ backgroundImage: 'url(/images/imgBanner.jpg', padding: '100px 20px', textAlign: 'center' }} >
        <HeadingGroup>
          <Heading style={{ fontSize: 60, marginBottom: 20, color: 'white', textShadow: '3px 3px 6px rgba(0,0,0,0.8)', WebkitTextStroke: '2px #000' }} >
            ReactExpress Corporation
          </Heading>

          <Text style={{ fontSize: 28, color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.8)', WebkitTextStroke: '2px #000' }} >
            Современная организация, меняющая взгляд на транспортировку грузов.
          </Text>
        </HeadingGroup>
      </div>
    </div>

  )
}

export default observer(Landing)
