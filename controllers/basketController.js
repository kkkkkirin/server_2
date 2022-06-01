const uuid = require('uuid') // Пакет для генерации случайного id
const path = require('path')
const { Device, DeviceInfo } = require('./../models/models')
const ApiError = require('./../error/ApiError')

class BasketController {
    async create(req, res, next) {
        try {
            let { basketId, deviceId } = req.body
            const basket = await Device.create({ basketId, deviceId })
            return res.json(basket)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit

        let devices;
        if (!brandId & !typeId) {
            devices = await Device.findAndCountAll({ limit, offset })
        }
        if (brandId & !typeId) {
            devices = await Device.findAndCountAll({ where: { brandId }, limit, offset })
        }
        if (!brandId & typeId) {
            devices = await Device.findAndCountAll({ where: { typeId }, limit, offset })
        }
        if (brandId & typeId) {
            devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset })
        }
        return res.json(devices)
    }

    async getOne(req, res) {
        const { id } = req.params
        const device = await Device.findOne(
            {
                where: { id },
                include: [{ model: DeviceInfo, as: 'info' }]
            }
        )
        return res.json(device)
    }
}

module.exports = new BasketController()