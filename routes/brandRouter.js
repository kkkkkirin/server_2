const Router = require('express') // Получаем роутер из экспресса
const router = new Router() // Создаем объект роутера
const BrandController = require('./../controllers/brandController')

router.post('/', BrandController.create)
router.get('/',BrandController.getAll)

module.exports = router