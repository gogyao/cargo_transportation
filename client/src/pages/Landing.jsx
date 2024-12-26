import { Carousel, Heading, Text } from 'rsuite'

import ShowSideNav from '../components/ShowSideNav'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { Context } from '..'
import { useTranslation } from 'react-i18next'

const Landing = () => {
  const { store } = useContext(Context)
  const { t } = useTranslation()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [store])

  if (store.isLoading) {
    return <div>{t('loading')}</div>
  }

  const carouselItems = [
    {
      title: t('landing.slide1.title'),
      description: t('landing.slide1.description'),
      image: '/images/imgBanner.jpg'
    },
    {
      title: t('landing.slide2.title'),
      description: t('landing.slide2.description'),
      image: '/images/slide2.jpg'
    },
    {
      title: t('landing.slide3.title'),
      description: t('landing.slide3.description'),
      image: '/images/slide3.avif'
    },
    {
      title: t('landing.slide4.title'),
      description: t('landing.slide4.description'),
      image: '/images/slide4.avif'
    }
  ]

  return (
    <div className="mainLandingDiv">
      {(store.isAuth && <ShowSideNav />) || <ShowSideNav />}
      <div style={{ margin: '0 auto', maxWidth: '100%' }}>
        <Carousel autoplay className="custom-slider" style={{ height: '85vh', width: '100%', borderRadius: '15px' }}>
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
