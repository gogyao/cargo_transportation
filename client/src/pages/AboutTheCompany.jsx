import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import ShowSideNav from '../components/ShowSideNav'
import { Context } from '../index'
import { useTranslation } from 'react-i18next'

const AboutTheCompany = () => {
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

  return (
    <div className="PApage" style={{ backgroundImage: 'url(/images/about.jpg)' }}>
    { (store.isAuth && <ShowSideNav/>) || <ShowSideNav/>}

    <div className="company-info">
        <h2>{t('aboutCompany.title')}</h2>
        <p>
        {t('aboutCompany.description')}
        </p>
        <p>
        {t('aboutCompany.phone')}
        </p>
        <p>
        {t('aboutCompany.email')}
        </p>
        <p>
        {t('aboutCompany.address')}
        </p>
        <p>
        {t('aboutCompany.workingHours')}
        </p>
        <p>
        {t('aboutCompany.tagline')}
        </p>
      </div>
    </div>
  )
}

export default observer(AboutTheCompany)
