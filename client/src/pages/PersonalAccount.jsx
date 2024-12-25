import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'
import UserService from '../services/UserService'
import ShowSideNav from '../components/ShowSideNav'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const PersonalAccount = () => {
  const { store } = useContext(Context)
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.getItem('token')) {
          await store.checkAuth()
        }

        const response = await UserService.fetchUsers()
        setUsers(response.data)
      } catch (e) {
        console.error(e)
      }
    }

    fetchData()
  }, [store])

  const handleLogout = async () => {
    const response = await store.logout()
    if (!store.isAuth) {
      navigate('/')
    }
  }

  if (store.isLoading) {
    return <div>{t('loading')}</div>
  }
  return (
    <div className="PApage" style={{ backgroundImage: 'url(/images/PApage.jpg)' }}>
      <ShowSideNav />
      <div className='accountInfo'>
        <h1>{t('userInfo.title')}</h1>
        <h2>{`${t('userInfo.email')}: ${store.user.email}`}</h2>
        <h2>{t('userInfo.role')}: {t('userInfo.roleUnavailable')}</h2>
        <h2>{t('userInfo.authStatus')}: {store.isAuth ? <span style={{ color: 'green' }}>{t('userInfo.authenticated')}</span> : <span style={{ color: 'red' }}>{t('userInfo.notAuthenticated')}</span>} </h2>
        <h2>{t('userInfo.activationStatus')}: {store.user.isActivated ? <span style={{ color: 'green' }}>{t('userInfo.activated')}</span> : <span style={{ color: 'red' }}>{t('userInfo.notActivated')}</span>}</h2>
        {(store.isAuth) ? <button className='logout' onClick={handleLogout}>{t('logout')}</button> : ''}
      </div>

      <div className='accountInfo1' style={{ zIndex: 10 }}>
        <h1>{t('order.checklist')}</h1>
        {users.map(user =>
          <div key={user.email}>{user.email}</div>
        )}
      </div>
    </div>
  )
}
export default observer(PersonalAccount)
