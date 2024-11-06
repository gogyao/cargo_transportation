import React from 'react'

function Login ({ onLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin() // Call the login function from props
  }

  return (
    <div>
      <h2>Вход в аккаунт</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Имя пользователя" required />
        <input type="password" placeholder="Пароль" required />
        <button type="submit">Войти</button>
      </form>
    </div>
  )
}

export default Login
