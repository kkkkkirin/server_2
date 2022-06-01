const Router = require('express') // Получаем роутер из экспресса
const router = new Router() // Создаем объект роутера
const deviceController = require('./../controllers/deviceController')

router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne) // Метод на получение конкретно взятого девайса

module.exports = router