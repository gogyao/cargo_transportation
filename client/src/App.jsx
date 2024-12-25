import React, { useContext, useEffect, useState } from 'react'
import { Context } from './index'
import { observer } from 'mobx-react-lite'
import UserService from './services/UserService'
import ShowSideNav from './components/ShowSideNav'
import './i18n/i18n'

const App = () => {
  const { store } = useContext(Context)
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

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

  // if (!store.isAuth) {
  //   return (
  //           <div>
  //               <LoginForm/>
  //               <button onClick={getUsers}>Получить пользователей</button>
  //           </div>
  //   )
  // }

  return (
        <div>
          <ShowSideNav/>
        </div>
  )
}

export default observer(App)
