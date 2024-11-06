import React from 'react'

function Register () {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Регистрация прошла успешно!')
  }

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Имя пользователя" required />
        <input type="password" placeholder="Пароль" required />
        <input type="email" placeholder="Email" required />
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  )
}

export default Register
