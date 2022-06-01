const Router = require('express') // Получаем роутер из экспресса
const router = new Router() // Создаем объект роутера
const basketController = require('./../controllers/basketController')

router.post('/', basketController.create)
router.get('/', basketController.getAll)
router.get('/:id', basketController.getOne) // Метод на получение конкретно взятого девайса

module.exports = router