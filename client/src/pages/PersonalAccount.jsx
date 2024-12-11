import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'
import UserService from '../services/UserService'
import ShowSideNav from '../components/ShowSideNav'

const PersonalAccount = () => {
  const { store } = useContext(Context)
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [store])
  async function getUsers () {
    try {
      const response = await UserService.fetchUsers()
      setUsers(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  if (store.isLoading) {
    return <div>Загрузка...</div>
  }
  return (
    <div className="PApage" style={{ backgroundImage: 'url(/images/PApage.jpg)' }}>
      <ShowSideNav />
      <div className='accountInfo' style={{ backgroundColor: 'white', color: 'black' }}>
        <h1>Информация о пользователе</h1>
        <h2>{`Почта пользователя: ${store.user.email}`}</h2>
        <h2>{'Роль  пользователя: пока отсутствует'}</h2>
        <h2>Статус авторизации пользователя: {store.isAuth ? <span style={{ color: 'green' }}>авторизован</span> : <span style={{ color: 'red' }}>не авторизован</span>} </h2>
        <h2>Статус подтверждения пользователя: {store.user.isActivated ? <span style={{ color: 'green' }}>аккаунт подтвержден по почте</span> : <span style={{ color: 'red' }}>подтвердите вашу почту</span>}</h2>
        <button className='logout' onClick={() => store.logout()}>Выйти из аккаунта</button>
        {/* <div>
          <button onClick={getUsers}>Получить пользователей</button>
        </div> */}
        {users.map(user =>
          <div key={user.email}>{user.email}</div>
        )}
      </div>
    </div>
  )
}
export default observer(PersonalAccount)
