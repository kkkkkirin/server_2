require('dotenv').config()
const express = require('express')
const sequelize = require('./db')  // импорт файла db
const models = require('./models/models') // импорт моделей
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/mainRouter')
const errorHandler = require('./middleware/ErrorHandlingMiddleWare')
const filePathMiddleware = require('./middleware/filepathMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(filePathMiddleware(path.resolve(__dirname, 'files')))
app.use(express.json())  // Для парсинга json-формата
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))  // Для регистрации файл-аплоуда
app.use('/api', router) 


// Обработка ошибок, последний Middleware
app.use(errorHandler)

const start = async () => {  // вызов функции для подключения к бд
    try {
        await sequelize.authenticate()      // функция установки подключения бд
        await sequelize.sync()      // функция сверки состояния бд со схемой данных
        app.listen(PORT, () => console.log(`Server has been started at port ${PORT}`))
    }
    catch (e) {
        console.log(e)
    }
}

start()  // запуск сервера