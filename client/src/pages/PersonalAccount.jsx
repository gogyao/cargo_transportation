import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'
import UserService from '../services/UserService'
import ShowSideNav from '../components/ShowSideNav'
import { useNavigate } from 'react-router-dom'

const PersonalAccount = () => {
  const { store } = useContext(Context)
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

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
    return <div>Загрузка...</div>
  }
  return (
    <div className="PApage" style={{ backgroundImage: 'url(/images/PApage.jpg)' }}>
      <ShowSideNav />
      <div className='accountInfo'>
        <h1>Информация о пользователе</h1>
        <h2>{`Почта пользователя: ${store.user.email}`}</h2>
        <h2>{'Роль  пользователя: пока отсутствует'}</h2>
        <h2>Статус авторизации пользователя: {store.isAuth ? <span style={{ color: 'green' }}>авторизован</span> : <span style={{ color: 'red' }}>не авторизован</span>} </h2>
        <h2>Статус подтверждения пользователя: {store.user.isActivated ? <span style={{ color: 'green' }}>аккаунт подтвержден по почте</span> : <span style={{ color: 'red' }}>подтвердите вашу почту</span>}</h2>
        {(store.isAuth) ? <button className='logout' onClick={handleLogout}>Выйти из аккаунта</button> : ''}
      </div>

      <div className='accountInfo1' style={{ zIndex: 10 }}>
        <h1>Список ваших заказов</h1>
        {users.map(user =>
          <div key={user.email}>{user.email}</div>
        )}
      </div>
    </div>
  )
}
export default observer(PersonalAccount)
