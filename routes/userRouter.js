const Router = require('express') // Получаем роутер из экспресса
const router = new Router() // Создаем объект роутера
const userController = require('./../controllers/userController')
const authMiddleware = require('./../middleware/authMiddleWare')

router.post('/registration', userController.registration) // Метод для регистрации
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check) // Метод для проверки авторизации пользователя

module.exports = router