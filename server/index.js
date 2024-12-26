require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const router = require('./router')
const sequelize = require('./db')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/errorMiddleware')

const PORT = process.env.PORT || 5000 // Указываем порт, на котором будет принимать запросы наш сервер (сначала проверяем переменную среды, а если ее нет, то просто берем 3500)

const app = express() // Создаем новое приложение express

app.use(express.json()) // Добавляем к нему обработчик JSON, чтобы в этом виде можно было получать запросы и отправлять ответы
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
})) // Добавляем к нему CORS - сервис запросов между разными источниками
app.use('/api', router)
app.use(errorMiddleware)


app.use(express.static(path.resolve(__dirname, 'static'))) // Добавляем к нему статичную директорию, чтобы можно было напрямую доставать файлы с сервера. В аргументе указываем путь к нужной папке (__dirname - где находится сервер + 'static' - имя папки)
app.get('/', (req, res) => { // По запросу GET на базовую ссылку (/)...
    res.send({ msg: `check on port ${PORT}!` }) // ... возвращаем JSON с этим сообщением
})

app.use(function (req, res, next) { // Привязываем к каждому ответу заголовки (для CORS)
    res.header("Access-Control-Allow-Origin", "*"); // Разрешить запросы из всех источников
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // Разрешить следующие заголовки при запросе
    next(); // Идем дальше по ответу
});

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) // Запускаем сервер и выводим лог в консоль
    } catch (e) {
        console.log(e)
    }
}


start()
