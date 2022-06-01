const Router = require('express') // Получаем роутер из экспресса
const router = new Router() // Создаем объект роутера
const TypeController = require('./../controllers/typeController')

router.post('/', TypeController.create)
router.get('/', TypeController.getAll)

module.exports = router