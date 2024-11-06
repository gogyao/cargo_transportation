import React from 'react'
import './Content.css'

function Content () {
  return (
    <main className="content">
      <header className="header">
        <h1>Что-то написано</h1>
      </header>
      <section className="info">
        <div className="text">
          <p>Инфа о компании, тип перевозим не перевозим</p>
        </div>
        <div className="images">
          <p>Картинки интерактивные, гифки и т.д.</p>
        </div>
      </section>
    </main>
  )
}

export default Content
