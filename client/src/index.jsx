import React, { createContext } from 'react'
import App from './App'
import { createRoot } from 'react-dom/client'
import Store from './store/store'

const root = createRoot(document.getElementById('root'))

export const store = new Store()

export const Context = createContext({
  store
})

root.render(
    <Context.Provider value={{
      store
    }}>
        <App />
    </Context.Provider>
)
