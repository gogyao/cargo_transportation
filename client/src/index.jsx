import React, { createContext } from 'react'
import { createRoot } from 'react-dom/client'
import Store from './store/store'
import 'rsuite/dist/rsuite.min.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CustomProvider } from 'rsuite'
import { ruRU } from 'rsuite/esm/locales'
import Landing from './pages/Landing'
import './styles/index.css'
import Login from './pages/Login'
import PersonalAccount from './pages/PersonalAccount'
import Order from './pages/Order'
import AboutTheCompany from './pages/AboutTheCompany'
import i18n from './i18n/i18n'
import { I18nextProvider } from 'react-i18next'

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
  },
  {
    path: '/order',
    element: <Order />
  },
  {
    path: '/aboutthecompany',
    element: <AboutTheCompany />
  }
])

root.render(
  <I18nextProvider i18n={i18n}>
  <Context.Provider value={{ store }}>
    <CustomProvider theme="dark" locale={ruRU}>
      <RouterProvider router={router} />
    </CustomProvider>
  </Context.Provider>
  </I18nextProvider>
)
