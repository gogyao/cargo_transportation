import { Carousel, Heading, Text } from 'rsuite'

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

  const carouselItems = [
    {
      title: 'ReactExpress Corporation',
      description: 'Современная организация, меняющая взгляд на транспортировку грузов.',
      image: '/images/imgBanner.jpg'
    },
    {
      title: 'Быстрая доставка',
      description: 'Мы обеспечиваем максимально быструю транспортировку ваших грузов по всему миру.',
      image: '/images/slide2.jpg'
    },
    {
      title: 'Надёжность и безопасность',
      description: 'Гарантируем сохранность ваших грузов на всех этапах перевозки.',
      image: '/images/slide3.avif'
    },
    {
      title: 'Индивидуальный подход',
      description: 'Разрабатываем решения, которые точно соответствуют вашим потребностям.',
      image: '/images/slide4.avif'
    }
  ]

  return (
    <div className="mainLandingDiv">
      {(store.isAuth && <ShowSideNav />) || <ShowSideNav />}
      <div style={{ margin: '0 auto', maxWidth: '100%' }}>
        <Carousel autoplay className="custom-slider" style={{ height: '85vh', width: '100%' }}>
          {carouselItems.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <Heading style={{ fontSize: 60, textShadow: '3px 3px 6px rgba(0,0,0,0.8)' }}>
                {item.title}
              </Heading>
              <Text style={{ fontSize: 28, textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                {item.description}
              </Text>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default observer(Landing)
