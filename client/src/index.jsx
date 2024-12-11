import React, { createContext } from 'react'
import { createRoot } from 'react-dom/client'
import Store from './store/store'
import 'rsuite/dist/rsuite.min.css'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CustomProvider } from 'rsuite'
import { ruRU } from 'rsuite/esm/locales'
import Landing from './pages/Landing'
import './index.css'
import Login from './pages/Login'
import PersonalAccount from './pages/PersonalAccount'

const root = createRoot(document.getElementById('root'))

export const store = new Store()

export const Context = createContext({
  store
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />
  },
  {
    path: '/auth/personalaccount',
    element: <PersonalAccount />
  },
  {
    path: '/auth/login',
    element: <Login />
  }
])

root.render(
  <Context.Provider value={{ store }}>
    <CustomProvider theme="dark" locale={ruRU}>
      <RouterProvider router={router} />
    </CustomProvider>
  </Context.Provider>
)
